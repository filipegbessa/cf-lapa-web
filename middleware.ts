import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "default-dev-secret",
);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rotas de auth sempre passam direto
  if (pathname.startsWith("/api/admin/auth")) {
    return NextResponse.next();
  }

  // Login: redireciona para dashboard se já autenticado
  if (pathname === "/login") {
    const token = request.cookies.get("admin_token")?.value;
    if (token) {
      try {
        await jwtVerify(token, JWT_SECRET);
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } catch {
        // Token inválido — exibe login normalmente
      }
    }
    return NextResponse.next();
  }

  // Todas as demais rotas /admin/* exigem autenticação
  const token = request.cookies.get("admin_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    const role = payload.role as string;

    // Usuário sem role = BLOCKED aguardando aprovação
    if (!role) {
      if (pathname === "/admin/aguardando") {
        const requestHeaders = new Headers(request.headers);
        requestHeaders.set("x-user-role", "");
        requestHeaders.set("x-user-email", String(payload.email ?? ""));
        requestHeaders.set("x-user-id", String(payload.sub ?? ""));
        return NextResponse.next({ request: { headers: requestHeaders } });
      }
      return NextResponse.redirect(new URL("/admin/aguardando", request.url));
    }

    // Redireciona /admin root para dashboard
    if (pathname === "/admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }

    // Injeta dados do usuário nos headers para Server Components
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-user-role", role);
    requestHeaders.set("x-user-email", String(payload.email ?? ""));
    requestHeaders.set("x-user-id", String(payload.sub ?? ""));

    return NextResponse.next({ request: { headers: requestHeaders } });
  } catch {
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("admin_token");
    return response;
  }
}

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

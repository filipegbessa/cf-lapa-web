import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  if (error) {
    return NextResponse.redirect(new URL(`/login?error=${error}`, request.url));
  }

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid", request.url));
  }

  const onboarding = searchParams.get("onboarding") === "true";
  const destination = onboarding ? "/admin/aguardando" : "/admin/dashboard";

  const response = NextResponse.redirect(new URL(destination, request.url));
  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 43200, // 12h
  });

  return response;
}

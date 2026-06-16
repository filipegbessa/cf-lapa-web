import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;
    if (!apiUrl) {
      return NextResponse.json(
        { message: "NEXT_PUBLIC_ADMIN_API_URL não configurado" },
        { status: 500 }
      );
    }

    const res = await fetch(`${apiUrl}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(data, { status: res.status });
    }

    const redirect = "/admin/dashboard";

    const response = NextResponse.json({ redirect, token: data.access_token });
    response.cookies.set("admin_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 43200, // 12h
    });

    return response;
  } catch (err) {
    return NextResponse.json(
      { message: "Erro interno ao fazer login" },
      { status: 500 }
    );
  }
}

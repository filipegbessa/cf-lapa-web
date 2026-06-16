export class AuthError extends Error {
  messages: string[];

  constructor(messages: string[]) {
    super(messages.join(", "));
    this.messages = messages;
  }
}

export const authService = {
  async login(
    email: string,
    password: string
  ): Promise<{ token: string; redirect: string }> {
    const res = await fetch("/api/admin/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      const msg = data?.message;
      throw new AuthError(
        Array.isArray(msg) ? msg : [msg || "Erro ao fazer login"]
      );
    }

    return data;
  },

  logout() {
    sessionStorage.removeItem("admin_token");
    window.location.href = "/api/admin/auth/logout";
  },
};

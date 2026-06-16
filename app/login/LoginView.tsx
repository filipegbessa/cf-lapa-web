"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useLogin } from "./useLogin";

const STATUS_ERRORS: Record<string, string> = {
  blocked: "Conta aguardando ativação pelo administrador.",
  pending: "Seu cadastro está aguardando aprovação do administrador.",
  inactive: "Conta inativa. Entre em contato com o administrador.",
  invalid: "Erro no login com Google. Tente novamente.",
  unauthorized: "Acesso não autorizado. Solicite um convite ao administrador.",
};

function LoginForm() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    loading,
    handleSubmit,
  } = useLogin();
  const searchParams = useSearchParams();
  const statusError = searchParams.get("error");

  const apiUrl = process.env.NEXT_PUBLIC_ADMIN_API_URL;

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)",
        fontFamily: "Inter, sans-serif",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#141414",
          border: "1px solid #262626",
          borderRadius: "12px",
          padding: "40px 32px",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "32px" }}>
          <h1
            style={{
              fontSize: "28px",
              fontWeight: "700",
              color: "#E63946",
              margin: "0 0 8px",
            }}
          >
            CF Lapa
          </h1>
          <p
            style={{
              fontSize: "14px",
              color: "#999",
              margin: "0",
            }}
          >
            Admin Dashboard
          </p>
        </div>

        {/* Status error from OAuth redirect */}
        {statusError && STATUS_ERRORS[statusError] && (
          <div
            style={{
              borderRadius: "8px",
              background: "#2a1a1a",
              border: "1px solid #7a3a3a",
              padding: "12px 14px",
              marginBottom: "16px",
            }}
          >
            <p
              style={{
                fontSize: "12px",
                color: "#ff8a8a",
                margin: "0",
              }}
            >
              {STATUS_ERRORS[statusError]}
            </p>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "20px" }}>
          {/* Email Input */}
          <div style={{ display: "grid", gap: "8px" }}>
            <label
              htmlFor="email"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#f5f5f5",
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="professor@cflapa.com"
              style={{
                padding: "12px 16px",
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#f5f5f5",
                fontSize: "14px",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#E63946")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
            />
          </div>

          {/* Password Input */}
          <div style={{ display: "grid", gap: "8px" }}>
            <label
              htmlFor="password"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#f5f5f5",
              }}
            >
              Senha
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
              style={{
                padding: "12px 16px",
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: "8px",
                color: "#f5f5f5",
                fontSize: "14px",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
                outline: "none",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#E63946")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#333")}
            />
          </div>

          {/* Errors */}
          {errors.length > 0 && (
            <div
              style={{
                borderRadius: "8px",
                background: "#2a1a1a",
                border: "1px solid #7a3a3a",
                padding: "12px 14px",
              }}
            >
              {errors.map((err, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: "12px",
                    color: "#ff8a8a",
                    margin: i === 0 ? "0" : "4px 0 0",
                  }}
                >
                  {err}
                </p>
              ))}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              padding: "12px 16px",
              background: "#E63946",
              color: "#fff",
              fontSize: "14px",
              fontWeight: "600",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background 0.2s",
              opacity: loading ? 0.7 : 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) =>
              !loading && (e.currentTarget.style.background = "#cc1e2f")
            }
            onMouseLeave={(e) =>
              !loading && (e.currentTarget.style.background = "#E63946")
            }
          >
            {loading ? (
              <>
                <svg
                  style={{
                    width: "16px",
                    height: "16px",
                    animation: "spin 1s linear infinite",
                  }}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    opacity="0.25"
                  />
                  <path
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    opacity="0.75"
                  />
                </svg>
                Entrando...
              </>
            ) : (
              "Entrar"
            )}
          </button>
        </form>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "16px 0" }}>
          <div style={{ flex: 1, height: "1px", background: "#262626" }} />
          <span style={{ fontSize: "12px", color: "#666" }}>ou</span>
          <div style={{ flex: 1, height: "1px", background: "#262626" }} />
        </div>

        {/* Google OAuth button */}
        <a
          href={`${apiUrl}/auth/google`}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            width: "100%",
            border: "1px solid #262626",
            borderRadius: "8px",
            padding: "12px 16px",
            fontSize: "14px",
            fontWeight: "500",
            color: "#bbb",
            backgroundColor: "transparent",
            textDecoration: "none",
            transition: "background 0.2s",
            cursor: "pointer",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "#1a1a1a")
          }
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
            <path
              fill="#EA4335"
              d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
            />
            <path
              fill="#FBBC05"
              d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
            />
            <path fill="none" d="M0 0h48v48H0z" />
          </svg>
          Entrar com Google
        </a>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default function LoginView() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  );
}

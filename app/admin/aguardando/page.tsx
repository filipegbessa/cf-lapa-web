export default function AguardandoPage() {
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
          maxWidth: "500px",
          background: "#141414",
          border: "1px solid #262626",
          borderRadius: "12px",
          padding: "60px 40px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            width: "60px",
            height: "60px",
            background: "#E63946",
            borderRadius: "50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 24px",
            opacity: 0.1,
          }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
          </svg>
        </div>

        <h1
          style={{
            fontSize: "24px",
            fontWeight: "700",
            color: "#f5f5f5",
            margin: "0 0 12px",
          }}
        >
          Aguardando Aprovação
        </h1>

        <p
          style={{
            fontSize: "14px",
            color: "#999",
            margin: "0 0 32px",
            lineHeight: "1.6",
          }}
        >
          Sua conta foi criada com sucesso! Agora aguarde a aprovação do
          administrador para acessar o painel.
        </p>

        <div
          style={{
            padding: "16px",
            background: "#1a1a1a",
            border: "1px solid #262626",
            borderRadius: "8px",
            marginTop: "24px",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              color: "#666",
              margin: "0",
            }}
          >
            Se tiver dúvidas, entre em contato com o administrador do sistema.
          </p>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';

export default function HomePage() {
  return (
    <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #0b0b0b 0%, #1a1a1a 100%)', color: '#f5f5f5', fontFamily: 'Inter, sans-serif', padding: '20px' }}>
      <div style={{ textAlign: 'center', maxWidth: '600px', padding: '40px' }}>
        <h1 style={{ fontSize: '48px', fontWeight: '700', margin: '0 0 16px', color: '#E63946' }}>
          CF Lapa
        </h1>

        <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(230, 57, 70, 0.2)', borderRadius: '12px', padding: '40px 32px', marginBottom: '40px' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🏗️</div>
          <h2 style={{ fontSize: '28px', fontWeight: '600', margin: '0 0 16px' }}>
            Site em Desenvolvimento
          </h2>
          <p style={{ fontSize: '16px', color: '#d4d4d4', lineHeight: '1.6', margin: '0 0 24px' }}>
            Estamos construindo a melhor experiência para você.
            <br />
            Em breve você poderá conhecer tudo sobre o CrossFit Lapa.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/admin/dashboard" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 32px', background: '#E63946', color: '#fff', fontSize: '16px', fontWeight: '600', borderRadius: '8px', textDecoration: 'none' }}>
            Admin
          </Link>

          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', padding: '12px 32px', background: 'transparent', color: '#fff', fontSize: '16px', fontWeight: '600', borderRadius: '8px', textDecoration: 'none', border: '2px solid rgba(230, 57, 70, 0.5)' }}>
            Instagram
          </Link>
        </div>

        <p style={{ fontSize: '14px', color: '#999', marginTop: '40px' }}>
          © 2026 CF Lapa. Todos os direitos reservados.
        </p>
      </div>
    </main>
  );
}

'use client';

import { useState } from 'react';

export default function NewsletterBanner() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    window.open(`https://forms.gle/xxxxx?email=${encodeURIComponent(email)}`, '_blank');
    setSent(true);
    setEmail('');
  }

  return (
    <section style={{
      background: 'linear-gradient(135deg, var(--accent), var(--accent-hover, #7c3aed))',
      color: '#fff', padding: '40px 20px', textAlign: 'center', marginTop: 20
    }}>
      <div style={{ maxWidth: 520, margin: '0 auto' }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>📩</div>
        <h2 style={{ fontSize: 20, fontWeight: 800, margin: '0 0 8px' }}>
          Recibe las mejores herramientas IA
        </h2>
        <p style={{ fontSize: 14, opacity: .85, margin: '0 0 20px' }}>
          Cada semana, una selección de herramientas IA para hispanohablantes. Gratis, sin spam.
        </p>
        {sent ? (
          <div style={{
            background: 'rgba(255,255,255,.2)', borderRadius: 99, padding: '12px 24px',
            fontSize: 15, fontWeight: 700
          }}>
            ✅ ¡Gracias por suscribirte!
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            display: 'flex', alignItems: 'center', gap: 0, maxWidth: 420, margin: '0 auto',
            background: '#fff', borderRadius: 99, overflow: 'hidden'
          }}>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Tu correo electrónico"
              required
              style={{
                flex: 1, border: 'none', outline: 'none', padding: '14px 20px',
                fontFamily: 'var(--font-sans)', fontSize: 14, color: '#333'
              }}
            />
            <button type="submit" style={{
              background: 'var(--accent)', color: '#fff', border: 'none',
              padding: '14px 24px', fontFamily: 'var(--font-sans)', fontSize: 14,
              fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap'
            }}>
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

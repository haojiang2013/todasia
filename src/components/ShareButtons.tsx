'use client';

export default function ShareButtons({ url, title }: { url: string; title: string }) {
  const eUrl = encodeURIComponent(url);
  const eTitle = encodeURIComponent(title);

  const shares = [
    { label: 'X', href: `https://x.com/intent/tweet?url=${eUrl}&text=${eTitle}`, icon: '𝕏' },
    { label: 'WhatsApp', href: `https://wa.me/?text=${eTitle}%20${eUrl}`, icon: '📱' },
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${eUrl}`, icon: 'f' },
    { label: 'Copiar', icon: '📋', onClick: () => { navigator.clipboard.writeText(url).then(() => alert('¡Enlace copiado!')); } },
  ];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
      <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)' }}>Compartir:</span>
      {shares.map(s => s.onClick ? (
        <button key={s.label} onClick={s.onClick} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 99, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', cursor: 'pointer', fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)' }}>{s.icon} {s.label}</button>
      ) : (
        <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '6px 14px', borderRadius: 99, border: '1px solid var(--border-default)', background: 'var(--bg-surface)', textDecoration: 'none', fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>{s.icon} {s.label}</a>
      ))}
    </div>
  );
}

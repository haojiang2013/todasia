import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',textAlign:'center',padding:'48px 24px' }}>
      <div>
        <div style={{ fontSize:64,marginBottom:16 }}>🔍</div>
        <h1 style={{ fontSize:24,fontWeight:900,margin:'0 0 8px' }}>Página no encontrada</h1>
        <p style={{ color:'var(--text-secondary)',margin:'0 0 24px',fontSize:14 }}>La página que buscas no existe o ha sido movida.</p>
        <Link href="/" className="btn btn-primary" style={{ textDecoration:'none',padding:'12px 28px',display:'inline-block' }}>Volver al inicio</Link>
      </div>
    </div>
  );
}

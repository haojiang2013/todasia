export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main style={{ maxWidth:800, margin:'0 auto', padding:'40px 24px 60px' }}>
        <div style={{ background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'32px 36px',fontSize:14,lineHeight:1.9,color:'var(--text-secondary)' }}>
          <h1 style={{ fontSize:24,fontWeight:900,color:'var(--text-primary)',margin:'0 0 24px' }}>Política de Privacidad</h1>
          <p>TodasIA cumple con el Reglamento General de Protección de Datos (GDPR) y la Ley Orgánica de Protección de Datos (LOPD).</p>
          <h2 style={{ fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px' }}>1. Información que recopilamos</h2>
          <p>Recopilamos datos de uso anónimos a través de Google Analytics y cookies técnicas necesarias para el funcionamiento del sitio.</p>
          <h2 style={{ fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px' }}>2. Finalidad</h2>
          <p>Los datos se utilizan exclusivamente para mejorar la experiencia de navegación y analizar el tráfico del sitio.</p>
          <h2 style={{ fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px' }}>3. Terceros</h2>
          <p>No compartimos datos personales con terceros. Utilizamos Google Analytics para estadísticas anónimas.</p>
          <h2 style={{ fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px' }}>4. Contacto</h2>
          <p>Para ejercer tus derechos de acceso, rectificación o supresión: <a href="mailto:hola@todasia.com" style={{ color:'var(--accent)' }}>hola@todasia.com</a></p>
        </div>
      </main>
      <Footer />
    </>
  );
}
function Header(){ return <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}><a href="/" style={{fontSize:24,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a><a href="/" className="btn btn-outline" style={{textDecoration:'none'}}>← Volver</a></div></header>; }
function Footer(){ return <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>; }

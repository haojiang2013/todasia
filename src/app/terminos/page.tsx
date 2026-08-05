export default function TermsPage() {
  return (<>
    <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}><a href="/" style={{fontSize:24,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a><a href="/" className="btn btn-outline" style={{textDecoration:'none'}}>← Inicio</a></div></header>
    <main style={{maxWidth:800,margin:'0 auto',padding:'40px 24px 60px'}}>
      <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'32px 36px',fontSize:14,lineHeight:1.9,color:'var(--text-secondary)'}}>
        <h1 style={{fontSize:24,fontWeight:900,color:'var(--text-primary)',margin:'0 0 24px'}}>Términos de Uso</h1>
        <p>Al usar TodasIA aceptas estos términos. Si no estás de acuerdo, no utilices el sitio.</p>
        <h2 style={{fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px'}}>1. Servicio</h2>
        <p>TodasIA es un directorio de herramientas de IA. No somos responsables del contenido, funcionamiento o prácticas de las herramientas listadas.</p>
        <h2 style={{fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px'}}>2. Propiedad intelectual</h2>
        <p>Los nombres y logos de las herramientas pertenecen a sus respectivos propietarios. El contenido original de TodasIA está protegido por derechos de autor.</p>
        <h2 style={{fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px'}}>3. Enlaces externos</h2>
        <p>TodasIA contiene enlaces a sitios externos. No nos responsabilizamos del contenido de terceros.</p>
        <h2 style={{fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px'}}>4. Contacto</h2>
        <p><a href="mailto:hola@todasia.com" style={{color:'var(--accent)'}}>hola@todasia.com</a></p>
      </div>
    </main>
    <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>
  </>);
}

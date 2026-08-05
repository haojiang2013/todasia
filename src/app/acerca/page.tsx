import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Acerca de TodasIA | TodasIA',
  description: 'TodasIA es el directorio de herramientas de IA en español más completo. 110+ herramientas, startups españolas y apps globales.',
  alternates: { canonical: 'https://todasia.com/acerca' },
};

export default function AcercaPage() {
  return (<>
    <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}><a href="/" style={{fontSize:24,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a><Link href="/" className="btn btn-outline" style={{textDecoration:'none'}}>← Inicio</Link></div></header>
    <main style={{maxWidth:800,margin:'0 auto',padding:'40px 24px 60px'}}>
      <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'32px 36px',fontSize:14,lineHeight:1.9,color:'var(--text-secondary)'}}>
        <h1 style={{fontSize:24,fontWeight:900,color:'var(--text-primary)',margin:'0 0 24px'}}>Acerca de TodasIA</h1>
        <p>TodasIA es el directorio de herramientas de inteligencia artificial en español más completo.</p>
        <h2 style={{fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px'}}>🎯 Misión</h2>
        <p>Ayudar a hispanohablantes a descubrir, comparar y elegir las mejores herramientas de IA. Cubrimos tanto startups españolas y latinoamericanas como las apps globales más populares.</p>
        <h2 style={{fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px'}}>📊 Datos</h2>
        <ul style={{paddingLeft:20}}>
          <li>110+ herramientas de IA</li>
          <li>11 categorías (Chat, Diseño, Escritura, Imágenes, Programación, Video, Audio, Traducción, Negocios, Búsqueda, Educación)</li>
          <li>Startups españolas y herramientas globales</li>
          <li>Actualizado semanalmente</li>
        </ul>
        <h2 style={{fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px'}}>👤 Creador</h2>
        <p>Proyecto independiente creado por Steven. Cada herramienta es verificada manualmente para garantizar información precisa y actualizada.</p>
        <h2 style={{fontSize:18,fontWeight:700,color:'var(--accent)',margin:'28px 0 12px'}}>📬 Contacto</h2>
        <p>Para sugerir herramientas o reportar errores: <a href="/submit" style={{color:'var(--accent)'}}>formulario de envío</a> o <a href="mailto:hola@todasia.com" style={{color:'var(--accent)'}}>hola@todasia.com</a></p>
      </div>
    </main>
    <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>
  </>);
}

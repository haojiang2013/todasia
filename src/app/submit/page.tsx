'use client';
import { useState } from 'react';

export default function SubmitPage() {
  const [form,setForm]=useState({name:'',domain:'',origin:'España',category:'Chat IA',price:'',lang:'✅ Español',desc:''});
  const [status,setStatus]=useState<'idle'|'sent'|'error'>('idle');
  const u=(f:string,v:string)=>setForm(x=>({...x,[f]:v}));

  if(status==='sent') return <div style={{display:'flex',alignItems:'center',justifyContent:'center',minHeight:'100vh',textAlign:'center',padding:'48px 24px'}}><div><div style={{fontSize:48,marginBottom:16}}>✅</div><h1 style={{fontSize:22,fontWeight:900,marginBottom:8}}>¡Gracias!</h1><p style={{color:'var(--text-secondary)',marginBottom:24}}>Revisaremos tu herramienta y la publicaremos en 2 días hábiles.</p><a href="/" className="btn btn-primary" style={{textDecoration:'none',padding:'12px 28px',display:'inline-block'}}>Volver al inicio</a></div></div>;

  const inp:React.CSSProperties={width:'100%',padding:'10px 14px',border:'1px solid var(--border-default)',borderRadius:99,fontFamily:'var(--font-sans)',fontSize:14,color:'var(--text-primary)',background:'var(--bg-surface)',outline:'none'};
  const lbl:React.CSSProperties={display:'block',fontSize:13,fontWeight:700,marginBottom:6,color:'var(--text-primary)'};

  return (<>
    <Header />
    <main style={{maxWidth:680,margin:'0 auto',padding:'40px 24px 60px'}}>
      <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'32px 36px'}}>
        <h1 style={{fontSize:24,fontWeight:900,margin:'0 0 8px'}}>🔧 Publica tu herramienta IA</h1>
        <p style={{fontSize:14,color:'var(--text-secondary)',margin:'0 0 24px'}}>¿Tienes una herramienta de IA? Añádela a nuestro directorio. Revisión en 2 días hábiles.</p>
        <form onSubmit={async e=>{e.preventDefault();if(!form.name||!form.domain)return;setStatus('idle');try{const r=await fetch('/api/submit',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(form)});setStatus(r.ok?'sent':'error')}catch{setStatus('error')}}} style={{display:'flex',flexDirection:'column',gap:18}}>
          <div><label style={lbl}>Nombre *</label><input type="text" value={form.name} onChange={e=>u('name',e.target.value)} required placeholder="Ej: ChatGPT" style={inp}/></div>
          <div><label style={lbl}>Dominio *</label><input type="text" value={form.domain} onChange={e=>u('domain',e.target.value)} required placeholder="Ej: chatgpt.com" style={inp}/></div>
          <div><label style={lbl}>Origen</label><select value={form.origin} onChange={e=>u('origin',e.target.value)} style={inp}><option>España</option><option>Latinoamérica</option><option>EE.UU.</option><option>Europa</option><option>Asia</option><option>Otro</option></select></div>
          <div><label style={lbl}>Categoría</label><select value={form.category} onChange={e=>u('category',e.target.value)} style={inp}><option>Chat IA</option><option>Imágenes</option><option>Escritura</option><option>Programación</option><option>Video</option><option>Audio</option><option>Traducción</option><option>Diseño</option><option>Negocios</option><option>Búsqueda</option><option>Educación</option></select></div>
          <div><label style={lbl}>Precio</label><input type="text" value={form.price} onChange={e=>u('price',e.target.value)} placeholder="Ej: Gratis (~$20/mes)" style={inp}/></div>
          <div><label style={lbl}>Idioma</label><select value={form.lang} onChange={e=>u('lang',e.target.value)} style={inp}><option>✅ Español</option><option>⚠️ Inglés</option><option>🌎 Multilingüe</option></select></div>
          <div><label style={lbl}>Descripción</label><textarea rows={4} value={form.desc} onChange={e=>u('desc',e.target.value)} placeholder="Describe tu herramienta en una frase" style={{...inp,resize:'vertical',borderRadius:'var(--radius)'}}/></div>
          {status==='error'&&<div style={{color:'var(--es-red)',fontSize:13,fontWeight:600}}>Error al enviar. Intenta de nuevo.</div>}
          <button type="submit" className="btn btn-primary" style={{padding:'14px 28px',fontSize:15,alignSelf:'flex-start'}}>Enviar</button>
        </form>
      </div>
    </main>
    <Footer />
  </>);
}
function Header(){return <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}><a href="/" style={{fontSize:24,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a><a href="/" className="btn btn-outline" style={{textDecoration:'none'}}>← Inicio</a></div></header>;}
function Footer(){return <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>;}

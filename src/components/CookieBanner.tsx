'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [show, setShow] = useState(false);
  useEffect(() => { if (!localStorage.getItem('cookie-consent')) setShow(true); }, []);
  if (!show) return null;
  return (
    <div style={{ position:'fixed',bottom:0,left:0,right:0,zIndex:9999,background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:20,flexWrap:'wrap',boxShadow:'0 -4px 20px rgba(0,0,0,.08)' }}>
      <p style={{ margin:0,fontSize:13,color:'var(--text-secondary)',maxWidth:600 }}>
        🍪 Utilizamos cookies para mejorar tu experiencia. No recopilamos datos personales.{' '}
        <a href="/privacidad" style={{ color:'var(--accent)' }}>Más información</a>
      </p>
      <div style={{ display:'flex',gap:8 }}>
        <button onClick={()=>{localStorage.setItem('cookie-consent','true');setShow(false)}} className="btn btn-primary" style={{ whiteSpace:'nowrap' }}>Aceptar</button>
      </div>
    </div>
  );
}

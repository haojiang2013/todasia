'use client';

import Link from 'next/link';

const CATS = [
  {href:'/categoria/chat-ia',label:'💬 Chat IA'},
  {href:'/categoria/imagenes',label:'🖼️ Imágenes'},
  {href:'/categoria/escritura',label:'✍️ Escritura'},
  {href:'/categoria/programacion',label:'💻 Código'},
  {href:'/categoria/video',label:'📹 Video'},
  {href:'/categoria/audio',label:'🎵 Audio'},
  {href:'/categoria/traduccion',label:'🌐 Traducción'},
  {href:'/categoria/negocios',label:'📊 Negocios'},
];

const LINKS = [
  {href:'/ranking',label:'📊 Ranking',highlight:true},
  {href:'/favoritos',label:'❤️ Favoritos'},
  {href:'/comparar',label:'📊 Comparar'},
  {href:'/blog',label:'📝 Blog'},
  {href:'/submit',label:'+ Añadir herramienta'},
];

export default function MobileMenu() {
  return (
    <>
      {/* Overlay */}
      <div id="mobile-overlay" data-mobile-overlay
        style={{
          display:'none',position:'fixed',inset:0,zIndex:199,
          background:'rgba(0,0,0,.4)',cursor:'pointer'
        }}
        onClick={()=>{
          document.getElementById('mobile-menu')?.classList.remove('open');
          document.getElementById('mobile-overlay')?.setAttribute('style','display:none');
        }}
      />
      {/* Slide-out panel */}
      <nav id="mobile-menu" data-mobile-menu
        style={{
          display:'none',position:'fixed',top:0,left:0,zIndex:200,
          width:280,height:'100vh',background:'var(--bg-surface)',
          overflowY:'auto',padding:'20px 16px',
          boxShadow:'4px 0 24px rgba(0,0,0,.15)',
          transform:'translateX(-100%)',transition:'transform .25s ease'
        }}
      >
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:20,paddingBottom:16,borderBottom:'1px solid var(--border-light)'}}>
          <a href="/" style={{fontSize:20,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a>
          <button
            onClick={()=>{
              document.getElementById('mobile-menu')?.classList.remove('open');
              document.getElementById('mobile-overlay')?.setAttribute('style','display:none');
            }}
            style={{width:36,height:36,border:'1px solid var(--border-default)',borderRadius:'var(--radius)',background:'var(--bg-surface)',cursor:'pointer',fontSize:18,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--text-secondary)'}}
            aria-label="Cerrar menú"
          >✕</button>
        </div>

        <div style={{marginBottom:20}}>
          <div style={{fontSize:11,fontWeight:700,color:'var(--text-tertiary)',textTransform:'uppercase',letterSpacing:'.08em',marginBottom:10}}>Categorías</div>
          {CATS.map(c=>(
            <a key={c.href} href={c.href} style={{display:'flex',alignItems:'center',gap:8,padding:'10px 12px',borderRadius:'var(--radius-sm)',fontSize:14,color:'var(--text-primary)',textDecoration:'none',transition:'background .15s'}}
              onMouseEnter={e=>{e.currentTarget.style.background='var(--bg-hover)'}}
              onMouseLeave={e=>{e.currentTarget.style.background=''}}
            >{c.label}</a>
          ))}
        </div>

        <div style={{borderTop:'1px solid var(--border-light)',paddingTop:16}}>
          {LINKS.map(l=>(
            <a key={l.href} href={l.href} style={{
              display:'flex',alignItems:'center',gap:8,padding:'10px 12px',borderRadius:'var(--radius-sm)',fontSize:14,textDecoration:'none',transition:'background .15s',
              color: l.highlight ? 'var(--accent)' : 'var(--text-primary)',
              fontWeight: l.highlight ? 700 : 400,
              background: l.highlight ? 'var(--accent-light)' : 'transparent'
            }}
              onMouseEnter={e=>{e.currentTarget.style.background=l.highlight?'var(--accent-light)':'var(--bg-hover)'}}
              onMouseLeave={e=>{e.currentTarget.style.background=l.highlight?'var(--accent-light)':''}}
            >{l.label}</a>
          ))}
        </div>
      </nav>
    </>
  );
}

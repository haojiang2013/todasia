'use client';

import { useState, useMemo, useEffect } from 'react';
import { TOOLS, type Tool } from '@/lib/tools';
import CookieBanner from '@/components/CookieBanner';
import MobileMenu from '@/components/MobileMenu';
import FavoriteButton from '@/components/shared/FavoriteButton';
import CompareButton from '@/components/shared/CompareButton';
import CompareBar from '@/components/shared/CompareBar';
import NewsletterBanner from '@/components/NewsletterBanner';
import ToolIcon from '@/components/shared/ToolIcon';
import Sidebar from '@/components/Sidebar';

const CATS = [
  {key:'all',label:'Todas'},{key:'Chat IA',label:'💬 Chat IA'},{key:'Diseño',label:'🎨 Diseño'},
  {key:'Escritura',label:'✍️ Escritura'},{key:'Imágenes',label:'🖼️ Imágenes'},{key:'Programación',label:'💻 Código'},
  {key:'Video',label:'📹 Video'},{key:'Audio',label:'🎵 Audio'},{key:'Traducción',label:'🌐 Traducción'},
  {key:'Negocios',label:'📊 Negocios'},{key:'Búsqueda',label:'🔍 Búsqueda'},{key:'Educación',label:'🎓 Educación'},
  {key:'es',label:'🇪🇸 España & LatAm'}
];

function Stars({n,t}:{n:number;t:number}){return <span style={{display:'inline-flex',gap:1}}>{Array.from({length:t},(_,i)=><span key={i} style={{color:i<n?'var(--gold)':'var(--border-default)',fontSize:15}}>★</span>)}</span>;}

export default function Home() {
  const PER_PAGE=12;
  const [activeCat,setActiveCat]=useState('all');
  const [activeOrigin,setActiveOrigin]=useState('all');
  const [activePrice,setActivePrice]=useState('all');
  const [search,setSearch]=useState('');
  const [page,setPage]=useState(1);

  // Listen for sidebar filter events
  useEffect(()=>{
    const handler = (e: Event) => {
      const { key, value } = (e as CustomEvent).detail as { key: string; value: string };
      if (key === 'origin') setActiveOrigin(value);
      if (key === 'category') setActiveCat(value);
      if (key === 'price') setActivePrice(value);
    };
    window.addEventListener('todasia-filter', handler);
    return () => window.removeEventListener('todasia-filter', handler);
  }, []);

  const filtered=useMemo(()=>{
    let result=TOOLS;
    // Origin filter
    if(activeOrigin==='es') result=result.filter(t=>t.originTag==='tag-es');
    else if(activeOrigin==='global') result=result.filter(t=>t.originTag==='tag-global');
    // Keep backward compat: category 'es' also filters by origin
    if(activeCat==='es')result=result.filter(t=>t.originTag==='tag-es');
    else if(activeCat!=='all')result=result.filter(t=>t.categories.includes(activeCat));
    // Price filter
    if(activePrice==='free') result=result.filter(t=>t.free);
    else if(activePrice==='paid') result=result.filter(t=>!t.free);
    // Search
    if(search.trim()){const q=search.toLowerCase();result=result.filter(t=>t.name.toLowerCase().includes(q)||t.desc.toLowerCase().includes(q)||t.categories.some((c:any)=>c.toLowerCase().includes(q)));}
    return result;
  },[activeCat,activeOrigin,activePrice,search]);

  // Reset page when filter changes
  useEffect(()=>{setPage(1);},[activeCat,activeOrigin,activePrice,search]);

  const totalPages=Math.ceil(filtered.length/PER_PAGE);
  const paged=filtered.slice((page-1)*PER_PAGE,page*PER_PAGE);

  const esCount=TOOLS.filter(t=>t.originTag==='tag-es').length;
  const freeCount=TOOLS.filter(t=>t.free).length;
  const [showTop,setShowTop]=useState(false);
  useEffect(()=>{const cb=()=>setShowTop(window.scrollY>400);window.addEventListener('scroll',cb,{passive:true});return ()=>window.removeEventListener('scroll',cb);},[]);

  return (<>
    <MobileMenu />
    <Header search={search} onSearch={setSearch} />
    <Hero />
    <Pills active={activeCat} onSelect={setActiveCat} />
    <div data-layout="main" style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',gap:20}}>
      <Sidebar />
      <div style={{flex:1,minWidth:0}}>
        <StatsBar total={TOOLS.length} filtered={filtered.length} es={esCount} free={freeCount} onReset={()=>{setActiveCat('all');setActiveOrigin('all');setActivePrice('all');setSearch('');}} activeCat={activeCat} />
        <ToolGrid tools={paged} />
        {totalPages>1&&<Pagination page={page} total={totalPages} onPage={setPage} />}
      </div>
    </div>
    <Footer />
    <NewsletterBanner />
    <CompareBar />
    <CookieBanner />
    {showTop && <button onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} style={{position:'fixed',bottom:32,right:32,zIndex:500,width:44,height:44,borderRadius:'50%',background:'var(--accent)',color:'var(--text-on-accent)',border:'none',cursor:'pointer',fontSize:20,boxShadow:'var(--shadow-card)',display:'flex',alignItems:'center',justifyContent:'center'}} aria-label="Volver arriba">↑</button>}
  </>);
}

function Header({search,onSearch}:{search:string;onSearch:(s:string)=>void}){
  const openMenu = () => {
    document.getElementById('mobile-menu')?.classList.add('open');
    document.getElementById('mobile-overlay')?.setAttribute('style','display:block');
  };
  return <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)',position:'sticky',top:0,zIndex:100}}>
    <div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64,gap:20}}>
      <button data-hamburger onClick={openMenu} style={{minWidth:44,minHeight:44,justifyContent:'center',display:'none',border:'none',background:'transparent',cursor:'pointer',fontSize:22,color:'var(--text-secondary)',borderRadius:'var(--radius-sm)',alignItems:'center'}} aria-label="Menú">☰</button>
      <a href="/" style={{fontSize:24,fontWeight:900,letterSpacing:'-.02em',color:'var(--accent)',textDecoration:'none'}}>TodasIA<span data-header-logo-sub style={{fontWeight:500,fontSize:13,color:'var(--text-secondary)',marginLeft:8}}>Directorio IA</span></a>
      <div data-header-search-wrap style={{display:'flex',alignItems:'center',flex:1,maxWidth:400,border:'2px solid var(--border-default)',borderRadius:99,background:'var(--bg-page)',overflow:'hidden',transition:'border-color .2s'}}>
        <input type="text" value={search} onChange={e=>onSearch(e.target.value)} placeholder="Buscar herramientas..." style={{flex:1,border:'none',outline:'none',padding:'10px 18px',fontFamily:'var(--font-sans)',fontSize:14,background:'transparent',color:'var(--text-primary)'}} />
        <button data-header-search-btn className="btn btn-primary" style={{borderRadius:'0 99px 99px 0',padding:'8px 20px'}}>🔍</button>
      </div>
      <a data-header-fav href="/ranking" style={{fontSize:13,color:'var(--text-secondary)',textDecoration:'none',fontWeight:600}} title="Ranking">📊</a>
      <a data-header-fav href="/favoritos" style={{fontSize:13,color:'var(--text-secondary)',textDecoration:'none',fontWeight:600}} title="Favoritos">❤️</a>
      <button data-header-theme onClick={()=>{const h=document.documentElement;const n=h.getAttribute('data-theme')==='dark'?'light':'dark';h.setAttribute('data-theme',n);try{localStorage.setItem('todasia-theme',n)}catch{}}} style={{width:36,height:36,border:'1px solid var(--border-default)',borderRadius:'50%',background:'var(--bg-surface)',cursor:'pointer',fontSize:16,display:'flex',alignItems:'center',justifyContent:'center',color:'var(--text-secondary)',flexShrink:0}}>🌓</button>
      <a data-header-submit href="/submit" className="btn btn-primary" style={{whiteSpace:'nowrap',flexShrink:0,textDecoration:'none'}}>+ Añadir</a>
    </div>
  </header>;
}

function Hero(){return <section className="hero" style={{padding:'60px 24px 40px',textAlign:'center',maxWidth:700,margin:'0 auto'}}>
  <div style={{display:'inline-flex',alignItems:'center',gap:6,padding:'6px 14px',background:'var(--accent-light)',color:'var(--accent)',borderRadius:99,fontSize:13,fontWeight:600,marginBottom:16}}><span style={{width:6,height:6,background:'var(--accent)',borderRadius:'50%',animation:'pulse 2s infinite'}} />Nuevas herramientas cada semana</div>
  <h1 style={{fontSize:44,fontWeight:900,letterSpacing:'-.03em',lineHeight:1.15,marginBottom:14}}>Encuentra las mejores<br /><span style={{background:'linear-gradient(135deg,var(--accent),var(--accent-hover))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent'}}>herramientas IA</span></h1>
  <p style={{fontSize:17,color:'var(--text-secondary)',marginBottom:24}}>El directorio de inteligencia artificial en español. Descubre, compara y elige.</p>
  <div style={{display:'flex',alignItems:'center',overflow:'hidden',border:'2px solid var(--border-default)',borderRadius:99,background:'var(--bg-surface)',maxWidth:520,margin:'0 auto'}}>
    <input type="text" placeholder="Buscar... (ej: imágenes, chat, video)" style={{flex:1,border:'none',outline:'none',padding:'14px 20px',fontFamily:'var(--font-sans)',fontSize:15,color:'var(--text-primary)'}} />
    <button className="btn btn-primary" style={{width:44,height:44,borderRadius:'50%',flexShrink:0,margin:4,justifyContent:'center',padding:0,fontSize:18}}>🔍</button>
  </div>
</section>;}

function Pills({active,onSelect}:{active:string;onSelect:(k:string)=>void}){
  return <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:8,padding:'0 24px 32px',maxWidth:'var(--container-w)',margin:'0 auto'}}>
    {CATS.map((c,i)=>(<button key={i} className="btn btn-outline" onClick={()=>onSelect(c.key)} style={active===c.key?{background:'var(--accent)',color:'var(--text-on-accent)',borderColor:'var(--accent)',borderRadius:99,fontSize:13}:{borderRadius:99,fontSize:13}}>{c.label}</button>))}
  </div>;
}

function StatsBar({total,filtered,es,free,onReset,activeCat}:{total:number;filtered:number;es:number;free:number;onReset:()=>void;activeCat:string}){
  return <div style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',borderBottom:'1px solid var(--border-default)',padding:'14px 0',marginBottom:24}}>
    <div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:13,color:'var(--text-secondary)',flexWrap:'wrap',gap:8}}>
      <span><strong style={{color:'var(--text-primary)'}}>{filtered}</strong> de {total} herramientas</span>
      <span><strong style={{color:'var(--text-primary)'}}>🇪🇸 {es}</strong> españolas/latam</span>
      <span><strong style={{color:'var(--text-primary)'}}>🆓 {free}</strong> con plan gratuito</span>
      {activeCat!=='all'&&<button onClick={onReset} style={{padding:'4px 12px',borderRadius:99,border:'1px solid var(--border-default)',background:'var(--bg-surface)',cursor:'pointer',fontSize:11,color:'var(--text-secondary)',fontFamily:'var(--font-sans)'}}>✕ Limpiar</button>}
    </div>
  </div>;
}

function ToolGrid({tools}:{tools:Tool[]}){
  if(tools.length===0)return <div style={{textAlign:'center',padding:'60px 20px',color:'var(--text-tertiary)'}}><div style={{fontSize:40,marginBottom:12}}>🔍</div><div style={{fontSize:15,fontWeight:700,color:'var(--text-secondary)'}}>No se encontraron herramientas</div><div style={{fontSize:13,marginTop:4}}>Prueba con otro filtro o término de búsqueda</div></div>;
  return <div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px 60px'}}>
    <div className="tool-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:16}}>
      {tools.map((t,i)=>(<a key={t.id} href={`/tool/${t.id}`} className="animate-card" style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:22,textDecoration:'none',color:'inherit',position:'relative',transition:'transform .2s,border-color .2s,box-shadow .2s',cursor:'pointer',animationDelay:`${i*.04}s`,display:'flex',flexDirection:'column'}}
        onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-2px)';e.currentTarget.style.borderColor='var(--accent)';e.currentTarget.style.boxShadow='var(--shadow-card)'}}
        onMouseLeave={e=>{e.currentTarget.style.transform='';e.currentTarget.style.borderColor='var(--border-default)';e.currentTarget.style.boxShadow=''}}>
        <span style={{position:'absolute',top:16,right:16}}><span className={`tag ${t.originTag}`}>{t.originLabel}</span></span>
        <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:10,paddingRight:70}}>
          <ToolIcon domain={t.domain} name={t.name} size={48} originTag={t.originTag} />
          <div><div style={{fontWeight:800,fontSize:16,lineHeight:1.3}}>{t.name}</div><div style={{fontSize:12,color:'var(--text-tertiary)'}}>{t.domain}</div></div>
        </div>
        <p style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.55,marginBottom:12,flex:1}}>{t.desc}</p>
        <div style={{display:'flex',gap:6,marginBottom:12,flexWrap:'wrap'}}><span className="tag tag-lang">{t.lang}</span>{t.free&&<span className="tag tag-free">Gratis</span>}</div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:12,borderTop:'1px solid var(--border-light)'}}>
          <span><Stars n={t.stars} t={t.starsTotal} /> <strong style={{fontSize:14}}>{t.rating}</strong></span>
          <span style={{display:'flex',alignItems:'center',gap:10}}><span><strong style={{fontSize:14}}>{t.price}</strong> {t.priceSub&&<span style={{fontSize:12,color:'var(--text-tertiary)',fontWeight:400}}>{t.priceSub}</span>}</span><a href={`https://${t.domain}`} target="_blank" rel="noopener" onClick={e=>e.stopPropagation()} style={{color:'var(--accent)',fontSize:16,fontWeight:700,textDecoration:'none'}} title={t.domain}>↗</a></span>
        </div>
        <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginTop:8,paddingTop:8,borderTop:'1px solid var(--border-light)'}}>
          <FavoriteButton id={t.id} size="sm" />
          <CompareButton id={t.id} />
        </div>
      </a>))}
    </div>
  </div>;
}

function Pagination({page,total,onPage}:{page:number;total:number;onPage:(n:number)=>void}){
  return <div style={{display:'flex',justifyContent:'center',gap:6,padding:'0 24px 40px',maxWidth:'var(--container-w)',margin:'0 auto'}}>
    <button onClick={()=>onPage(page-1)} disabled={page<=1} className="btn btn-outline" style={{fontSize:13,opacity:page<=1?.4:1}}>← Anterior</button>
    {Array.from({length:total},(_,i)=>i+1).slice(Math.max(0,page-3),Math.min(total,page+2)).map(n=><button key={n} onClick={()=>onPage(n)} className="btn" style={n===page?{background:'var(--accent)',color:'var(--text-on-accent)',borderRadius:99,fontSize:13}:{background:'transparent',color:'var(--text-secondary)',fontSize:13}}>{n}</button>)}
    <button onClick={()=>onPage(page+1)} disabled={page>=total} className="btn btn-outline" style={{fontSize:13,opacity:page>=total?.4:1}}>Siguiente →</button>
  </div>;
}
function Footer(){return <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px',marginTop:40}}>
  <div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',gap:50,flexWrap:'wrap'}}>
    <div><h3 style={{fontSize:14,fontWeight:800,marginBottom:10,color:'var(--accent)'}}>Categorías</h3><a href="/categoria/chat-ia" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0'}}>Chat IA</a><a href="/categoria/imagenes" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0'}}>Imágenes</a><a href="/categoria/escritura" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0'}}>Escritura</a><a href="/categoria/programacion" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0'}}>Programación</a></div>
    <div><h3 style={{fontSize:14,fontWeight:800,marginBottom:10,color:'var(--accent)'}}>Región</h3><a href="/categoria/chat-ia" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0'}}>🇪🇸 España</a><a href="/categoria/chat-ia" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0'}}>🌎 Latinoamérica</a><a href="/categoria/chat-ia" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0'}}>🌍 Global</a></div>
    <div><h3 style={{fontSize:14,fontWeight:800,marginBottom:10,color:'var(--accent)'}}>TodasIA</h3><a href="/ranking" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0',textDecoration:'none'}}>🏆 Ranking</a><a href="/acerca" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0',textDecoration:'none'}}>Acerca de</a><a href="https://jpailist.com" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0',textDecoration:'none'}}>🇯🇵 日本語版 (JPAIList)</a><a href="https://siglai.com" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0',textDecoration:'none'}}>🇧🇷 Português (SiglAI)</a><a href="/submit" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0',textDecoration:'none'}}>Publicar herramienta</a><a href="mailto:hola@todasia.com" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0',textDecoration:'none'}}>Contacto</a><a href="/privacidad" style={{display:'block',fontSize:13,color:'var(--text-secondary)',padding:'3px 0',textDecoration:'none'}}>Privacidad</a></div>
  </div>
  <div style={{maxWidth:'var(--container-w)',margin:'20px auto 0',padding:'16px 24px 0',borderTop:'1px solid var(--border-light)',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA — Directorio de herramientas IA en español</div>
</footer>;}

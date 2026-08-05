import { getToolById, getTools, TOOLS } from '@/lib/tools';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import ShareButtons from '@/components/ShareButtons';
import FavoriteButton from '@/components/shared/FavoriteButton';
import CompareButton from '@/components/shared/CompareButton';
import CompareBar from '@/components/shared/CompareBar';
import ToolIcon from '@/components/shared/ToolIcon';

export function generateStaticParams() {
  if(!Array.isArray(TOOLS)) return [];
  return TOOLS.filter(Boolean).map((t:any)=>({id:String(t.id||'')}));
}

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{
  const {id}=await params;
  const t=getToolById(id);
  if(!t)return{title:'No encontrado'};
  return {
    title:`${t.name||'?'} — ${t.categories?.[0]||'IA'} | TodasIA`,
    description:`${t.name||'?'}: ${(t.desc||'').slice(0,140)}. ${t.price||'?'}. ${t.lang||'?'}. Opiniones, ventajas y alternativas.`,
    openGraph:{
      title:`${t.name||'?'} — Herramienta IA | TodasIA`,
      description:(t.desc||'').slice(0,160),
      images:[{url:'https://todasia.com/og-image.png',width:1200,height:630}],
    },
    alternates:{canonical:`https://todasia.com/tool/${id}`},
  };
}

function stars(n:number,t:number){return Array.from({length:t},(_,i)=>i<n?'★':'☆').join('');}

export default async function Page({params}:{params:Promise<{id:string}>}) {
  const {id}=await params;
  const t=getToolById(id);
  if(!t)notFound();

  const pros:any[]=t.pros||[], cons:any[]=t.cons||[], faq:any[]=t.faq||[];
  const platforms:any[]=t.platforms||[], bestFor:any[]=t.bestFor||[], cats:any[]=t.categories||[];
  const langs:any[]=t.supportedLanguages||[];
  const pricingTiers:any[]=t.pricingTiers||[], howToUse:any[]=t.howToUse||[];

  // Related tools
  let related:any[]=[];
  try {
    const all=getTools();
    if(Array.isArray(all)) related=all.filter((rt:any)=>rt&&rt.id!==id&&rt.categories&&rt.categories.some((c:string)=>cats.includes(c))).slice(0,4);
  }catch{}

  return (<>
    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({
      '@context':'https://schema.org','@type':'SoftwareApplication',
      name:t.name||'',description:t.desc||'',url:`https://todasia.com/tool/${id}`,
      offers:{'@type':'Offer',price:t.price||'0',priceCurrency:'EUR'},
      operatingSystem:t.platforms?.join(',')||'Web',
      applicationCategory:t.categories?.[0]||'AI',
      aggregateRating:t.rating?{'@type':'AggregateRating',ratingValue:t.rating,reviewCount:1}:undefined
    })}} />
    <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)',position:'sticky',top:0,zIndex:100}}>
      <div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64,gap:20}}>
        <div style={{display:'flex',alignItems:'center',gap:8,fontSize:13,color:'var(--text-tertiary)'}}><a href="/" style={{color:'var(--text-tertiary)',textDecoration:'none'}}>Inicio</a><span>/</span><span style={{color:'var(--text-secondary)',fontWeight:600}}>{t.name||id}</span></div>
        <Link href="/" className="btn btn-outline" style={{textDecoration:'none',fontSize:13}}>← Volver</Link>
      </div>
    </header>

    <main style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'40px 24px 60px'}}>
      {/* Hero card */}
      <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:32,marginBottom:24}}>
        <div style={{display:'flex',gap:24,alignItems:'flex-start',flexWrap:'wrap'}}>
          <ToolIcon domain={t.domain} name={t.name||'?'} size={72} originTag={t.originTag} />
          <div style={{flex:1,minWidth:250}}>
            <div style={{display:'flex',alignItems:'center',gap:12,flexWrap:'wrap',marginBottom:8}}><h1 style={{fontSize:28,fontWeight:900,margin:0}}>{t.name||'?'}</h1><span className={`tag ${t.originTag||'tag-global'}`} style={{fontSize:12,padding:'4px 12px'}}>{t.originLabel||'Global'}</span></div>
            <a href={t.websiteUrl||'https://'+t.domain} target="_blank" rel="noopener" style={{color:'var(--accent)',fontSize:14}}>{t.domain||'?'} ↗</a>
            <div style={{display:'flex',alignItems:'center',gap:20,marginTop:14,flexWrap:'wrap'}}>
              <span style={{color:'var(--gold)',fontSize:16}}>{stars(t.stars||4,5)} <strong style={{color:'var(--text-primary)'}}>{t.rating||'?'}</strong></span>
              <strong style={{fontSize:22,color:'var(--accent)'}}>{t.price||'?'}</strong>
              {t.priceSub&&<span style={{fontSize:13,color:'var(--text-tertiary)'}}>{t.priceSub}</span>}
            </div>
            {platforms.length>0&&<div style={{marginTop:10,display:'flex',gap:6}}>{platforms.map((p:any)=><span key={p} className="tag" style={{background:'var(--bg-muted)',color:'var(--text-secondary)',fontSize:11}}>{p}</span>)}</div>}
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:8,flexShrink:0}}>
            <a href={t.websiteUrl||'https://'+t.domain} target="_blank" rel="noopener" className="btn btn-primary" style={{textDecoration:'none',fontSize:15,padding:'14px 28px',whiteSpace:'nowrap',justifyContent:'center'}}>🔗 Visitar sitio</a>
            <div style={{display:'flex',gap:8}}><FavoriteButton id={id} /><CompareButton id={id} /></div>
            <ShareButtons url={`https://todasia.com/tool/${id}`} title={`${t.name||'?'} — TodasIA`} />
          </div>
        </div>
      </div>

      {/* Content + Sidebar */}
      <div style={{display:'grid',gridTemplateColumns:'1fr 260px',gap:24}} className="detail-grid">
        <div style={{display:'flex',flexDirection:'column',gap:24}}>

          {/* 1. Para quién es */}
          {bestFor.length>0&&<S title="🎯 ¿Para quién es?"><div style={{display:'flex',flexWrap:'wrap',gap:8}}>{bestFor.map((b:any,i:number)=><span key={i} style={{padding:'8px 16px',background:'var(--accent-light)',color:'var(--accent)',borderRadius:99,fontSize:13,fontWeight:600}}>{b}</span>)}</div></S>}

          {/* 2. Descripción */}
          <S title="📝 Descripción"><p style={{fontSize:15,color:'var(--text-secondary)',lineHeight:1.8,margin:0}}>{t.desc||'Sin descripción disponible.'}</p></S>

          {/* 3. Pros y Contras */}
          {pros.length>0&&<S title="⚖️ Pros y Contras"><div data-proscons="true" style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:16}}>
            <div style={{background:'var(--green-bg)',borderRadius:'var(--radius)',padding:20}}><h4 style={{color:'var(--green)',margin:'0 0 10px'}}>✅ Ventajas</h4><ul style={{margin:0,padding:'0 0 0 18px',fontSize:14,color:'var(--text-secondary)',lineHeight:1.8}}>{pros.map((p:any,i:number)=><li key={i}>{p}</li>)}</ul></div>
            <div style={{background:'var(--es-red-bg)',borderRadius:'var(--radius)',padding:20}}><h4 style={{color:'var(--es-red)',margin:'0 0 10px'}}>⚠️ Desventajas</h4><ul style={{margin:0,padding:'0 0 0 18px',fontSize:14,color:'var(--text-secondary)',lineHeight:1.8}}>{cons.map((c:any,i:number)=><li key={i}>{c}</li>)}</ul></div>
          </div></S>}

          {/* 4. Planes y precios */}
          {pricingTiers.length>0&&<S title="💰 Planes y precios"><div data-pricing="true" style={{display:'grid',gridTemplateColumns:`repeat(${Math.min(pricingTiers.length,3)},1fr)`,gap:12}}>
            {pricingTiers.map((pt:any,i:number)=>(<div key={i} style={{background:i===0?'var(--green-bg)':i===1?'var(--accent-light)':'var(--bg-hover)',borderRadius:'var(--radius)',padding:'18px 16px',border:i===1?'2px solid var(--accent)':'1px solid var(--border-light)',position:'relative'}}>
              {i===1&&<span style={{position:'absolute',top:-10,right:12,background:'var(--accent)',color:'#fff',fontSize:10,fontWeight:700,padding:'3px 10px',borderRadius:99}}>Recomendado</span>}
              <div style={{fontWeight:800,fontSize:15,marginBottom:4}}>{pt.name}</div>
              <div style={{fontWeight:700,fontSize:16,color:'var(--accent)',marginBottom:12}}>{pt.price}</div>
              <ul style={{margin:0,padding:'0 0 0 16px',fontSize:12,color:'var(--text-secondary)',lineHeight:1.8}}>{pt.features.map((f:string,j:number)=><li key={j}>{f}</li>)}</ul>
            </div>))}
          </div></S>}

          {/* 5. FAQ */}
          {faq.length>0&&<S title="❓ Preguntas frecuentes"><div style={{display:'flex',flexDirection:'column',gap:10}}>{faq.map((f:any,i:number)=><details key={i} style={{background:'var(--bg-hover)',borderRadius:'var(--radius)',padding:'14px 18px',cursor:'pointer'}}><summary style={{fontWeight:700,fontSize:14}}>{f.q||''}</summary><p style={{fontSize:14,color:'var(--text-secondary)',margin:'8px 0 0'}}>{f.a||''}</p></details>)}</div></S>}

          {/* 5. Herramientas similares */}
          {related.length>0&&<S title="🔗 Herramientas similares"><div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(180px,1fr))',gap:12}}>{related.map((rt:any)=>(<Link key={rt.id} href={`/tool/${rt.id}`} style={{background:'var(--bg-hover)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:14,textDecoration:'none',color:'inherit',transition:'border-color .15s'}}>
            <div style={{fontWeight:700,fontSize:14}}>{rt.name}</div>
            <div style={{fontSize:11,color:'var(--text-tertiary)'}}>{rt.domain}</div>
            <div style={{fontSize:13,fontWeight:600,color:'var(--accent)',marginTop:4}}>{rt.price}</div>
          </Link>))}</div></S>}
        </div>

        {/* Sidebar: Ficha técnica */}
        <div style={{display:'flex',flexDirection:'column',gap:16,alignSelf:'start',position:'sticky',top:80}}>
          <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:20}}>
            <h3 style={{fontSize:14,fontWeight:800,color:'var(--accent)',margin:'0 0 14px',borderBottom:'2px solid var(--border-default)',paddingBottom:8}}>📋 Ficha técnica</h3>
            {[{l:'Origen',v:t.originLabel||'Global'},{l:'Idioma',v:t.lang||'?'},{l:'Precio',v:t.price||'?'},{l:'Gratis',v:t.free?'✅ Sí':'❌ No'},{l:'Plataformas',v:platforms.length>0?platforms.join(' · '):'Web'},{l:'Categorías',v:cats.length>0?cats.join(' · '):'General'}].map((r,i)=>(<div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:'1px solid var(--border-light)',fontSize:13}}><span style={{color:'var(--text-tertiary)',flexShrink:0}}>{r.l}</span><span style={{fontWeight:600,color:'var(--text-primary)',textAlign:'right',marginLeft:12}}>{r.v}</span></div>))}
          </div>
        </div>
      </div>
    </main>

    <CompareBar />
    <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>
  </>);
}

function S({title,children}:{title:string;children:any}){return <section style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'24px 28px'}}><h2 style={{fontSize:17,fontWeight:800,color:'var(--accent)',margin:'0 0 16px',borderBottom:'2px solid var(--border-default)',paddingBottom:10}}>{title}</h2>{children}</section>;}

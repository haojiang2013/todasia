'use client';

import { useEffect, useState } from 'react';
import { useSavedTools } from '@/hooks/useSavedTools';
import Link from 'next/link';
import FavoriteButton from '@/components/shared/FavoriteButton';
import CompareButton from '@/components/shared/CompareButton';
import CompareBar from '@/components/shared/CompareBar';
import ToolIcon from '@/components/shared/ToolIcon';
import { getTools, type Tool } from '@/lib/tools';

export default function FavoritosPage() {
  const { state } = useSavedTools();
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const all = getTools();
    const favIds = new Set(state.favorites);
    setTools(all.filter((t:any) => t && favIds.has(t.id)));
  }, [state.favorites.join(',')]);

  return (<>
    <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)',position:'sticky',top:0,zIndex:100}}>
      <div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
        <a href="/" style={{fontSize:22,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA<span style={{fontWeight:500,fontSize:13,color:'var(--text-secondary)',marginLeft:8}}>Directorio IA</span></a>
        <Link href="/" className="btn btn-outline" style={{textDecoration:'none',fontSize:13}}>← Volver</Link>
      </div>
    </header>
    <CompareBar />
    <main style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'20px 24px 60px'}}>
      <h1 style={{fontSize:22,fontWeight:900,margin:'0 0 20px'}}>❤️ Favoritos</h1>
      {tools.length === 0 ? (
        <div style={{textAlign:'center',padding:60,color:'var(--text-tertiary)'}}>
          <div style={{fontSize:40,marginBottom:12}}>🤍</div>
          <div style={{fontSize:15,fontWeight:700,color:'var(--text-secondary)'}}>No tienes favoritos</div>
          <div style={{fontSize:13,marginTop:4}}>Pulsa 🤍 en cualquier herramienta para guardarla</div>
          <Link href="/" className="btn btn-primary" style={{display:'inline-block',marginTop:20,textDecoration:'none',padding:'10px 24px'}}>Explorar herramientas</Link>
        </div>
      ) : (
        <div className="tool-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))',gap:16}}>
          {tools.map(t => (
            <Link key={t.id} href={`/tool/${t.id}`} style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:22,textDecoration:'none',color:'inherit',transition:'border-color .2s'}}>
              <span style={{position:'absolute',top:16,right:16}}><span className={`tag ${t.originTag}`}>{t.originLabel}</span></span>
              <div style={{display:'flex',alignItems:'flex-start',gap:12,marginBottom:10,paddingRight:70}}>
                <ToolIcon domain={t.domain} name={t.name} size={48} originTag={t.originTag} />
                <div><div style={{fontWeight:800,fontSize:16}}>{t.name}</div><div style={{fontSize:12,color:'var(--text-tertiary)'}}>{t.domain}</div></div>
              </div>
              <p style={{fontSize:13,color:'var(--text-secondary)',lineHeight:1.55,marginBottom:12,flex:1}}>{t.desc}</p>
              <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',paddingTop:12,borderTop:'1px solid var(--border-light)'}}>
                <strong style={{fontSize:14,color:'var(--accent)'}}>{t.price}</strong>
                <div style={{display:'flex',gap:8}}><FavoriteButton id={t.id} size="sm" /><CompareButton id={t.id} /></div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
    <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>
  </>);
}

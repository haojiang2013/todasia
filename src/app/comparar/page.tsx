'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getTools, type Tool } from '@/lib/tools';

function CompararInner() {
  const searchParams = useSearchParams();
  const ids = searchParams.get('ids')?.split(',').filter(Boolean) || [];
  const [tools, setTools] = useState<Tool[]>([]);

  useEffect(() => {
    const all = getTools();
    const idSet = new Set(ids);
    setTools(all.filter((t: any) => t && idSet.has(t.id)));
  }, [ids.join(',')]);

  return (<>
    <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)',position:'sticky',top:0,zIndex:100}}>
      <div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
        <a href="/" style={{fontSize:22,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a>
        <Link href="/" className="btn btn-outline" style={{textDecoration:'none',fontSize:13}}>← Volver</Link>
      </div>
    </header>
    <main style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'20px 24px 60px'}}>
      <h1 style={{fontSize:22,fontWeight:900,margin:'0 0 20px'}}>📊 Comparar herramientas</h1>
      {tools.length < 2 ? (
        <div style={{textAlign:'center',padding:60,color:'var(--text-tertiary)'}}>
          <div style={{fontSize:40,marginBottom:12}}>📊</div>
          <div style={{fontSize:15,fontWeight:700,color:'var(--text-secondary)'}}>Selecciona herramientas para comparar</div>
          <div style={{fontSize:13,marginTop:4}}>Usa el botón ☐ Comparar en 2–4 herramientas</div>
          <Link href="/" className="btn btn-primary" style={{display:'inline-block',marginTop:20,textDecoration:'none',padding:'10px 24px'}}>Explorar herramientas</Link>
        </div>
      ) : (
        <div style={{overflowX:'auto'}}>
          <table style={{borderCollapse:'collapse',width:'100%',minWidth:500,background:'var(--bg-surface)',border:'1px solid var(--border-default)'}}>
            <thead>
              <tr style={{background:'var(--bg-muted)'}}>
                <th style={thS}>Característica</th>
                {tools.map(t=><th key={t.id} style={{...thS,textAlign:'center'}}><a href={`/tool/${t.id}`} style={{color:'var(--accent)',textDecoration:'none',fontWeight:800,fontSize:14}}>{t.name}</a></th>)}
              </tr>
            </thead>
            <tbody>
              {[{l:'Precio',v:(t:Tool)=><strong>{t.price}</strong>},{l:'Idioma',v:(t:Tool)=>t.lang},{l:'Gratis',v:(t:Tool)=>t.free?'✅':'❌'},{l:'Rating',v:(t:Tool)=><span>⭐ {t.rating}/5</span>},{l:'Origen',v:(t:Tool)=>t.originLabel},{l:'Categorías',v:(t:Tool)=><span style={{fontSize:11}}>{t.categories?.join(' · ')}</span>},{l:'Plataformas',v:(t:Tool)=><span style={{fontSize:11}}>{t.platforms?.join(' · ')}</span>},{l:'Ventajas',v:(t:Tool)=><ul style={{margin:0,padding:'0 0 0 14px',fontSize:11,lineHeight:1.6}}>{t.pros?.slice(0,3).map((p,i)=><li key={i}>{p}</li>)}</ul>},{l:'Desventajas',v:(t:Tool)=><ul style={{margin:0,padding:'0 0 0 14px',fontSize:11,lineHeight:1.6}}>{t.cons?.slice(0,3).map((c,i)=><li key={i}>{c}</li>)}</ul>},{l:'Web',v:(t:Tool)=><a href={t.websiteUrl||'https://'+t.domain} target="_blank" rel="noopener" style={{color:'var(--accent)',textDecoration:'none',fontSize:13}}>Visitar ↗</a>}].map((r,i)=>(
                <tr key={i} style={{borderBottom:'1px solid var(--border-light)'}}>
                  <td style={{...tdS,fontWeight:700,fontSize:12,color:'var(--text-tertiary)',background:'var(--bg-muted)',whiteSpace:'nowrap'}}>{r.l}</td>
                  {tools.map(t=><td key={t.id} style={tdS}>{r.v(t)}</td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </main>
    <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>
  </>);
}

const thS:React.CSSProperties={padding:'14px 16px',fontSize:12,fontWeight:700,borderBottom:'2px solid var(--border-default)',textAlign:'left'};
const tdS:React.CSSProperties={padding:'12px 16px',fontSize:13,verticalAlign:'top'};

export default function CompararPage() {
  return <Suspense fallback={<div style={{padding:60,textAlign:'center',color:'var(--text-tertiary)'}}>Cargando…</div>}><CompararInner /></Suspense>;
}

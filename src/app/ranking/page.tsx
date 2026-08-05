'use client';

import { TOOLS, type Tool } from '@/lib/tools';
import Link from 'next/link';
import ToolIcon from '@/components/shared/ToolIcon';
import CompareBar from '@/components/shared/CompareBar';

export default function RankingPage() {
  // Sort by rating * stars (weighted score), then by rating
  const ranked = TOOLS.filter(Boolean).sort((a, b) => {
    const scoreA = (a.rating || 0) * (a.stars || 0);
    const scoreB = (b.rating || 0) * (b.stars || 0);
    if (scoreB !== scoreA) return scoreB - scoreA;
    return (b.stars || 0) - (a.stars || 0);
  });

  const top3 = ranked.slice(0, 3);

  return (<>
    <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)',position:'sticky',top:0,zIndex:100}}>
      <div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}>
        <a href="/" style={{fontSize:24,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a>
        <Link href="/" className="btn btn-outline" style={{textDecoration:'none',fontSize:13}}>← Volver</Link>
      </div>
    </header>

    <main style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'40px 24px 60px'}}>
      <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'28px 32px',marginBottom:24}}>
        <h1 style={{fontSize:24,fontWeight:900,margin:'0 0 8px'}}>📊 Ranking de Herramientas IA</h1>
        <p style={{fontSize:14,color:'var(--text-secondary)',margin:0}}>Las mejores herramientas de inteligencia artificial ordenadas por puntuación y valoraciones. {ranked.length} herramientas en total.</p>
      </div>

      {/* Top 3 spotlight */}
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:14,marginBottom:24}}>
        {top3.map((t, i) => (
          <Link key={t.id} href={`/tool/${t.id}`}
            style={{
              background: i === 0 ? 'linear-gradient(135deg, #fef3c7, #fde68a)' :
                         i === 1 ? 'linear-gradient(135deg, #e5e7eb, #d1d5db)' :
                                   'linear-gradient(135deg, #fed7aa, #fb923c)',
              borderRadius:'var(--radius)',padding:'24px 20px',textDecoration:'none',
              color:'inherit',textAlign:'center',position:'relative',overflow:'hidden'
            }}
          >
            <div style={{fontSize:40,marginBottom:8}}>{['🥇','🥈','🥉'][i]}</div>
            <div style={{margin:'0 auto 12px',display:'flex',justifyContent:'center'}}>
              <ToolIcon domain={t.domain} name={t.name} size={56} originTag={t.originTag} />
            </div>
            <div style={{fontWeight:800,fontSize:18}}>{t.name}</div>
            <div style={{fontSize:12,color:'var(--text-secondary)',marginTop:4}}>{t.domain}</div>
            <div style={{marginTop:8,fontSize:13,fontWeight:600}}>⭐ {t.rating} · {t.stars}/{t.starsTotal} estrellas</div>
          </Link>
        ))}
      </div>

      {/* Full ranking table */}
      <div style={{overflowX:'auto',background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:600}}>
          <thead>
            <tr style={{background:'var(--bg-muted)'}}>
              <th style={th}>#</th><th style={th}>Herramienta</th><th style={th}>Origen</th><th style={th}>Categoría</th><th style={th}>Punt.</th><th style={th}>Precio</th>
            </tr>
          </thead>
          <tbody>
            {ranked.map((t, i) => (
              <tr key={t.id}
                style={{borderBottom:'1px solid var(--border-light)',cursor:'pointer',transition:'background .15s'}}
                onMouseEnter={e=>{e.currentTarget.style.background='var(--bg-hover)'}}
                onMouseLeave={e=>{e.currentTarget.style.background=''}}
                onClick={()=>{window.location.href=`/tool/${t.id}`}}
              >
                <td style={td}>
                  <span style={{fontWeight:800,fontSize:16,color:i<3?'var(--gold)':'var(--text-tertiary)'}}>{i+1}</span>
                </td>
                <td style={td}>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <ToolIcon domain={t.domain} name={t.name} size={32} originTag={t.originTag} />
                    <div>
                      <div style={{fontWeight:700,fontSize:13}}>{t.name}</div>
                      <div style={{fontSize:11,color:'var(--text-tertiary)'}}>{t.domain}</div>
                    </div>
                  </div>
                </td>
                <td style={td}><span className={`tag ${t.originTag}`}>{t.originLabel}</span></td>
                <td style={td}>{(t.categories||[]).slice(0,2).map((c:string)=><span key={c} className="tag" style={{background:'var(--bg-muted)',padding:'2px 8px',fontSize:10,margin:1}}>{c}</span>)}</td>
                <td style={td}><span style={{color:'var(--gold)'}}>★</span> <strong>{t.rating}</strong></td>
                <td style={td}><strong style={{fontSize:13}}>{t.price}</strong>{t.priceSub&&<span style={{fontSize:11,color:'var(--text-tertiary)',marginLeft:4}}>{t.priceSub}</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>

    <CompareBar />
    <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px',marginTop:40}}>
      <div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div>
    </footer>
  </>);
}

const th:React.CSSProperties={padding:'12px 14px',fontSize:11,fontWeight:700,color:'var(--text-tertiary)',textAlign:'left',borderBottom:'2px solid var(--border-default)',whiteSpace:'nowrap'};
const td:React.CSSProperties={padding:14,verticalAlign:'middle',fontSize:13};

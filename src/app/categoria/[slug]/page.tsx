import { TOOLS } from '@/lib/tools';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ToolIcon from '@/components/shared/ToolIcon';

const CATS:Record<string,{name:string;icon:string;desc:string}>={
  'chat-ia':{name:'Chat IA',icon:'💬',desc:'Asistentes conversacionales con inteligencia artificial.'},
  'diseno':{name:'Diseño',icon:'🎨',desc:'Herramientas de diseño gráfico y creatividad con IA.'},
  'escritura':{name:'Escritura',icon:'✍️',desc:'Asistentes de redacción y corrección de textos.'},
  'imagenes':{name:'Imágenes',icon:'🖼️',desc:'Generación y edición de imágenes con inteligencia artificial.'},
  'programacion':{name:'Programación',icon:'💻',desc:'Asistentes de código y desarrollo con IA.'},
  'video':{name:'Video',icon:'📹',desc:'Creación y edición de video con inteligencia artificial.'},
  'audio':{name:'Audio',icon:'🎵',desc:'Síntesis de voz, música y edición de audio con IA.'},
  'traduccion':{name:'Traducción',icon:'🌐',desc:'Traducción automática con inteligencia artificial.'},
  'negocios':{name:'Negocios',icon:'📊',desc:'Herramientas IA para negocios y productividad.'},
  'busqueda':{name:'Búsqueda',icon:'🔍',desc:'Buscadores y asistentes de investigación con IA.'},
  'educacion':{name:'Educación',icon:'🎓',desc:'Plataformas de aprendizaje con inteligencia artificial.'},
};

export async function generateStaticParams(){return Object.keys(CATS).map(slug=>({slug}));}

function Stars({n,t}:{n:number;t:number}){return <span style={{display:'inline-flex',gap:1}}>{Array.from({length:t},(_,i)=><span key={i} style={{color:i<n?'var(--gold)':'var(--border-default)',fontSize:14}}>★</span>)}</span>;}

export default async function CategoriaPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const meta=CATS[slug];if(!meta)notFound();
  const catName=meta.name.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'');
  const tools=TOOLS.filter((t:any)=>t.categories.some((c:any)=>c.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')===catName));
  return (<>
    <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}><a href="/" style={{fontSize:24,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a><a href="/" className="btn btn-outline" style={{textDecoration:'none'}}>← Inicio</a></div></header>
    <main style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'40px 24px 60px'}}>
      <div style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'28px 32px',marginBottom:24}}>
        <h1 style={{fontSize:24,fontWeight:900,margin:'0 0 8px'}}>{meta.icon} {meta.name}</h1>
        <p style={{fontSize:14,color:'var(--text-secondary)',margin:0}}>{meta.desc} ({tools.length} herramientas)</p>
      </div>
      <div className="tool-grid" style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:14}}>
        {tools.map((t:any)=>(<Link key={t.id} href={`/tool/${t.id}`} style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'18px 20px',textDecoration:'none',color:'inherit',transition:'border-color .15s'}}>
          <div style={{display:'flex',alignItems:'center',gap:12}}>
            <ToolIcon domain={t.domain} name={t.name} size={44} originTag={t.originTag} />
            <div style={{flex:1,minWidth:0}}><div style={{fontWeight:700,fontSize:14}}>{t.name}</div><div style={{fontSize:11,color:'var(--text-tertiary)'}}>{t.domain}</div></div>
            <span className={`tag ${t.originTag}`} style={{flexShrink:0}}>{t.originLabel}</span>
          </div>
        </Link>))}
      </div>
    </main>
    <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>
  </>);
}

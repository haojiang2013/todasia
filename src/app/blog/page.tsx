import { BLOG_POSTS } from '@/lib/blog';
import Link from 'next/link';

export default function BlogPage() {
  return (
    <>
      <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}><a href="/" style={{fontSize:24,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a><a href="/" className="btn btn-outline" style={{textDecoration:'none'}}>← Inicio</a></div></header>
      <main style={{maxWidth:800,margin:'0 auto',padding:'40px 24px 60px'}}>
        <h1 style={{fontSize:28,fontWeight:900,letterSpacing:'-.02em',marginBottom:28}}>📝 Blog</h1>
        <div style={{display:'flex',flexDirection:'column',gap:16}}>
          {BLOG_POSTS.map(p=>(<Link key={p.slug} href={`/blog/${p.slug}`} style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'24px',textDecoration:'none',color:'inherit',transition:'border-color .15s'}}>
            <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:8}}>
              <span className="tag" style={{background:'var(--accent-light)',color:'var(--accent)',fontSize:11}}>{p.category}</span>
              <span style={{fontSize:12,color:'var(--text-tertiary)'}}>{p.date} · {p.readTime}</span>
            </div>
            <h2 style={{fontSize:20,fontWeight:800,margin:'0 0 6px'}}>{p.title}</h2>
            <p style={{fontSize:14,color:'var(--text-secondary)',margin:0}}>{p.excerpt}</p>
          </Link>))}
        </div>
      </main>
      <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>
    </>
  );
}

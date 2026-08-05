import { BLOG_POSTS } from '@/lib/blog';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ShareButtons from '@/components/ShareButtons';

export function generateStaticParams() { return BLOG_POSTS.map(p=>({slug:p.slug})); }

export default async function BlogPostPage({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params;
  const post=BLOG_POSTS.find(p=>p.slug===slug);
  if(!post)notFound();

  const html=post.body
    .replace(/^## (.+)$/gm,'<h2 style="font-size:22px;font-weight:800;margin:36px 0 14px;color:var(--accent);border-bottom:2px solid var(--border-default);padding-bottom:8px">$1</h2>')
    .replace(/^### (.+)$/gm,'<h3 style="font-size:17px;font-weight:700;margin:24px 0 8px">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g,'<strong>$1</strong>')
    .replace(/\n\n/g,'</p><p style="margin:0 0 14px">');

  return (<>
    <header style={{background:'var(--bg-surface)',borderBottom:'1px solid var(--border-default)'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:64}}><a href="/" style={{fontSize:24,fontWeight:900,color:'var(--accent)',textDecoration:'none'}}>TodasIA</a><Link href="/blog" className="btn btn-outline" style={{textDecoration:'none'}}>← Blog</Link></div></header>
    <main style={{maxWidth:750,margin:'0 auto',padding:'40px 24px 60px'}}>
      <article style={{background:'var(--bg-surface)',border:'1px solid var(--border-default)',borderRadius:'var(--radius)',padding:'32px 36px'}}>
        <div style={{marginBottom:16}}>
          <span className="tag" style={{background:'var(--accent-light)',color:'var(--accent)',fontSize:12,padding:'4px 12px'}}>{post.category}</span>
          <span style={{fontSize:13,color:'var(--text-tertiary)',marginLeft:12}}>{post.date} · {post.readTime}</span>
        </div>
        <h1 style={{fontSize:28,fontWeight:900,lineHeight:1.3,margin:'0 0 28px',letterSpacing:'-.01em'}}>{post.title}</h1>
        <div style={{fontSize:15,color:'var(--text-secondary)',lineHeight:1.9}} dangerouslySetInnerHTML={{__html:'<p>'+html+'</p>'}}/>
      </article>
      <div style={{marginTop:24,display:'flex',justifyContent:'center'}}><ShareButtons url={`https://todasia.com/blog/${post.slug}`} title={post.title}/></div>
    </main>
    <footer style={{background:'var(--bg-surface)',borderTop:'1px solid var(--border-default)',padding:'40px 0 20px'}}><div style={{maxWidth:'var(--container-w)',margin:'0 auto',textAlign:'center',fontSize:12,color:'var(--text-tertiary)'}}>© 2026 TodasIA</div></footer>
  </>);
}

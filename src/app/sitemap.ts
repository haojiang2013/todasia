import { TOOLS } from '@/lib/tools';
import { BLOG_POSTS } from '@/lib/blog';

const BASE = 'https://www.todasia.com';

export default function sitemap() {
  const entries: Array<{url:string;lastModified?:Date;changeFrequency?:string;priority?:number}> = [];

  // Static pages
  entries.push(
    {url:BASE,changeFrequency:'weekly',priority:1.0},
    {url:`${BASE}/blog`,changeFrequency:'weekly',priority:0.7},
    {url:`${BASE}/privacidad`,changeFrequency:'monthly',priority:0.5},
    {url:`${BASE}/terminos`,changeFrequency:'monthly',priority:0.5},
    {url:`${BASE}/submit`,changeFrequency:'monthly',priority:0.6},
  );

  // Category pages — only include those with actual pages
  const CAT_MAP: Record<string,string> = {
    'Chat IA':'chat-ia','Diseño':'diseno','Escritura':'escritura','Imágenes':'imagenes',
    'Programación':'programacion','Video':'video','Audio':'audio','Traducción':'traduccion',
    'Negocios':'negocios','Búsqueda':'busqueda','Educación':'educacion'
  };
  const catSlugs = new Set<string>();
  TOOLS.filter(Boolean).forEach(t => {
    if (t.categories) t.categories.forEach((c: string) => { const s = CAT_MAP[c]; if (s) catSlugs.add(s); });
  });
  catSlugs.forEach(slug => entries.push({url:`${BASE}/categoria/${slug}`,changeFrequency:'weekly',priority:0.7}));

  // Tool pages
  TOOLS.filter(Boolean).forEach(t => {
    if (t.id) entries.push({url:`${BASE}/tool/${t.id}`,changeFrequency:'weekly',priority:0.7});
  });

  // Blog posts
  BLOG_POSTS.forEach(p => {
    entries.push({url:`${BASE}/blog/${p.slug}`,changeFrequency:'monthly',priority:0.6});
  });

  return entries;
}

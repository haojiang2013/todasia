import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "TodasIA — Directorio de Herramientas IA en Español", template: "%s — TodasIA" },
  description: "Encuentra las mejores herramientas de inteligencia artificial en español. 50+ herramientas, desde startups españolas hasta apps globales. Busca, compara y elige.",
  keywords: "herramientas IA, inteligencia artificial, directorio IA, ChatGPT, español, España, Latinoamérica, IA gratis, IA online, comparador IA",
  robots: "index, follow",
  openGraph: {
    type: "website", locale: "es_ES", siteName: "TodasIA",
    title: "TodasIA — Directorio de Herramientas IA en Español",
    description: "El directorio de herramientas IA en español. Desde startups españolas hasta las más populares del mundo.",
    images: [{ url: "https://todasia.com/og-image.png", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "TodasIA", description: "Directorio de herramientas IA en español.", images: ["https://todasia.com/og-image.png"] },
  alternates: { canonical: "https://www.todasia.com" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />

        <script dangerouslySetInnerHTML={{ __html: `
          (function(){try{var t=localStorage.getItem('todasia-theme');if(t==='dark'||(!t&&matchMedia('(prefers-color-scheme:dark)').matches))document.documentElement.setAttribute('data-theme','dark');}catch(e){}})();
        `}} />
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-5K7V9D34SY"></script>
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','G-5K7V9D34SY');` }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org",
          "@graph":[
            {"@type":"Organization","@id":"https://todasia.com#org","name":"TodasIA","url":"https://www.todasia.com","description":"Directorio de herramientas IA en español"},
            {"@type":"WebSite","@id":"https://todasia.com#website","url":"https://www.todasia.com","name":"TodasIA","inLanguage":"es","publisher":{"@id":"https://todasia.com#org"},"potentialAction":{"@type":"SearchAction","target":"https://todasia.com/?search={q}","query-input":"required name=q"}},
            {"@type":"CollectionPage","@id":"https://todasia.com#webpage","url":"https://www.todasia.com","name":"TodasIA","isPartOf":{"@id":"https://todasia.com#website"}}
          ]
        })}} />
      </head>
      <body>{children}</body>
    </html>
  );
}

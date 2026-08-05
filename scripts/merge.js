const fs = require('fs');
let toolsTs = fs.readFileSync('src/lib/tools.ts', 'utf8');

const news = [
  {id:'mediktor',name:'Mediktor',domain:'mediktor.com',originTag:'tag-es',originLabel:'ES Espana',cats:['Salud'],desc:'Asistente medico con IA para evaluacion de sintomas y triaje. 35+ paises.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.3},
  {id:'tucuvi',name:'Tucuvi',domain:'tucuvi.com',originTag:'tag-es',originLabel:'ES Espana',cats:['Salud','Audio'],desc:'Asistente de voz IA para seguimiento medico. Certificacion Clase IIb en Europa.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.2},
  {id:'idoven',name:'Idoven',domain:'idoven.ai',originTag:'tag-es',originLabel:'ES Espana',cats:['Salud'],desc:'Primer cardiologo virtual con IA. TOP HealthTech 2025 por TIME.',free:false,price:'Contactar',lang:'OK Espanol',stars:5,rating:4.5},
  {id:'maite-ai',name:'Maite.ai',domain:'maite.ai',originTag:'tag-es',originLabel:'ES Espana',cats:['Legal'],desc:'Copiloto legal con IA entrenado en 3.3M documentos juridicos espanoles.',free:false,price:'Desde 29/mes',lang:'OK Espanol',stars:4,rating:4.2},
  {id:'taxdown',name:'TaxDown',domain:'taxdown.es',originTag:'tag-es',originLabel:'ES Espana',cats:['Finanzas'],desc:'Optimizacion fiscal con IA. 4M+ usuarios. Ahorro medio de 300-350 por declaracion.',free:true,price:'Gratis',priceSub:'~35/declaracion',lang:'OK Espanol',stars:4,rating:4.3},
  {id:'fintonic',name:'Fintonic',domain:'fintonic.com',originTag:'tag-es',originLabel:'ES Espana',cats:['Finanzas'],desc:'App de finanzas con IA. Categoriza gastos y calcula scoring. 1M+ usuarios.',free:true,price:'Gratis',lang:'OK Espanol',stars:4,rating:4.1},
  {id:'orbio',name:'Orbio',domain:'orbio.ai',originTag:'tag-es',originLabel:'ES Espana',cats:['Recursos Humanos','Chat IA'],desc:'Agentes IA para reclutamiento y onboarding. 60+ idiomas.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.2},
  {id:'bizneo',name:'Bizneo HR',domain:'bizneo.com',originTag:'tag-es',originLabel:'ES Espana',cats:['Recursos Humanos'],desc:'Suite RRHH con IA: reclutamiento y analitica predictiva. 5000+ empresas.',free:false,price:'Desde 99/mes',lang:'OK Espanol',stars:4,rating:4.3},
  {id:'enginy',name:'Enginy',domain:'enginy.ai',originTag:'tag-es',originLabel:'ES Espana',cats:['Ventas','Chat IA'],desc:'Agentes IA para prospeccion B2B. Automatiza investigacion y seguimiento.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.1},
  {id:'patagon-ai',name:'Patagon AI',domain:'patagon.ai',originTag:'tag-es',originLabel:'LA LatAm',cats:['Ventas','Chat IA'],desc:'Agentes IA para ventas por WhatsApp. Conversion 3x. 5 paises LATAM.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.0},
  {id:'leadsales',name:'Leadsales',domain:'leadsales.io',originTag:'tag-es',originLabel:'LA LatAm',cats:['Ventas'],desc:'Agente de ventas IA para PyMEs en WhatsApp. Partner Meta Business.',free:false,price:'Desde $29/mes',lang:'OK Espanol',stars:4,rating:4.0},
  {id:'wondercraft',name:'Wondercraft',domain:'wondercraft.ai',originTag:'tag-global',originLabel:'🌎 Global',cats:['Podcast','Audio'],desc:'Estudio de podcasts con IA. Convierte guiones en episodios en 30+ idiomas.',free:true,price:'Gratis',priceSub:'~$34/mes',lang:'OK Espanol',stars:4,rating:4.3},
  {id:'elevenlabs',name:'ElevenLabs',domain:'elevenlabs.io',originTag:'tag-global',originLabel:'🌎 Global',cats:['Audio','Podcast'],desc:'Voz IA lider: texto a voz, clonacion y podcasts multihablante en 32 idiomas.',free:true,price:'Gratis',priceSub:'~$5/mes',lang:'OK Espanol',stars:5,rating:4.7},
  {id:'betterpic',name:'BetterPic',domain:'betterpic.io',originTag:'tag-es',originLabel:'ES Espana',cats:['Imagenes'],desc:'Retratos profesionales con IA desde 15 selfies. 20x mas barato que fotografo.',free:false,price:'Desde $25',lang:'OK Espanol',stars:4,rating:4.2},
  {id:'modelia',name:'Modelia',domain:'modelia.ai',originTag:'tag-es',originLabel:'ES Espana',cats:['Imagenes','Diseno'],desc:'Generacion de imagenes IA para moda. Clientes: Desigual, Pepe Jeans.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.1},
  {id:'happyrobot',name:'HappyRobot',domain:'happyrobot.ai',originTag:'tag-es',originLabel:'ES Espana',cats:['Negocios'],desc:'Agentes IA para logistica y supply chain. 38M Serie B.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.2},
  {id:'internxt',name:'Internxt AI',domain:'internxt.com',originTag:'tag-es',originLabel:'ES Espana',cats:['Chat IA'],desc:'Alternativa europea a ChatGPT. 100% privada, cifrado extremo a extremo.',free:true,price:'Gratis',lang:'OK Espanol',stars:4,rating:4.1},
  {id:'gamma-app',name:'Gamma',domain:'gamma.app',originTag:'tag-global',originLabel:'🌎 Global',cats:['Negocios','Diseno'],desc:'Crea presentaciones y documentos con IA en segundos. 60+ idiomas.',free:true,price:'Gratis',priceSub:'~$10/mes',lang:'OK Espanol',stars:4,rating:4.5},
  {id:'notion-mail',name:'Notion Mail',domain:'notion.so/product/mail',originTag:'tag-global',originLabel:'🌎 Global',cats:['Email','Negocios'],desc:'Correo con IA que organiza, resume y redacta. 18+ idiomas.',free:true,price:'Gratis',lang:'OK Espanol',stars:4,rating:4.3},
  {id:'otter-ai',name:'Otter.ai',domain:'otter.ai',originTag:'tag-global',originLabel:'🌎 Global',cats:['Reuniones','Audio'],desc:'Transcripcion de reuniones con IA en espanol. Zoom, Meet y Teams.',free:true,price:'Gratis',priceSub:'~$17/mes',lang:'OK Espanol',stars:4,rating:4.4},
  {id:'meetgeek',name:'MeetGeek',domain:'meetgeek.ai',originTag:'tag-global',originLabel:'🌎 Global',cats:['Reuniones'],desc:'Graba y resume reuniones en 50+ idiomas. 300 min/mes gratis.',free:true,price:'Gratis',priceSub:'~$19/mes',lang:'OK Espanol',stars:4,rating:4.3},
  {id:'mito-ai',name:'MITO AI',domain:'mito.ai',originTag:'tag-es',originLabel:'ES Espana',cats:['Video'],desc:'Estudio de video con IA en el navegador. 4.5M de Lightspeed y Sequoia.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.1},
  {id:'telepatia-ai',name:'Telepatia AI',domain:'telepatia.ai',originTag:'tag-es',originLabel:'LA LatAm',cats:['Salud'],desc:'AI Doctor que transcribe consultas en tiempo real. 25+ hospitales.',free:false,price:'Contactar',lang:'OK Espanol',stars:4,rating:4.2},
];

const lastBracket = toolsTs.lastIndexOf('];');
let insert = '';
for (const t of news) {
  insert += ',\n  ' + JSON.stringify({
    id: t.id, name: t.name, domain: t.domain,
    originTag: t.originTag, originLabel: t.originLabel,
    categories: t.cats, stars: t.stars, rating: t.rating, starsTotal: 5,
    price: t.price, lang: t.lang, free: t.free, desc: t.desc,
    platforms: ['Web'],
    ...(t.priceSub ? { priceSub: t.priceSub } : {}),
  }).replace(/"([^"]+)":/g, '$1:').replace(/"tag-es"/g, "'tag-es'").replace(/"tag-global"/g, "'tag-global'");
}
toolsTs = toolsTs.slice(0, lastBracket) + insert + '\n];';
fs.writeFileSync('src/lib/tools.ts', toolsTs);
console.log('Added', news.length, 'tools. Total:', (toolsTs.match(/id:/g) || []).length);

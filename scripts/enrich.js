const fs = require('fs');
let toolsTs = fs.readFileSync('src/lib/tools.ts', 'utf8');

const enrich = {
  midjourney:{pros:['Calidad artistica insuperable','Estilo fotorrealista lider del mercado','Comunidad creativa masiva'],cons:['Solo via Discord sin app propia','Plan basico desde $10/mes','Curva de aprendizaje con prompts'],bestFor:['Artistas digitales','Creadores de contenido premium'],faqQ:'Necesito saber dibujar para usar Midjourney?',faqA:'No. Solo escribes prompts en ingles y la IA genera variantes.'},
  perplexity:{pros:['Buscador que cita fuentes verificables','Modo Pro con GPT-4o y Claude','Subida ilimitada de archivos'],cons:['Gratuito limitado a 5 busquedas Pro/dia','No tan creativo para escritura larga'],bestFor:['Investigadores y periodistas','Estudiantes universitarios'],faqQ:'Reemplaza a Google?',faqA:'Parcialmente. Para consultas factuales con fuentes si. Para navegacion web tradicional, no.'},
  platzi:{pros:['Cursos 100% en espanol enfocados en tech','Comunidad activa latinoamericana','Certificaciones reconocidas'],cons:['Suscripcion anual costosa (~$249/ano)','Calidad variable segun instructor'],bestFor:['Profesionales latinos entrando en tecnologia','Empresas capacitando equipos'],faqQ:'Los certificados tienen validez oficial?',faqA:'No son titulos universitarios pero muchas empresas los reconocen.'},
  escribelo:{pros:['IA especializada en SEO en espanol nativo','Genera articulos optimizados','Interfaz sencilla'],cons:['Solo texto, no multimedia','Requiere revision humana'],bestFor:['Blogueros SEO en espanol','Agencias de marketing de contenidos'],faqQ:'Google penaliza el contenido generado?',faqA:'No, si lo revisas y editas. Penaliza contenido masivo sin valor.'},
  magnific:{pros:['Escalado con IA que preserva detalles','Slider de creatividad ajustable','Ideal para fotografos'],cons:['Precio alto: desde $39/mes','Requiere GPU potente'],bestFor:['Fotografos profesionales','Artistas digitales'],faqQ:'Solo sube resolucion o cambia estilo?',faqA:'Ambas. Slider Creativity controla cuanto reinterpreta.'},
  'github-copilot':{pros:['Sugerencias de codigo en tiempo real','Soporta VS Code, JetBrains','Conoce el contexto del proyecto'],cons:['$10/mes individual','A veces sugiere codigo inseguro'],bestFor:['Desarrolladores escribiendo codigo repetitivo','Equipos acelerando code reviews'],faqQ:'Me va a reemplazar como programador?',faqA:'No. Acelera tareas mecanicas pero no entiende requisitos de negocio.'},
  voicemod:{pros:['Efectos de voz en tiempo real','Biblioteca enorme de voces','Gratuito con funciones basicas'],cons:['Pro desbloquea las mejores ($12/trimestre)','Solo PC, no consolas'],bestFor:['Streamers y creadores','Gamers'],faqQ:'Funciona con Discord y OBS?',faqA:'Si. Instalas como dispositivo virtual y ambos reciben la voz modificada.'},
  suno:{pros:['Genera canciones completas con IA','Calidad de produccion sorprendente','Plan gratuito con 50 creditos diarios'],cons:['Voces en espanol algo sinteticas','No puedes editar partes especificas'],bestFor:['Musicos buscando inspiracion','Creadores de contenido'],faqQ:'Puedo usar canciones en YouTube o Spotify?',faqA:'Con plan Pro ($10/mes) si. Plan gratuito requiere atribucion.'},
  runway:{pros:['Lider en generacion de video por IA','Estudio profesional multicapa','Plan gratuito con 125 creditos'],cons:['Resultados inconsistentes','Precio alto ($76/mes Unlimited)'],bestFor:['Cineastas independientes','Equipos de marketing'],faqQ:'Puede generar videos de mas de 10 segundos?',faqA:'Si, hasta 18 segundos con Gen-3 Alpha. Encadenas para videos mas largos.'},
  'uala':{pros:['App argentina que categoriza gastos con IA','Tarjeta Mastercard gratuita','Inversiones y prestamos en minutos'],cons:['Principalmente Argentina','Soporte con tiempos elevados'],bestFor:['Usuarios argentinos buscando banco digital','Jovenes empezando a invertir'],faqQ:'Reemplaza un banco tradicional?',faqA:'Para el dia a dia si. Para hipotecas, no.'},
  jelou:{pros:['Plataforma ecuatoriana que entiende jerga local','Integracion con WhatsApp Business','Sin codigo: chatbots con bloques'],cons:['Enfoque regional limita escalabilidad','Documentacion tecnica pequena'],bestFor:['Empresas latinas digitalizando atencion','E-commerce automatizando respuestas'],faqQ:'Solo WhatsApp?',faqA:'WhatsApp principal, pero tambien Facebook Messenger y chat web.'},
  vambe:{pros:['IA chilena enfocada en ventas conversacionales','Automatiza seguimiento de leads','Analitica de conversaciones'],cons:['Enfoque fuerte en mercado chileno','Precio por conversacion escalable'],bestFor:['Empresas B2C chilenas','Startups haciendo prospeccion por WhatsApp'],faqQ:'Puede cerrar ventas sola?',faqA:'Para productos simples si. Ventas complejas transfiere al humano.'},
  vidext:{pros:['Genera video desde texto o plantilla','Escalado masivo: cientos de videos','API para integracion empresarial'],cons:['Precios no accesibles para creadores individuales','Calidad inferior a Runway en generacion creativa'],bestFor:['Empresas necesitando video a escala','RRHH creando comunicaciones en video'],faqQ:'Cuantos videos puedo generar?',faqA:'Cientos o miles con una plantilla maestra y variables dinamicas.'},
  letterly:{pros:['Voz a texto que convierte audio en notas estructuradas','99 idiomas con precision en espanol','Formatea automaticamente'],cons:['Solo app movil, sin web','Calidad depende del audio'],bestFor:['Profesionales grabando ideas en movimiento','Periodistas necesitando transcripcion'],faqQ:'Solo transcribe o tambien resume?',faqA:'Ambos: transcripcion literal, resumen, lista de tareas, email o post.'},
  qamarero:{pros:['IA espanola para hosteleria: pedidos por voz','Integracion con TPV y cocina','Atiende en espanol natural'],cons:['Solo sector hostelero','Requiere hardware compatible'],bestFor:['Restaurantes con alto volumen','Cadenas estandarizando comandas'],faqQ:'Reemplaza a los camareros?',faqA:'No completamente. Automatiza pedidos, liberando al camarero para atencion.'},
  resumaker:{pros:['CV con IA en espanol en minutos','Plantillas optimizadas para ATS','Sugerencias inteligentes por industria'],cons:['Gratuito con marca de agua','Premium requiere suscripcion'],bestFor:['Profesionales buscando trabajo','Recien graduados'],faqQ:'Un CV con IA es detectado negativamente?',faqA:'No si lo personalizas. La estructura profesional es valorada.'},
  deepseek:{pros:['Chat de IA completamente gratuito','Razonamiento profundo con R1','1M tokens de contexto'],cons:['Servidores congestionados','Preocupaciones de privacidad'],bestFor:['Desarrolladores buscando modelo gratuito','Investigadores analizando documentos'],faqQ:'Es comparable a GPT-4?',faqA:'En razonamiento si. En creatividad y matices culturales, Claude y GPT-4o son superiores.'},
  'ioni-ai':{pros:['Customer service con IA auto-entrenable','Integracion con Zendesk, Salesforce','Resuelve tickets midiendo CSAT'],cons:['Precio alto: desde 500 euros/mes','Migracion de conocimiento lleva semanas'],bestFor:['Empresas medianas con alto volumen de tickets','Companias que ya usan Zendesk'],faqQ:'Cuantos tickets resuelve sin humanos?',faqA:'Entre 40% y 70% de nivel 1, dependiendo de tu base de conocimiento.'},
};

let updated = 0;
for (const [id, data] of Object.entries(enrich)) {
  if (new RegExp("id:'" + id + "'.*?pros:\\[").test(toolsTs)) continue;

  // Match: id:'xxx', ... platforms:['...'], ... desc:'...'
  // Insert pros/cons/bestFor/faq before websiteUrl or before the closing }
  const findDesc = new RegExp("(id:'" + id + "'.*?desc:'[^']*')");
  const m = toolsTs.match(findDesc);
  if (!m) continue;

  const insertAt = m.index + m[0].length;
  const insert = ',pros:' + JSON.stringify(data.pros) + ',cons:' + JSON.stringify(data.cons) + ',bestFor:' + JSON.stringify(data.bestFor) + ',faq:[{q:' + JSON.stringify(data.faqQ) + ',a:' + JSON.stringify(data.faqA) + '}]';

  toolsTs = toolsTs.slice(0, insertAt) + insert + toolsTs.slice(insertAt);
  updated++;
}

fs.writeFileSync('src/lib/tools.ts', toolsTs);
console.log('Updated:', updated, 'tools');

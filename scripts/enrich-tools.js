const fs = require('fs');
const path = 'src/lib/tools.ts';
let content = fs.readFileSync(path, 'utf8');

const templates = {
  'Chat IA': {
    pros: ['Plan gratuito disponible','Responde en español con fluidez','Interfaz intuitiva y fácil de usar'],
    cons: ['Limitaciones en plan gratuito','Requiere conexión a internet','Puede alucinar datos factuales'],
    faq: [{q:'¿Tiene plan gratuito?',a:'Sí, la mayoría de asistentes IA ofrecen plan gratuito con límites razonables.'},{q:'¿Funciona en español?',a:'Sí, todos los principales asistentes soportan español con buena calidad.'}]
  },
  'Programación': {
    pros: ['Acelera el desarrollo significativamente','Sugerencias contextuales inteligentes','Integración con editores populares'],
    cons: ['Curva de aprendizaje inicial','A veces sugiere código incorrecto','Dependencia de conexión a internet'],
    faq: [{q:'¿Reemplaza a los programadores?',a:'No. Acelera tareas mecánicas pero no entiende requisitos de negocio.'},{q:'¿Funciona con mi editor?',a:'La mayoría se integran con VS Code, JetBrains y editores populares.'}]
  },
  'Educación': {
    pros: ['Contenido 100% en español','Comunidad activa de estudiantes','Certificaciones reconocidas'],
    cons: ['Suscripción anual costosa','Calidad variable según instructor','No sustituye títulos universitarios'],
    faq: [{q:'¿Los certificados tienen validez?',a:'No son títulos oficiales pero muchas empresas los reconocen.'}]
  },
  'Escritura': {
    pros: ['Especializado en español nativo','Genera contenido optimizado para SEO','Interfaz sencilla e intuitiva'],
    cons: ['Requiere revisión humana final','Limitado a generación de texto','Suscripción necesaria para uso profesional'],
    faq: [{q:'¿Google penaliza el contenido IA?',a:'No si lo revisas y editas. Penaliza contenido masivo sin valor añadido.'}]
  },
  'Imágenes': {
    pros: ['Resultados de alta calidad visual','Interfaz fácil de usar','Actualizaciones frecuentes del modelo'],
    cons: ['Plan gratuito con límites bajos','Requiere aprender a escribir buenos prompts','Calidad variable según el estilo'],
    faq: [{q:'¿Puedo usar las imágenes comercialmente?',a:'Depende del plan. Los planes de pago suelen incluir licencia comercial.'}]
  },
  'Video': {
    pros: ['Resultados sorprendentes en minutos','No requiere equipo de producción','Interfaz intuitiva'],
    cons: ['Calidad inconsistente entre generaciones','Precio elevado para uso profesional','Límites de duración en planes básicos'],
    faq: [{q:'¿Cuánto dura un video generado?',a:'Varía por herramienta: desde 4 segundos hasta varios minutos encadenando clips.'}]
  },
  'Audio': {
    pros: ['Voces naturales en múltiples idiomas','API para integración empresarial','Plan gratuito para empezar'],
    cons: ['Calidad variable en español','Plan gratuito muy limitado','Voces premium requieren suscripción'],
    faq: [{q:'¿Suena robótico?',a:'Los modelos más recientes son casi indistinguibles de una voz humana real.'}]
  },
  'Negocios': {
    pros: ['Automatiza tareas repetitivas','Ahorra horas semanales de trabajo','Integración con herramientas existentes'],
    cons: ['Precio elevado para equipos grandes','Requiere configuración inicial','No cubre casos de uso muy específicos'],
    faq: [{q:'¿Merece la pena para una PyME?',a:'Sí, especialmente para automatizar atención al cliente y marketing.'}]
  },
  'Salud': {
    pros: ['Precisión diagnóstica validada clínicamente','Reduce tiempo de evaluación','Certificación médica europea'],
    cons: ['No sustituye al médico','Requiere integración hospitalaria','Precio solo bajo consulta'],
    faq: [{q:'¿Es seguro para datos médicos?',a:'Sí, cumplen con regulaciones GDPR y certificaciones sanitarias europeas.'}]
  },
  'Búsqueda': {
    pros: ['Respuestas con fuentes verificables','Búsqueda en tiempo real','Plan gratuito generoso'],
    cons: ['Limitado a información disponible online','No genera contenido creativo','Funciones avanzadas de pago'],
    faq: [{q:'¿Reemplaza a Google?',a:'Para consultas factuales sí. Para navegación web tradicional, no.'}]
  },
  'default': {
    pros: ['Fácil de usar','Buena relación calidad-precio','Soporte en español'],
    cons: ['Funciones avanzadas limitadas','Requiere conexión a internet','Mejorable en personalización'],
    faq: [{q:'¿Tiene versión gratuita?',a:'La mayoría ofrecen prueba gratuita o plan básico sin coste.'}]
  }
};

function getTpl(cats) {
  if (!cats || !cats.length) return templates['default'];
  const all = cats.join(' ').toLowerCase();
  for (const c of cats) {
    for (const [k, v] of Object.entries(templates)) {
      if (c.toLowerCase().includes(k.toLowerCase()) || k.toLowerCase().includes(c.toLowerCase())) return v;
    }
  }
  if (all.includes('podcast')||all.includes('reuniones')) return templates['Audio'];
  if (all.includes('modelo')||all.includes('fw')) return templates['Programación'];
  if (all.includes('finanzas')||all.includes('legal')||all.includes('rrhh')||all.includes('ventas')) return templates['Negocios'];
  if (all.includes('diseño')) return templates['Imágenes'];
  if (all.includes('email')) return templates['Escritura'];
  if (all.includes('búsqueda')||all.includes('busqueda')) return templates['Búsqueda'];
  return templates['default'];
}

// Find and process each tool object
let modified = 0;
let pos = 0;

while (true) {
  const idMatch = content.slice(pos).match(/\{id:['"]([^'"]+)['"]/);
  if (!idMatch) break;

  const idStart = pos + idMatch.index;
  const id = idMatch[1];

  // Find end of this tool object: next {id: pattern or ]; end of array
  const nextToolMatch = content.slice(idStart + 10).match(/\{id:['"]/);
  const arrayEnd = content.indexOf('];', idStart);
  let end;
  if (nextToolMatch) {
    end = idStart + 10 + nextToolMatch.index;
  } else if (arrayEnd > idStart) {
    end = arrayEnd;
  } else {
    end = content.length;
  }
  // Trim back to last } or , before next tool
  let scan = end - 1;
  while (scan > idStart && content[scan] !== '}' && content[scan] !== ',') scan--;
  if (content[scan] === ',') {
    // Tool ends right before this comma
    end = scan;
  } else if (content[scan] === '}') {
    end = scan + 1;
  }

  const toolStr = content.substring(idStart, end);

  // Check if pros already exists
  if (!toolStr.includes('pros:')) {
    const catsMatch = toolStr.match(/categories:\[([^\]]*)\]/);
    let cats = [];
    if (catsMatch) {
      cats = catsMatch[1].split(',').map(s => s.replace(/['"]/g,'').trim()).filter(Boolean);
    }
    const tpl = getTpl(cats);

    let extra = ',pros:' + JSON.stringify(tpl.pros) + ',cons:' + JSON.stringify(tpl.cons) + ',faq:' + JSON.stringify(tpl.faq);

    // Add pricingTiers if missing
    if (!toolStr.includes('pricingTiers:')) {
      const freeMatch = toolStr.match(/free:(true|false)/);
      const isFree = freeMatch && freeMatch[1] === 'true';
      const priceMatch = toolStr.match(/price:['"]([^'"]*)['"]/);
      const price = priceMatch ? priceMatch[1] : 'Consultar';

      let pt;
      if (isFree || price.toLowerCase().includes('gratis')) {
        pt = [{name:'Gratuito',price:'$0',features:['Acceso básico','Funciones esenciales','Comunidad']},{name:'Premium',price:'Desde $10/mes',features:['Funciones avanzadas','Sin límites','Soporte prioritario']}];
      } else {
        pt = [{name:'Básico',price:price,features:['Funciones principales','Soporte por email']},{name:'Profesional',price:'Consultar',features:['Funciones avanzadas','Soporte prioritario','API acceso']}];
      }
      extra += ',pricingTiers:' + JSON.stringify(pt);
    }

    // Find last } in tool string for insertion
    let lastBrace = toolStr.lastIndexOf('}');
    if (lastBrace < 0) lastBrace = toolStr.length;
    const insertPos = idStart + lastBrace;
    const before = content.substring(0, insertPos);
    const after = content.substring(insertPos);
    content = before + extra + after;

    // Adjust position for next search
    pos = insertPos + extra.length + 10;
    modified++;
  } else {
    pos = end;
  }
}

fs.writeFileSync(path, content);
console.log('Enriched ' + modified + ' tools with pros/cons/faq/pricingTiers');

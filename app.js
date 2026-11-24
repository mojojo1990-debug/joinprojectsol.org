(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const spanish = {
    obdArtCaption: '<strong>Arte conceptual</strong> · Ilustración de un espacio de asesoría para el vecindario, no de un local existente.',
    missionArtCaption: '<strong>Arte conceptual</strong> · Ilustración del aprendizaje práctico, no de un centro ni de un programa en funcionamiento.',
    headerTagline:'LAS PERSONAS PRIMERO. ENFOQUE COMUNITARIO.', skip:'Ir al contenido', ann:'UNA IDEA NACIDA EN DALLAS. UN FUTURO IMPULSADO POR LA COMUNIDAD.', stage:'AVANCE PÚBLICO DEL CONCEPTO',
    navVision:'La visión', navPaths:'Nuestros caminos', navGarden:'La red', navStudio:'Empieza aquí', headerCta:'Encuentra tu primer paso',
    heroEyebrow:'EL PRÓXIMO CAPÍTULO COMIENZA CON NOSOTROS', heroLine1:'Un futuro', heroLine2:'mejor', heroLine3:'comienza aquí.',
    heroDesc:'Las grandes cosas no tienen que empezar en grande. Empiezan con vecinos, habilidades reales, segundas oportunidades y alguien dispuesto a ayudar. Imaginamos una nueva red comunitaria: nacida en Dallas, para todos los que quieren avanzar.',
    heroBtn:'Encuentra tu primer paso', heroSecondary:'Explora la visión', heroCaptionHead:'Personas reales. Posibilidades reales.', heroCaption:'Concepto inicial · Sin registro',
    visualTitle:'LA RED VIVA / CONCEPTO', coreLabel:'LA CONEXIÓN HUMANA', nodePeople:'Vecinos', nodeMentors:'Mentores', nodeBusiness:'Negocios', nodeOpportunity:'Oportunidad', nodeSkills:'Habilidades', nodeSecond:'Segundas oportunidades', networkNote:'MAPA INTERACTIVO DE LA VISIÓN',
    sectionVisionEyebrow:'01 / POR QUÉ EXISTIMOS', sectionVisionTitle:'El potencial está en todas partes.<br><em>Las oportunidades, no.</em>',
    sectionVisionText:'Imaginamos una comunidad donde el conocimiento útil se comparte libremente, los negocios locales crecen y la segunda oportunidad de una persona abre puertas para otra.',
    manifesto:'Apoya a los negocios locales. Cuando nuestro barrio crece, nuestra comunidad crece. Y cuando nuestra comunidad crece, todos vivimos mejor.', manifestoBy:'NUESTRO COMPROMISO CON LA COMUNIDAD',
    principle1:'Las personas primero', principle1desc:'La tecnología debe servir a las personas, no al revés.', principle2:'Con raíces locales', principle2desc:'Comenzar en Dallas. Escuchar al barrio. Crecer con la comunidad.', principle3:'Construido en equipo', principle3desc:'Compartir habilidades, abrir puertas y celebrar el progreso con honestidad.',
    sectionPathsEyebrow:'02 / DOS CAMINOS · UN PROPÓSITO', sectionPathsTitle:'Construye un negocio.<br><em>Construye un barrio mejor.</em>', sectionPathsText:'Un emprendimiento local real y una visión comunitaria más amplia. Caminos distintos, unidos por la idea de que el progreso debe beneficiar a más personas.',
    earlyStage:'EMPRENDIMIENTO EN ETAPA INICIAL', businessText:'Un emprendimiento bilingüe de servicios digitales en Dallas para ayudar a negocios del barrio a tener presencia en línea, atender clientes y crecer con herramientas accesibles.', business1:'Sitios web y tiendas digitales', business2:'Visibilidad para negocios locales', business3:'Experiencias bilingües para clientes', businessBottom:'EL MOTOR ECONÓMICO <span aria-hidden="true">↗</span>',
    inDevelopment:'VISIÓN COMUNITARIA · EN DESARROLLO', communityText:'Una red propuesta que comienza en Dallas para aprender tecnología, conectar con mentores, descubrir caminos profesionales, crear comunidad y abrir nuevas oportunidades.', community1:'Tecnología y habilidades prácticas', community2:'Mentoría y conexiones', community3:'Oportunidades para volver a empezar', communityBottom:'LA VISIÓN COMUNITARIA <span aria-hidden="true">↗</span>',
    honesty:'La transparencia importa: joinprojectsol.org es una iniciativa en desarrollo, no una organización sin fines de lucro incorporada, un centro de capacitación operativo ni una red social ya lanzada. Los ejemplos y las imágenes muestran lo que buscamos construir.',
    gardenEyebrow:'03 / LA RED QUE IMAGINAMOS', gardenTitle:'Un barrio conectado.<br><em>Infinitas formas de avanzar.</em>', gardenText:'Nadie necesita saberlo todo. Alguien tiene una habilidad. Alguien tiene un espacio. Alguien necesita una oportunidad. Queremos facilitar esas conexiones.',
    bento1:'Vecinos ayudando a vecinos.', bento1desc:'Facilitar el descubrimiento de personas, ideas y recursos locales que vale la pena compartir.', bento2:'Habilidades reales.<br>Futuros reales.', bento2desc:'Desde herramientas digitales hasta electrónica y robótica: aprender debe abrir puertas.', bento3:'Pequeños negocios. Gran impacto.', bento3desc:'Dar a emprendedores locales maneras prácticas de llegar a quienes los rodean.', bento4:'Las segundas oportunidades son fortaleza.', bento4desc:'Crear caminos donde el pasado de una persona no limite su futuro.',
    studioEyebrow:'04 / TU PRÓXIMO PASO', studioTitle:'Cada futuro empieza<br>con <em>un paso.</em>', studioDesc:'No necesitas una idea perfecta para empezar. Cuéntanos qué tienes en mente y recibe un primer paso sencillo y útil. Esta vista previa funciona en tu dispositivo, sin cuenta y sin enviar datos.', studioPrivacy:'PRIVADO POR DISEÑO · TU IDEA PERMANECE EN ESTE DISPOSITIVO', panelTitle:'EL ESTUDIO DEL PRIMER PASO',
    inputType:'¿QUÉ QUIERES LOGRAR?', optionBusiness:'Iniciar o hacer crecer un negocio', optionSkills:'Aprender una habilidad útil', optionCareer:'Avanzar en mi carrera', optionCommunity:'Ayudar a mi comunidad', optionBuild:'Crear algo nuevo', inputIdea:'CUÉNTANOS TU IDEA CON TUS PALABRAS', studioButton:'Crear mi primer paso',
    resultKicker:'UN PUNTO DE PARTIDA PRÁCTICO', resultTitle:'Tus primeros pasos', copy:'Copiar plan', download:'Guardar como texto', startOver:'Empezar de nuevo', resultDisclaimer:'Esta es una plantilla de planificación guiada. Verifica los detalles antes de actuar.',
    roadmapEyebrow:'05 / EL CAMINO POR DELANTE', roadmapTitle:'La visión es grande.<br><em>El siguiente paso es real.</em>', roadmapText:'La meta no es anunciar que ya terminamos. Es mostrar el trabajo, probarlo con personas reales y mejorar con responsabilidad.', statusNow:'EN PROGRESO', road1:'Escuchar y aprender', road1desc:'Hablar con vecinos, educadores, pequeños negocios y personas que están reconstruyendo su camino.', statusNext:'SIGUIENTE', road2:'Probar proyectos piloto', road2desc:'Validar servicios digitales útiles y sesiones de aprendizaje práctico con aliados.', statusFuture:'META FUTURA', road3:'Hacer crecer la red', road3desc:'Desarrollar un lugar confiable para conectar habilidades, personas, negocios y oportunidades.',
    finalEyebrow:'DE UN BARRIO A TODO LO POSIBLE', finalTitle:'Cuando nuestro barrio crece,<br><em>todos avanzamos.</em>', finalText:'Creado en Dallas. Centrado en las personas. Impulsado por la convicción de que el mejor futuro lo construimos juntos.', finalButton:'Da tu primer paso', finalConnect:'Conecta con el fundador', footerLine:'Creado por Our Block Digital · Dallas, Texas<br>Las personas primero. Enfoque comunitario.', footerDisclaimer:'© 2026 joinprojectsol.org, vista previa del concepto. No se presenta como una organización sin fines de lucro ni una red social operativa.'
  };
  const descriptions = {
    en: {people:'People helping people—that’s where the network begins.', mentors:'Mentors share experience and open doors.', business:'Local businesses help neighborhoods thrive.', opportunity:'A connection can become a new opportunity.', skills:'Practical skills help people build their futures.', second:'Everyone deserves a meaningful second chance.'},
    es: {people:'Personas ayudando a personas: así comienza la red.', mentors:'Los mentores comparten experiencias y abren puertas.', business:'Los negocios locales fortalecen nuestros barrios.', opportunity:'Una conexión puede convertirse en una nueva oportunidad.', skills:'Las habilidades prácticas ayudan a construir el futuro.', second:'Todos merecemos una verdadera segunda oportunidad.'}
  };
  const stepPlans = {
    business: [
      ['Describe the customer you want to help and the problem they face.', 'Ask one potential customer how they solve that problem today.', 'Choose one simple service or product to test before spending money.'],
      ['Describe al cliente que quieres ayudar y el problema que enfrenta.', 'Pregunta a un posible cliente cómo resuelve ese problema hoy.', 'Elige un servicio o producto sencillo para probar antes de gastar dinero.']
    ],
    skills: [
      ['Name one specific skill you want to learn.', 'Find a free beginner lesson or a trusted mentor.', 'Practice for 20 minutes and note what you can now do.'],
      ['Nombra una habilidad específica que quieras aprender.', 'Busca una lección gratuita para principiantes o un mentor confiable.', 'Practica 20 minutos y anota lo que ya puedes hacer.']
    ],
    career: [
      ['Choose one role that interests you and review its requirements.', 'Match two current strengths to that role.', 'Update one résumé section or contact one trusted career resource.'],
      ['Elige un puesto que te interese y revisa sus requisitos.', 'Relaciona dos de tus fortalezas con ese puesto.', 'Actualiza una sección de tu currículum o contacta un recurso laboral confiable.']
    ],
    community: [
      ['Ask one neighbor what change would help most.', 'List the local resources and people already available.', 'Organize one small, permission-based action and gather feedback.'],
      ['Pregunta a un vecino qué cambio sería más útil.', 'Anota los recursos y las personas que ya están disponibles cerca.', 'Organiza una acción pequeña con permiso y pide opiniones.']
    ],
    build: [
      ['Write down what your project should do in one sentence.', 'Sketch the smallest version you could demonstrate.', 'Show your sketch to one person and ask what is unclear.'],
      ['Escribe en una oración lo que tu proyecto debe hacer.', 'Dibuja la versión más pequeña que puedas mostrar.', 'Muéstrala a alguien y pregunta qué partes no están claras.']
    ]
  };
  const nodes = $$('[data-i18n]');
  const english = new Map(nodes.map(node => [node, node.innerHTML]));
  const langButton = $('#lang-toggle');
  const menuButton = $('#menu-toggle');
  const mobileNav = $('#mobile-nav');
  const form = $('#idea-form');
  const idea = $('#idea-text');
  const category = $('#idea-path');
  const result = $('#result-panel');
  const nodeDescription = $('#node-description');
  let language = 'en';
  let selectedNode = 'people';
  let plan = null;
  function renderPlan() {
    if (!plan) return;
    $('#result-summary').textContent = language === 'es'
      ? 'Tu idea: “' + plan.idea + '”. Empieza con estos tres pasos, uno a la vez.'
      : 'Your idea: “' + plan.idea + '”. Start with these three steps, one at a time.';
    const list = $('#result-steps');
    list.replaceChildren();
    for (const sentence of stepPlans[plan.path][language === 'es' ? 1 : 0]) {
      const li = document.createElement('li');
      li.textContent = sentence;
      list.appendChild(li);
    }
    result.hidden = false;
  }
  function setLanguage(lang) {
    language = lang;
    document.documentElement.lang = lang;
    const businessArt = $('#obd-art-image');
    const missionArt = $('#mission-art-image');
    if (businessArt) businessArt.alt = lang === 'es' ? 'Ilustración de asientos y una mesa para asesorías a pequeños negocios.' : 'Illustration of seating and a table for small-business consultations.';
    if (missionArt) missionArt.alt = lang === 'es' ? 'Ilustración de un robot pequeño con ruedas sobre una mesa de trabajo.' : 'Illustration of a small wheeled robot on a workbench.';
    for (const node of nodes) {
      const translated = spanish[node.dataset.i18n];
      node.innerHTML = lang === 'es' && translated !== undefined ? translated : english.get(node);
    }
    idea.placeholder = lang === 'es'
      ? 'Quiero crear algo que ayude a las personas de mi barrio…'
      : 'I want to build something that helps people in my neighborhood…';
    $('#lang-label').textContent = lang === 'en' ? 'ES' : 'EN';
    langButton.setAttribute('aria-pressed', String(lang === 'es'));
    langButton.setAttribute('aria-label', lang === 'en' ? 'Cambiar a español' : 'Switch to English');
    nodeDescription.textContent = descriptions[language][selectedNode];
    menuButton.setAttribute('aria-label', lang === 'es' ? 'Abrir navegación' : 'Open navigation');
    if (plan) renderPlan();
  }
  function setMenu(open) {
    mobileNav.hidden = !open;
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open
      ? (language === 'es' ? 'Cerrar navegación' : 'Close navigation')
      : (language === 'es' ? 'Abrir navegación' : 'Open navigation'));
  }
  function planText() {
    if (!plan) return '';
    return [
      language === 'es' ? 'Tus primeros pasos' : 'Your first steps',
      $('#result-summary').textContent,
      ...[...$('#result-steps').querySelectorAll('li')].map((li, index) => String(index + 1) + '. ' + li.textContent),
      language === 'es' ? 'Plantilla local y orientativa.' : 'Local, self-guided template.'
    ].join('\n\n');
  }
  langButton.addEventListener('click', () => setLanguage(language === 'en' ? 'es' : 'en'));
  menuButton.addEventListener('click', () => setMenu(mobileNav.hidden));
  mobileNav.addEventListener('click', event => { if (event.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  document.addEventListener('click', event => {
    if (!mobileNav.hidden && !mobileNav.contains(event.target) && !menuButton.contains(event.target)) setMenu(false);
  });
  $$('.network-node').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.node === selectedNode));
    button.addEventListener('click', () => {
      selectedNode = button.dataset.node;
      $$('.network-node').forEach(node => {
        const active = node === button;
        node.classList.toggle('is-active', active);
        node.setAttribute('aria-pressed', String(active));
      });
      nodeDescription.textContent = descriptions[language][selectedNode];
    });
  });
  idea.addEventListener('input', () => { $('#char-count').textContent = String(idea.value.length) + ' / 500'; });
  form.addEventListener('submit', event => {
    event.preventDefault();
    const text = idea.value.trim();
    if (!text) {
      idea.setCustomValidity(language === 'es' ? 'Escribe tu idea para continuar.' : 'Please enter your idea to continue.');
      idea.reportValidity();
      idea.setCustomValidity('');
      idea.focus();
      return;
    }
    plan = {idea: text, path: stepPlans[category.value] ? category.value : 'build'};
    renderPlan();
    result.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest'});
  });
  $('#new-plan').addEventListener('click', () => {
    plan = null;
    form.reset();
    idea.value = '';
    $('#char-count').textContent = '0 / 500';
    result.hidden = true;
    idea.focus();
  });
  $('#copy-plan').addEventListener('click', async event => {
    const button = event.currentTarget;
    const text = planText();
    if (!text) return;
    try {
      if (!navigator.clipboard || !navigator.clipboard.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      button.textContent = language === 'es' ? '¡Copiado!' : 'Copied!';
    } catch {
      const field = document.createElement('textarea');
      field.value = text;
      field.style.position = 'fixed';
      field.style.opacity = '0';
      document.body.appendChild(field);
      field.select();
      const copied = document.execCommand && document.execCommand('copy');
      field.remove();
      button.textContent = copied
        ? (language === 'es' ? '¡Copiado!' : 'Copied!')
        : (language === 'es' ? 'No se pudo copiar' : 'Could not copy');
    }
    window.setTimeout(() => { button.textContent = language === 'es' ? spanish.copy : english.get(button); }, 1800);
  });
  $('#download-plan').addEventListener('click', () => {
    const text = planText();
    if (!text) return;
    const url = URL.createObjectURL(new Blob([text], {type:'text/plain;charset=utf-8'}));
    const a = document.createElement('a');
    a.href = url;
    a.download = 'joinprojectsol-first-steps.txt';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  });
  setMenu(false);
  setLanguage('en');
  if ('serviceWorker' in navigator && (location.protocol === 'https:' || ['localhost', '127.0.0.1'].includes(location.hostname))) {
    window.addEventListener('load', () => navigator.serviceWorker.register('./service-worker.js').catch(() => {}));
  }
})();
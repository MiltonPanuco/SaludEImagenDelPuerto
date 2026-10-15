import {mkdirSync, readFileSync, writeFileSync} from "node:fs";
import {dirname, resolve} from "node:path";
import {fileURLToPath, pathToFileURL} from "node:url";
import ts from "typescript";
import {services} from "../../frontend/client/src/serviceData";

const here = dirname(fileURLToPath(import.meta.url));
const sanityRoot = resolve(here, "..");
const projectRoot = resolve(sanityRoot, "..");
const mediaRoot = resolve(projectRoot, "frontend/client/public/media");

function readTranslations() {
  const path = resolve(projectRoot, "frontend/client/src/i18n.tsx");
  const source = ts.createSourceFile(path, readFileSync(path, "utf8"), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const translations = new Map<string, string>();
  source.forEachChild(node => {
    if (!ts.isVariableStatement(node)) return;
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== "esToEn" || !declaration.initializer || !ts.isObjectLiteralExpression(declaration.initializer)) continue;
      for (const property of declaration.initializer.properties) {
        if (!ts.isPropertyAssignment(property)) continue;
        const key = property.name;
        const value = property.initializer;
        if ((ts.isStringLiteral(key) || ts.isIdentifier(key)) && (ts.isStringLiteral(value) || ts.isNoSubstitutionTemplateLiteral(value))) {
          translations.set(ts.isIdentifier(key) ? key.text : key.text, value.text);
        }
      }
    }
  });
  return translations;
}

const translations = readTranslations();
const missing = new Set<string>();

function translated(es: string, en?: string) {
  const languageNeutral = !/[A-ZÁÉÍÓÚÜÑ¿¡]/i.test(es.replace(/[ap]\.?\s*m\.?/gi, ""));
  const english = en ?? translations.get(es) ?? (languageNeutral ? es : undefined);
  if (!english) missing.add(es);
  return {es, en: english ?? es};
}

const localizedString = (es: string, en?: string) => ({_type: "localizedString", ...translated(es, en)});
const localizedText = (es: string, en?: string) => ({_type: "localizedText", ...translated(es, en)});
const optionalString = (es: string, en?: string) => ({_type: "localizedOptionalString", ...translated(es, en)});
const optionalText = (es: string, en?: string) => ({_type: "localizedOptionalText", ...translated(es, en)});

function image(filename: string, alt: string, altEn?: string) {
  const asset = `image@${pathToFileURL(resolve(mediaRoot, filename)).href}`;
  const localizedAlt = translated(alt, altEn);
  return {
    _type: "localizedImage",
    es: {_type: "image", _sanityAsset: asset, alt: localizedAlt.es},
    en: {_type: "image", _sanityAsset: asset, alt: localizedAlt.en},
  };
}

const action = (label: string, href: string, labelEn?: string) => ({
  _type: "localizedAction",
  label: localizedString(label, labelEn),
  href,
});

type CardInput = {key: string; title: string; titleEn?: string; description?: string; descriptionEn?: string; image?: ReturnType<typeof image>; action?: ReturnType<typeof action>};
const card = ({key, title, titleEn, description, descriptionEn, image: cardImage, action: cardAction}: CardInput) => ({
  _key: key,
  _type: "contentCard",
  key,
  title: localizedString(title, titleEn),
  ...(description ? {description: optionalText(description, descriptionEn)} : {}),
  ...(cardImage ? {image: cardImage} : {}),
  ...(cardAction ? {action: cardAction} : {}),
});

type SectionInput = CardInput & {eyebrow?: string; eyebrowEn?: string; items?: ReturnType<typeof card>[]};
const section = ({key, eyebrow, eyebrowEn, title, titleEn, description, descriptionEn, image: sectionImage, items, action: sectionAction}: SectionInput) => ({
  _key: key,
  _type: "contentSection",
  key,
  ...(eyebrow ? {eyebrow: optionalString(eyebrow, eyebrowEn)} : {}),
  title: localizedString(title, titleEn),
  ...(description ? {description: optionalText(description, descriptionEn)} : {}),
  ...(sectionImage ? {image: sectionImage} : {}),
  ...(items ? {items} : {}),
  ...(sectionAction ? {action: sectionAction} : {}),
});

type PageInput = {
  id: string;
  type: string;
  seoTitle: string;
  seoDescription: string;
  hero: {eyebrow?: string; title: string; highlight?: string; description?: string; image: ReturnType<typeof image>; action?: ReturnType<typeof action>};
  sections: ReturnType<typeof section>[];
};

const page = ({id, type, seoTitle, seoDescription, hero, sections}: PageInput) => ({
  _id: id,
  _type: type,
  seo: {
    title: localizedString(seoTitle),
    description: localizedText(seoDescription),
    image: hero.image,
  },
  hero: {
    ...(hero.eyebrow ? {eyebrow: optionalString(hero.eyebrow)} : {}),
    title: localizedString(hero.title),
    ...(hero.highlight ? {highlight: optionalString(hero.highlight)} : {}),
    ...(hero.description ? {description: optionalText(hero.description)} : {}),
    image: hero.image,
    ...(hero.action ? {action: hero.action} : {}),
  },
  sections,
});

const homeHero = image("seidp-hero-main.webp", "Profesional de la salud realizando un estudio de ultrasonido");
const documents: Record<string, unknown>[] = [
  {
    _id: "site-settings",
    _type: "siteSettings",
    navigation: {
      home: localizedString("Inicio"),
      about: localizedString("Nosotros"),
      services: localizedString("Servicios"),
      prevention: localizedString("Prevención"),
      contact: localizedString("Contacto"),
    },
    contact: {
      address: localizedText("Calle 10 de Mayo #980, entre Guatemala y Brasil, Colonia Coapinole, Puerto Vallarta, Jalisco.", "10 de Mayo Street #980, between Guatemala and Brasil streets, Coapinole neighborhood, Puerto Vallarta, Jalisco."),
      appointmentPhone: "+523224035071",
      urgencyPhone: "+523221327405",
      whatsapp: "+523224704622",
      whatsappMessage: localizedText("Hola, me gustaría recibir información sobre sus servicios.", "Hello, I would like information about your services."),
      mapUrl: "https://maps.app.goo.gl/EnPoYMCfZ6Cm4Fzs7",
      socialLinks: [
        {_key: "facebook", _type: "object", name: "Facebook", url: "https://www.facebook.com/profile.php?id=61578808319790"},
        {_key: "instagram", _type: "object", name: "Instagram", url: "https://www.instagram.com/saludeimagendelpuerto/"},
      ],
    },
    hours: [
      {_key: "weekdays", _type: "object", days: localizedString("Lunes a viernes"), schedule: "8:00 a. m. - 8:00 p. m."},
      {_key: "weekend", _type: "object", days: localizedString("Sábado y domingo"), schedule: "8:00 a. m. - 2:00 p. m."},
    ],
    footer: {
      description: localizedText("Tu salud merece verse con claridad", "Your health deserves to be seen clearly"),
      copyright: localizedString("Salud e Imagen del Puerto.", "Salud e Imagen del Puerto."),
      privacyLabel: localizedString("Aviso de privacidad", "Privacy notice"),
      termsLabel: localizedString("Términos y condiciones", "Terms and conditions"),
    },
  },
  page({
    id: "page-home", type: "homePage",
    seoTitle: "Salud e Imagen del Puerto | Inicio",
    seoDescription: "Estudios de imagen, laboratorio y prevención en Puerto Vallarta. Información precisa para que tomes el siguiente paso con calma.",
    hero: {eyebrow: "Diagnóstico con atención humana", title: "Tu salud merece", highlight: "verse con claridad.", description: "Estudios de imagen, laboratorio y prevención en Puerto Vallarta. Información precisa para que tomes el siguiente paso con calma.", image: homeHero, action: action("Agendar una consulta", "/contacto")},
    sections: [
      section({key: "introduccion", eyebrow: "Atención que acompaña", title: "Tecnología precisa, trato cercano.", description: "Cada estudio comienza escuchándote. Nuestro equipo te orienta con claridad para que sepas qué esperar antes, durante y después de tu visita.", image: image("seidp-hero-clinic.webp", "Profesional de la salud realizando un estudio de ultrasonido"), action: action("Conoce nuestro enfoque", "/nosotros")}),
      section({key: "servicios", eyebrow: "Servicios principales", title: "Lo necesario para cuidar tu salud, en un mismo lugar.", description: "Reunimos estudios diagnósticos y opciones preventivas para ayudarte a tomar decisiones informadas.", action: action("Ver todos los servicios", "/servicios"), items: [
        card({key: "imagen-diagnostica", title: "Imagen diagnóstica", description: "Ultrasonidos y estudios de imagen con atención cercana y orientación sencilla.", image: image("seidp-ultrasonido-obstetrico.webp", "Profesional de la salud realizando un ultrasonido"), action: action("Conocer servicio", "/servicios/ultrasonidos")}),
        card({key: "laboratorio-clinico", title: "Laboratorio clínico", description: "Pruebas para seguimiento, prevención y apoyo al diagnóstico médico.", image: image("seidp-laboratorio.webp", "Profesional trabajando con material de laboratorio"), action: action("Conocer servicio", "/servicios/laboratorio-clinico")}),
        card({key: "paquetes-preventivos", title: "Paquetes preventivos", description: "Opciones organizadas para revisar tu salud sin esperar a tener síntomas.", image: image("seidp-prevention-family.webp", "Familia recibiendo orientación preventiva en un entorno clínico"), action: action("Conocer servicio", "/prevencion")}),
      ]}),
      section({key: "proceso", eyebrow: "Una visita más sencilla", title: "Saber qué sigue también da tranquilidad.", description: "Te acompañamos desde la elección del estudio hasta tus resultados, sin procesos innecesarios ni información confusa.", items: [
        card({key: "elegir", title: "Elige tu estudio", description: "Consulta el servicio que necesitas o escríbenos para orientarte."}),
        card({key: "agendar", title: "Agenda tu visita", description: "Confirma disponibilidad directamente con nuestro equipo."}),
        card({key: "atencion", title: "Recibe atención clara", description: "Te explicamos cada indicación antes de comenzar."}),
      ]}),
      section({key: "cierre", eyebrow: "Aquí empieza", title: "Una conversación clara también forma parte de tu cuidado.", action: action("Habla con nosotros", "/contacto")}),
    ],
  }),
  page({
    id: "page-about", type: "aboutPage",
    seoTitle: "Salud e Imagen del Puerto | Nosotros",
    seoDescription: "Un centro de salud creado para acercar imagen, laboratorio, prevención y orientación profesional a Coapinole y Puerto Vallarta.",
    hero: {eyebrow: "Nosotros", title: "Diagnóstico cercano,", highlight: "decisiones más claras.", description: "Un centro de salud creado para acercar imagen, laboratorio, prevención y orientación profesional a Coapinole y Puerto Vallarta.", image: image("seidp-consulta-medica.webp", "Profesional de la salud conversando con una paciente")},
    sections: [
      section({key: "historia", eyebrow: "Nuestra historia", title: "Nacimos para acercar estudios confiables a nuestra comunidad.", description: "Salud e Imagen del Puerto surge en Coapinole con una idea sencilla: reunir servicios de diagnóstico y prevención en un lugar accesible, con atención humana.", image: image("seidp-prevention-family.webp", "Atención médica y orientación profesional")}),
      section({key: "equipo", eyebrow: "Las personas detrás del centro", title: "Un equipo que escucha antes de comenzar.", description: "Nos tomamos el tiempo de escuchar tus dudas, conocer el motivo de tu visita y explicarte los siguientes pasos con claridad.", action: action("Conoce dónde estamos", "/contacto")}),
      section({key: "mision-vision", eyebrow: "El compromiso que nos mueve", title: "De nuestra comunidad.", description: "Para nuestra comunidad.", items: [
        card({key: "mision", title: "Hacer más cercano el cuidado de tu salud.", description: "Facilitar el acceso a estudios y orientación profesional, con calidad, trato humano e indicaciones claras."}),
        card({key: "vision", title: "Crecer contigo, seguir cerca.", description: "Ser un referente de salud diagnóstica en Puerto Vallarta, con atención profesional y comunicación comprensible."}),
      ]}),
      section({key: "valores", title: "El compromiso que nos mueve", items: [
        card({key: "cercania", title: "Cercanía", description: "Tratamos a cada persona con respeto, escucha y atención."}),
        card({key: "confianza", title: "Confianza", description: "Comunicamos indicaciones con honestidad y claridad."}),
        card({key: "prevencion", title: "Prevención", description: "Impulsamos decisiones informadas antes de que aparezcan síntomas."}),
      ]}),
    ],
  }),
  page({
    id: "page-services", type: "servicesPage",
    seoTitle: "Salud e Imagen del Puerto | Servicios",
    seoDescription: "Pruebas y estudios para seguimiento, prevención y apoyo al diagnóstico médico.",
    hero: {eyebrow: "Nuestros servicios", title: "Encuentra el estudio", highlight: "que necesitas.", description: "Te orientamos sobre disponibilidad, preparación y requisitos antes de tu cita.", image: image("seidp-hero-clinic.webp", "Profesional trabajando con equipo médico")},
    sections: [
      section({key: "categorias", eyebrow: "¿Qué estás buscando?", title: "Elige por el tipo de atención que buscas.", items: [
        card({key: "imagen", title: "Estudios de imagen", description: "Estudios de imagen para apoyar la valoración médica con orientación clara antes, durante y después de tu visita."}),
        card({key: "laboratorio", title: "Laboratorio y estudios clínicos", description: "Pruebas y estudios para seguimiento, prevención y apoyo al diagnóstico médico."}),
        card({key: "consultas", title: "Consultas y prevención", description: "Orientación profesional para cuidar tu salud, prevenir riesgos y dar seguimiento a tus necesidades."}),
      ]}),
      section({key: "servicios-destacados", eyebrow: "Para comenzar", title: "Conoce nuestros servicios principales.", description: "Compara en un vistazo qué evalúa cada estudio y las indicaciones que conviene considerar antes de acudir.", action: action("Ver todos los servicios", "/servicios")}),
      section({key: "orientacion", eyebrow: "¿No sabes qué estudio necesitas?", title: "Podemos ayudarte a ordenar la información.", description: "Envíanos la indicación de tu médico o escríbenos para ayudarte a identificar la información que necesitas antes de tu cita. Utiliza el botón flotante de WhatsApp cuando estés listo.", action: action("Consulta nuestros datos de contacto", "/contacto")}),
    ],
  }),
  page({
    id: "page-prevention", type: "preventionPage",
    seoTitle: "Salud e Imagen del Puerto | Prevención",
    seoDescription: "Conoce opciones para revisar tu salud de forma oportuna y tomar decisiones con mayor tranquilidad.",
    hero: {eyebrow: "Prevención", title: "Cuidarte también", highlight: "es prevenir.", description: "Conoce opciones para revisar tu salud de forma oportuna y tomar decisiones con mayor tranquilidad.", image: image("seidp-prevention-family.webp", "Familia recibiendo orientación preventiva en un entorno clínico")},
    sections: [
      section({key: "opciones", eyebrow: "Un punto de vista", title: "¿Qué quieres revisar?", description: "Estas opciones organizan la información disponible; no son diagnósticos ni sustituyen una valoración médica.", items: ["Revisión general", "Salud de la mujer", "Salud del hombre", "Corazón", "Laboratorio", "Nutrición y bienestar"].map((title, index) => card({key: `opcion-${index + 1}`, title}))}),
      section({key: "orientacion", eyebrow: "Opciones preventivas", title: "Primero entendemos qué necesitas revisar.", description: "Aún no presentamos paquetes cerrados porque los estudios y requisitos deben confirmarse de manera individual. Estas opciones te ayudan a comenzar sin inventar una lista que quizá no corresponda a tu caso.", items: [
        card({key: "opciones-preventivas", title: "Conoce tus opciones preventivas", description: "Explora posibilidades para revisar aspectos generales de tu salud sin asumir que existe una opción única para todas las personas."}),
        card({key: "estudios-adecuados", title: "Consulta qué estudios pueden ser adecuados", description: "Comparte tus antecedentes y la indicación de tu médico para recibir información sobre los estudios disponibles."}),
        card({key: "orientacion-equipo", title: "Recibe orientación de nuestro equipo", description: "Confirma requisitos, preparación y disponibilidad antes de acudir al centro."}),
      ]}),
      section({key: "beneficios", eyebrow: "Beneficios de orientarte", title: "Información para cuidar lo que sigue.", description: "Los estudios preventivos pueden aportar información útil para conversar con un profesional y decidir si necesitas seguimiento.", items: [
        card({key: "estado-salud", title: "Conoce mejor tu estado de salud", description: "Reúne información que puede ayudar a comprender tu situación actual."}),
        card({key: "seguimiento", title: "Identifica la necesidad de seguimiento", description: "Reconoce cambios o resultados que conviene revisar con un profesional."}),
        card({key: "orientacion-clara", title: "Recibe orientación clara", description: "Confirma qué sigue, cómo prepararte y cuándo consultar tus resultados."}),
      ]}),
      section({key: "aviso", eyebrow: "Prevención con información clara", title: "Entiende qué revisar, cómo prepararte y qué sigue.", description: "Te acompañamos antes de tu visita para confirmar requisitos y disponibilidad. Cuando estés listo, utiliza el botón flotante de WhatsApp o consulta nuestros datos de contacto.", image: image("seidp-consulta-medica.webp", "Profesional de la salud orientando a una paciente"), action: action("Ver datos de contacto", "/contacto")}),
    ],
  }),
  page({
    id: "page-contact", type: "contactPage",
    seoTitle: "Salud e Imagen del Puerto | Contacto",
    seoDescription: "Una duda, un estudio, tu próxima cita. Cuéntanos qué necesitas y te ayudamos a dar el siguiente paso.",
    hero: {eyebrow: "Contacto · Puerto Vallarta", title: "Hablemos.", highlight: "Estamos cerca.", description: "Una duda, un estudio, tu próxima cita. Cuéntanos qué necesitas y te ayudamos a dar el siguiente paso.", image: image("seidp-contacto-clinica.webp", "Entrada de una clínica en Puerto Vallarta"), action: action("Habla con nosotros", "#hablar")},
    sections: [
      section({key: "canales", eyebrow: "Contacto directo", title: "Te escuchamos y te orientamos.", description: "Elige el canal que prefieras. Comparte el estudio que buscas o la duda que deseas resolver.", items: [
        card({key: "whatsapp", title: "WhatsApp", description: "322 470 4622", action: action("Mensajes y citas", "https://wa.me/523224704622")}),
        card({key: "citas", title: "Línea de citas", description: "322 403 5071", action: action("Agenda por teléfono", "tel:+523224035071")}),
        card({key: "urgencias", title: "Urgencias", description: "322 132 7405", action: action("Confirma atención", "tel:+523221327405")}),
      ]}),
      section({key: "ubicacion", eyebrow: "Aquí nos encontramos", title: "Ven a conocernos.", description: "Calle 10 de Mayo #980, entre Guatemala y Brasil, Colonia Coapinole, Puerto Vallarta, Jalisco.", descriptionEn: "10 de Mayo Street #980, between Guatemala and Brasil streets, Coapinole neighborhood, Puerto Vallarta, Jalisco.", action: action("Cómo llegar", "https://maps.app.goo.gl/EnPoYMCfZ6Cm4Fzs7")}),
      section({key: "preguntas", eyebrow: "Antes de tu visita", title: "Llega con más claridad.", description: "Resolvemos las preguntas más comunes antes de tu cita.", items: [
        card({key: "agendar", title: "¿Cómo puedo agendar?", description: "Escríbenos por WhatsApp o llama al 322 403 5071. Te ayudaremos a confirmar el estudio y la disponibilidad."}),
        card({key: "llevar", title: "¿Qué debo llevar el día de mi estudio?", description: "Lleva tu orden médica si cuentas con una, una identificación y estudios previos relacionados. Al agendar te confirmaremos si necesitas algo adicional."}),
        card({key: "resultados", title: "¿Cuándo recibiré mis resultados?", description: "El tiempo de entrega depende del estudio. Pregunta por el plazo estimado al agendar o durante tu atención."}),
        card({key: "fin-semana", title: "¿Atienden fines de semana?", description: "Sí. Sábado y domingo atendemos de 8:00 a. m. a 2:00 p. m., sujeto a disponibilidad."}),
        card({key: "urgencias", title: "¿Atienden urgencias?", description: "Llama al 322 132 7405 para confirmar atención. Este número no sustituye al 911 ni a una ambulancia."}),
      ]}),
      section({key: "horarios", title: "Horarios de atención", titleEn: "Opening hours", items: [
        card({key: "lunes-viernes", title: "Lunes a viernes"}),
        card({key: "sabado-domingo", title: "Sábado y domingo"}),
      ]}),
    ],
  }),
];

const legalPages = [
  {
    id: "page-privacy", type: "privacyPage", seoTitle: "Salud e Imagen del Puerto | Aviso de privacidad", title: "Aviso de", highlight: "privacidad.",
    entries: [
      ["1. Responsable del tratamiento", "Salud e Imagen del Puerto, con domicilio en Calle 10 de Mayo #980, entre Guatemala y Brasil, Colonia Coapinole, Puerto Vallarta, Jalisco, México, es responsable del tratamiento y protección de los datos personales que sean proporcionados voluntariamente por medios de contacto como WhatsApp o teléfono."],
      ["2. Datos que podemos recibir", "Podemos recibir datos de identificación, contacto, información del estudio solicitado y la ubicación necesaria para coordinar una cita. Este sitio no utiliza formularios para solicitar datos personales."],
      ["3. Finalidades", "La información será utilizada para atender solicitudes, coordinar citas, confirmar disponibilidad y preparación, prestar los servicios solicitados y dar seguimiento a la atención."],
      ["4. Derechos ARCO", "La persona titular puede ejercer sus derechos de acceso, rectificación, cancelación u oposición, así como revocar su consentimiento, a través de WhatsApp o teléfono. La solicitud deberá incluir nombre, medio para recibir respuesta, descripción clara de la petición y documentación que acredite identidad cuando sea necesaria."],
      ["5. Protección y conservación", "Adoptamos medidas administrativas, técnicas y físicas razonables para proteger la información contra daño, pérdida, alteración, destrucción o acceso no autorizado. Conservaremos los datos durante el tiempo necesario para las finalidades descritas y las obligaciones legales aplicables."],
      ["6. Cambios al aviso", "Este aviso puede actualizarse para reflejar cambios operativos, legales o de servicio. La versión vigente estará disponible en esta página indicando la fecha de actualización."],
    ],
    note: "Este documento es una base informativa. Valida su versión final con asesoría legal especializada en protección de datos personales en México antes de publicarlo.",
  },
  {
    id: "page-terms", type: "termsPage", seoTitle: "Salud e Imagen del Puerto | Términos y condiciones", title: "Términos y", highlight: "condiciones.",
    entries: [
      ["1. Aceptación", "Al navegar por este sitio aceptas estos términos y condiciones. Si no estás de acuerdo, deja de utilizarlo. El sitio pertenece a Salud e Imagen del Puerto, con domicilio en Puerto Vallarta, Jalisco, México."],
      ["2. Finalidad informativa", "El contenido presenta información general sobre servicios de imagen, laboratorio, prevención y atención médica. No constituye diagnóstico, prescripción ni consejo médico y no sustituye la valoración de un profesional de la salud."],
      ["3. Urgencias", "Este sitio y sus canales digitales no son servicios de emergencia. Ante una urgencia médica llama al 911 o acude de inmediato al servicio de urgencias más cercano."],
      ["4. Citas, precios y disponibilidad", "Las citas se confirman únicamente por los canales de contacto indicados. Precios, promociones, horarios, preparación, cobertura y disponibilidad pueden cambiar; deben confirmarse directamente con el equipo del centro antes de acudir."],
      ["5. Uso responsable", "La persona usuaria se compromete a utilizar el sitio de forma lícita y a no intentar alterar su funcionamiento, acceder sin autorización a sistemas o datos, introducir código malicioso ni utilizar el contenido para engañar a terceros."],
      ["6. Propiedad intelectual", "Los textos, logotipos, elementos gráficos y demás contenido propio del sitio están protegidos por la legislación aplicable. No pueden reproducirse, modificarse o explotarse comercialmente sin autorización previa y por escrito."],
      ["7. Servicios de terceros", "Los enlaces a WhatsApp y redes sociales llevan a servicios administrados por terceros, sujetos a sus propios términos y políticas. Salud e Imagen del Puerto no controla su disponibilidad ni el tratamiento que esos servicios hagan de la información."],
      ["8. Cambios y legislación aplicable", "Podemos actualizar estos términos cuando cambien el sitio, los servicios o las disposiciones aplicables. La versión vigente será la publicada aquí. Cualquier controversia se interpretará conforme a las leyes de México y la jurisdicción competente de Jalisco."],
    ],
    note: "Este documento es una base informativa. Valida su versión final con asesoría legal especializada antes de publicarlo.",
  },
] as const;

for (const legal of legalPages) {
  documents.push(page({
    id: legal.id, type: legal.type, seoTitle: legal.seoTitle,
    seoDescription: legal.note,
    hero: {title: legal.title, highlight: legal.highlight, description: "Última actualización: 1 de octubre de 2026", image: homeHero},
    sections: [
      section({key: "contenido", title: legal.seoTitle, items: legal.entries.map(([title, description], index) => card({key: `apartado-${index + 1}`, title, description}))}),
      section({key: "nota-importante", title: "Nota importante", description: legal.note}),
    ],
  }));
}

const iconBySlug: Record<string, string> = {
  radiografias: "ScanLine",
  ultrasonidos: "Microscope",
  electrocardiogramas: "HeartPulse",
  "laboratorio-clinico": "TestTube2",
  "consulta-medica": "Stethoscope",
  "biopsias-guiadas": "Syringe",
  "consulta-nutricional": "Utensils",
};

services.forEach((service, order) => {
  documents.push({
    _id: `service-${service.slug}`,
    _type: "service",
    slug: {_type: "slug", current: service.slug},
    order,
    active: true,
    title: localizedString(service.title),
    summary: localizedText(service.short),
    introduction: localizedText(service.intro),
    image: image(service.image.replace("/media/", ""), service.alt),
    icon: iconBySlug[service.slug],
    highlights: service.highlights.map((value, index) => ({_key: `highlight-${index + 1}`, ...localizedString(value)})),
    catalogTitle: localizedString(service.catalogTitle),
    catalog: service.catalog.map((value, index) => ({_key: `catalog-${index + 1}`, ...localizedString(value)})),
    process: service.process.map(([title, description], index) => ({
      _key: `step-${index + 1}`,
      _type: "object",
      title: localizedString(title),
      description: localizedText(description),
    })),
  });
});

if (missing.size) {
  throw new Error(`Faltan traducciones al inglés para:\n${[...missing].sort().map(value => `- ${value}`).join("\n")}`);
}

const ids = documents.map(document => document._id);
if (ids.length !== 15 || new Set(ids).size !== ids.length) {
  throw new Error(`La semilla debe contener 15 documentos únicos; contiene ${ids.length}.`);
}

const outputDirectory = resolve(sanityRoot, ".seed");
const outputPath = resolve(outputDirectory, "production.ndjson");
mkdirSync(outputDirectory, {recursive: true});
writeFileSync(outputPath, `${documents.map(document => JSON.stringify(document)).join("\n")}\n`);
console.log(`Semilla lista: ${documents.length} documentos en ${outputPath}`);

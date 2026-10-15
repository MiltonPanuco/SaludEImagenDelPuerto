import {
  HeartPulse,
  Microscope,
  ScanLine,
  Stethoscope,
  Syringe,
  TestTube2,
  Utensils,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  intro: string;
  image: string;
  alt: string;
  highlights: readonly string[];
  catalogTitle: string;
  catalog: readonly string[];
  process: readonly (readonly [string, string])[];
  Icon: LucideIcon;
};

export const services: readonly Service[] = [
  {
    slug: "radiografias",
    title: "Radiografías",
    short: "Imágenes para apoyar la valoración médica de forma clara y oportuna.",
    intro: "Realizamos estudios de radiografía como apoyo para que tu profesional de salud pueda valorar distintas zonas del cuerpo.",
    image: "/media/seidp-radiografias.webp",
    alt: "Equipo médico utilizado para estudios de imagen",
    highlights: ["Confirma el tipo de proyección al agendar.", "Lleva tu orden médica si cuentas con una.", "Pregunta si tu estudio requiere preparación."],
    catalogTitle: "Radiografías que puedes consultar",
    catalog: ["Tórax", "Extremidades", "Columna y pelvis", "Cráneo y senos paranasales", "Proyecciones indicadas por tu médico"],
    process: [["Confirmamos la proyección", "Revisamos contigo qué zona y proyecciones fueron solicitadas."], ["Retiras objetos metálicos", "Te indicamos qué accesorios o prendas pueden interferir con la imagen."], ["Realizamos la toma", "Te ayudamos a colocarte correctamente para obtener las imágenes necesarias."]],
    Icon: ScanLine,
  },
  {
    slug: "ultrasonidos",
    title: "Ultrasonidos",
    short: "Estudios generales, obstétricos y especializados con orientación cercana.",
    intro: "Contamos con ultrasonidos generales, obstétricos, pélvicos, mamarios, prostáticos y estudios 3D sujetos a disponibilidad.",
    image: "/media/seidp-ultrasonido-obstetrico.webp",
    alt: "Profesional de la salud realizando un ultrasonido",
    highlights: ["La preparación depende del tipo de ultrasonido.", "Te explicamos las indicaciones antes de tu cita.", "Puedes consultar disponibilidad por teléfono o WhatsApp."],
    catalogTitle: "Tipos de ultrasonido",
    catalog: ["General", "Obstétrico", "Pélvico", "Mamario", "Prostático", "Ultrasonido 3D"],
    process: [["Confirmamos la preparación", "Algunos estudios requieren ayuno o vejiga llena; te damos la indicación exacta."], ["Revisamos antecedentes", "Puedes compartir estudios previos e información relevante antes de comenzar."], ["Exploramos la zona", "Aplicamos gel y realizamos el recorrido con el transductor de forma cuidadosa."]],
    Icon: Microscope,
  },
  {
    slug: "electrocardiogramas",
    title: "Electrocardiogramas",
    short: "Registro de la actividad eléctrica del corazón como apoyo clínico.",
    intro: "El electrocardiograma es un estudio breve y no invasivo que registra la actividad eléctrica del corazón para apoyar la valoración médica.",
    image: "/media/seidp-ekg.webp",
    alt: "Profesional de la salud durante una valoración clínica",
    highlights: ["Consulta disponibilidad antes de acudir.", "Usa ropa cómoda que facilite la colocación de electrodos.", "Comparte estudios previos si tu médico lo indicó."],
    catalogTitle: "Para qué puede solicitarse",
    catalog: ["Valoración en reposo", "Control médico", "Revisión preoperatoria", "Seguimiento de síntomas", "Apoyo a una valoración cardiovascular"],
    process: [["Descansas unos minutos", "El reposo previo ayuda a registrar la actividad del corazón en condiciones estables."], ["Colocamos los electrodos", "Se adhieren sensores en pecho y extremidades; no producen descargas."], ["Registramos la actividad", "La toma es breve y genera un trazado para la valoración profesional."]],
    Icon: HeartPulse,
  },
  {
    slug: "laboratorio-clinico",
    title: "Laboratorio clínico",
    short: "Toma de muestras para seguimiento, prevención y apoyo diagnóstico.",
    intro: "Realizamos toma de muestras para distintos análisis de laboratorio. Nuestro equipo confirma contigo el ayuno y las indicaciones de cada prueba.",
    image: "/media/seidp-laboratorio.webp",
    alt: "Profesional trabajando con material de laboratorio",
    highlights: ["No todos los análisis requieren ayuno.", "No suspendas medicamentos sin indicación médica.", "Confirma el tiempo estimado de entrega de resultados."],
    catalogTitle: "Áreas de laboratorio",
    catalog: ["Biometría hemática", "Química sanguínea", "Perfil de lípidos", "Examen general de orina", "Pruebas hormonales y antígenos"],
    process: [["Verificamos tus pruebas", "Confirmamos los análisis solicitados y si requieren ayuno u otra preparación."], ["Tomamos la muestra", "Realizamos la recolección correspondiente con material adecuado para cada estudio."], ["Indicamos la entrega", "Te informamos el tiempo estimado y la forma de consultar tus resultados."]],
    Icon: TestTube2,
  },
  {
    slug: "consulta-medica",
    title: "Consulta médica",
    short: "Atención médica y de especialistas sujeta a horarios y disponibilidad.",
    intro: "Consulta las especialidades disponibles y agenda una valoración para recibir orientación profesional de acuerdo con tus necesidades.",
    image: "/media/seidp-consulta-medica.webp",
    alt: "Profesional de la salud conversando con una paciente",
    highlights: ["Pregunta por la especialidad que necesitas.", "Lleva estudios y antecedentes relevantes.", "Confirma horario y disponibilidad al agendar."],
    catalogTitle: "Motivos de consulta",
    catalog: ["Valoración general", "Revisión de resultados", "Seguimiento médico", "Orientación preventiva", "Especialidades sujetas a disponibilidad"],
    process: [["Escuchamos el motivo", "Conversamos sobre síntomas, antecedentes y la razón principal de tu visita."], ["Realizamos la valoración", "El profesional revisa la información clínica y efectúa la exploración necesaria."], ["Acordamos los siguientes pasos", "Recibes indicaciones, solicitudes de estudio o seguimiento según la valoración."]],
    Icon: Stethoscope,
  },
  {
    slug: "biopsias-guiadas",
    title: "Biopsias guiadas",
    short: "Procedimientos guiados por ultrasonido bajo valoración profesional.",
    intro: "Las biopsias guiadas por ultrasonido requieren valoración previa e indicaciones personalizadas para realizarse de forma segura.",
    image: "/media/seidp-biopsia-ultrasonido.webp",
    alt: "Equipo de ultrasonido utilizado para guiar procedimientos",
    highlights: ["Requiere valoración y orden médica.", "La preparación se confirma de manera individual.", "Informa medicamentos, alergias y condiciones relevantes."],
    catalogTitle: "Cómo se organiza el procedimiento",
    catalog: ["Valoración previa", "Localización por ultrasonido", "Toma guiada", "Indicaciones personalizadas", "Seguimiento posterior"],
    process: [["Realizamos la valoración previa", "Revisamos la orden, antecedentes, medicamentos y estudios relacionados."], ["Localizamos la zona", "El ultrasonido permite identificar el sitio y acompañar la toma de forma precisa."], ["Explicamos los cuidados", "Al terminar recibes indicaciones específicas para las horas posteriores."]],
    Icon: Syringe,
  },
  {
    slug: "consulta-nutricional",
    title: "Consulta nutricional",
    short: "Orientación profesional para acompañar prevención y bienestar.",
    intro: "Recibe orientación nutricional adaptada a tus objetivos, hábitos y antecedentes para construir cambios realistas y sostenibles.",
    image: "/media/seidp-nutricion.webp",
    alt: "Consulta profesional orientada al bienestar",
    highlights: ["Comparte tus objetivos y antecedentes de salud.", "Lleva análisis recientes si cuentas con ellos.", "Pregunta por horarios y seguimiento disponible."],
    catalogTitle: "Qué incluye la orientación",
    catalog: ["Evaluación inicial", "Revisión de hábitos", "Objetivos realistas", "Plan de alimentación", "Seguimiento y ajustes"],
    process: [["Conocemos tu contexto", "Revisamos antecedentes, hábitos, horarios y los objetivos que deseas trabajar."], ["Realizamos la evaluación", "Integramos la información necesaria para definir prioridades realistas."], ["Construimos tu plan", "Recibes recomendaciones prácticas y una ruta de seguimiento con ajustes."]],
    Icon: Utensils,
  },
];

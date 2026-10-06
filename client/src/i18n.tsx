import { useLayoutEffect, useSyncExternalStore } from "react";

export type SiteLanguage = "es" | "en";

const esToEn: Record<string, string> = {
  // Navigation, shared actions and metadata.
  Inicio: "Home",
  Nosotros: "About us",
  Servicios: "Services",
  Prevención: "Prevention",
  Contacto: "Contact",
  "Ver todos los servicios": "View all services",
  "Conocer servicio": "Explore service",
  "Conocer el estudio": "Explore the study",
  Conocer: "Explore",
  Detalles: "Details",
  Llamar: "Call",
  "Consultar disponibilidad": "Check availability",
  "Consultar por WhatsApp": "Ask on WhatsApp",
  "Preguntar por WhatsApp": "Ask on WhatsApp",
  "Agenda por teléfono": "Schedule by phone",
  "Agendar una consulta": "Schedule a consultation",
  "Explorar servicios": "Explore services",
  "Habla con nosotros": "Talk to us",
  "¡Habla con nosotros!": "Talk to us!",
  "Ver indicaciones": "View instructions",
  "Ver datos de contacto": "View contact details",
  "Consulta nuestros datos de contacto": "View our contact details",
  "Conoce dónde estamos": "See where we are",
  "Ver estudios de imagen": "View imaging studies",
  "Ver estudios clínicos": "View clinical studies",
  "Ver consultas y prevención": "View consultations and prevention",
  "Ver tipos de radiografía": "View X-ray types",
  "Conocer ultrasonidos": "Explore ultrasounds",
  "Línea de citas": "Appointments line",
  "Mensajes y citas": "Messages and appointments",
  Urgencias: "Emergencies",
  Llamadas: "Calls",
  Centro: "Center",
  Local: "Clinic",
  Imagen: "Imaging",
  Laboratorio: "Laboratory",
  "Nota importante": "Important note",
  "Cargando Salud e Imagen del Puerto": "Loading Salud e Imagen del Puerto",
  "Lunes a viernes": "Monday to Friday",
  "Sábado y domingo": "Saturday and Sunday",
  "Salud e Imagen del Puerto | Inicio": "Salud e Imagen del Puerto | Home",
  "Salud e Imagen del Puerto | Servicios": "Salud e Imagen del Puerto | Services",
  "Salud e Imagen del Puerto | Prevención": "Salud e Imagen del Puerto | Prevention",
  "Salud e Imagen del Puerto | Nosotros": "Salud e Imagen del Puerto | About us",
  "Salud e Imagen del Puerto | Contacto": "Salud e Imagen del Puerto | Contact",
  "Salud e Imagen del Puerto | Aviso de privacidad": "Salud e Imagen del Puerto | Privacy notice",
  "Salud e Imagen del Puerto | Términos y condiciones": "Salud e Imagen del Puerto | Terms and conditions",
  "Salud e Imagen del Puerto | Página no encontrada": "Salud e Imagen del Puerto | Page not found",

  // Home.
  "Diagnóstico con atención humana": "Diagnosis with a human touch",
  "Tu salud merece": "Your health deserves",
  "verse con claridad.": "to be seen clearly.",
  "Tu salud merece verse con claridad": "Your health deserves to be seen clearly",
  "Conoce nuestro enfoque": "Learn about our approach",
  "Pacientes atendidos": "Patients served",
  "Estudios de imagen, laboratorio y prevención en Puerto Vallarta. Información precisa para que tomes el siguiente paso con calma.":
    "Imaging studies, laboratory services, and prevention in Puerto Vallarta. Clear information so you can take the next step with confidence.",
  "Aquí empieza": "It starts here",
  "Una conversación clara también forma parte de tu cuidado.":
    "A clear conversation is also part of your care.",
  "Servicios principales": "Main services",
  "Lo necesario para cuidar tu salud, en un mismo lugar.":
    "What you need to care for your health, all in one place.",
  "Reunimos estudios diagnósticos y opciones preventivas para ayudarte a tomar decisiones informadas.":
    "We bring together diagnostic studies and preventive options to help you make informed decisions.",
  "Imagen diagnóstica": "Diagnostic imaging",
  "Ultrasonidos y estudios de imagen con atención cercana y orientación sencilla.":
    "Ultrasounds and imaging studies with attentive care and straightforward guidance.",
  "Laboratorio clínico": "Clinical laboratory",
  "Pruebas para seguimiento, prevención y apoyo al diagnóstico médico.":
    "Tests for follow-up, prevention, and support for medical diagnosis.",
  "Paquetes preventivos": "Preventive options",
  "Opciones organizadas para revisar tu salud sin esperar a tener síntomas.":
    "Organized options to review your health before symptoms appear.",
  "Atención que acompaña": "Care that stays with you",
  "Tecnología precisa, trato cercano.": "Precise technology, personal care.",
  "Cada estudio comienza escuchándote. Nuestro equipo te orienta con claridad para que sepas qué esperar antes, durante y después de tu visita.":
    "Every study begins by listening to you. Our team provides clear guidance so you know what to expect before, during, and after your visit.",
  "Elige tu estudio": "Choose your study",
  "Consulta el servicio que necesitas o escríbenos para orientarte.":
    "Find the service you need or message us for guidance.",
  "Agenda tu visita": "Schedule your visit",
  "Confirma disponibilidad directamente con nuestro equipo.":
    "Confirm availability directly with our team.",
  "Recibe atención clara": "Receive clear care",
  "Te explicamos cada indicación antes de comenzar.":
    "We explain every instruction before we begin.",
  "Una visita más sencilla": "A simpler visit",
  "Llega con más claridad.": "Arrive with greater clarity.",
  "Te acompañamos desde la elección del estudio hasta tus resultados, sin procesos innecesarios ni información confusa.":
    "We support you from choosing your study through receiving your results, without unnecessary steps or confusing information.",

  // About us.
  "Diagnóstico cercano,": "Approachable diagnosis,",
  "decisiones más claras.": "clearer decisions.",
  "Un centro de salud creado para acercar imagen, laboratorio, prevención y orientación profesional a Coapinole y Puerto Vallarta.":
    "A health center created to bring imaging, laboratory, prevention, and professional guidance closer to Coapinole and Puerto Vallarta.",
  "Nuestra historia": "Our story",
  "Nacimos para acercar estudios confiables a nuestra comunidad.":
    "We were founded to bring reliable studies closer to our community.",
  "Salud e Imagen del Puerto surge en Coapinole con una idea sencilla: reunir servicios de diagnóstico y prevención en un lugar accesible, con atención humana.":
    "Salud e Imagen del Puerto began in Coapinole with a simple idea: to bring diagnostic and preventive services together in an accessible place with compassionate care.",
  "Desde el inicio buscamos que cada persona comprenda su proceso, reciba indicaciones claras y encuentre acompañamiento antes y después de su estudio.":
    "From the beginning, we have worked so every person understands their process, receives clear instructions, and feels supported before and after their study.",
  "Cerca de Coapinole": "Close to Coapinole",
  Integral: "Comprehensive",
  "Imagen, laboratorio y prevención": "Imaging, laboratory, and prevention",
  "Las personas detrás del centro": "The people behind the center",
  "Un equipo que escucha antes de comenzar.": "A team that listens before beginning.",
  "Nos tomamos el tiempo de escuchar tus dudas, conocer el motivo de tu visita y explicarte los siguientes pasos con claridad.":
    "We take the time to listen to your questions, understand the reason for your visit, and clearly explain the next steps.",
  "El compromiso que nos mueve": "The commitment that drives us",
  "Hacer más cercano el cuidado de tu salud.": "Bringing healthcare closer to you.",
  "01 · Nuestra misión": "01 · Our mission",
  "Facilitar el acceso a estudios y orientación profesional, con calidad, trato humano e indicaciones claras.":
    "To facilitate access to studies and professional guidance with quality, compassionate care, and clear instructions.",
  "02 · Nuestra visión": "02 · Our vision",
  "Ser un referente de salud diagnóstica en Puerto Vallarta, con atención profesional y comunicación comprensible.":
    "To be a trusted diagnostic health center in Puerto Vallarta, with professional care and clear communication.",
  "De nuestra comunidad.": "From our community.",
  "Para nuestra comunidad.": "For our community.",
  "Crecer contigo, seguir cerca.": "Growing with you, staying close.",
  Cercanía: "Closeness",
  "Tratamos a cada persona con respeto, escucha y atención.":
    "We treat every person with respect, attentiveness, and care.",
  Confianza: "Trust",
  "Comunicamos indicaciones con honestidad y claridad.":
    "We communicate instructions honestly and clearly.",
  "Impulsamos decisiones informadas antes de que aparezcan síntomas.":
    "We encourage informed decisions before symptoms appear.",

  // Services hub.
  "Nuestros servicios": "Our services",
  "Información para cuidar lo que sigue.": "Information to care for what comes next.",
  "Servicio diagnóstico": "Diagnostic service",
  "Consultar análisis": "Ask about testing",
  "Pruebas y estudios para seguimiento, prevención y apoyo al diagnóstico médico.":
    "Tests and studies for monitoring, prevention, and support in medical diagnosis.",
  "Podemos ayudarte a ordenar la información.":
    "We can help you make sense of the information.",
  "Conoce el siguiente paso": "Learn about the next step",
  "Estudios de imagen para apoyar la valoración médica con orientación clara antes, durante y después de tu visita.":
    "Imaging studies that support medical assessment, with clear guidance before, during, and after your visit.",
  "¿Qué estás buscando?": "What are you looking for?",
  "Elige por el tipo de atención que buscas.": "Choose by the type of care you need.",
  "Para comenzar": "To get started",
  "Conoce nuestros servicios principales.": "Explore our main services.",
  "Imágenes para apoyar la valoración médica de forma clara y oportuna.":
    "Images that support clear and timely medical assessment.",
  "Estudios generales, obstétricos y especializados con orientación cercana.":
    "General, obstetric, and specialized studies with attentive guidance.",
  "Registro de la actividad eléctrica del corazón como apoyo clínico.":
    "Recording of the heart's electrical activity to support clinical assessment.",
  "Toma de muestras para seguimiento, prevención y apoyo diagnóstico.":
    "Sample collection for follow-up, prevention, and diagnostic support.",
  "Atención médica y de especialistas sujeta a horarios y disponibilidad.":
    "General and specialist medical care, subject to schedules and availability.",
  "Procedimientos guiados por ultrasonido bajo valoración profesional.":
    "Ultrasound-guided procedures subject to professional assessment.",
  "Orientación profesional para acompañar prevención y bienestar.":
    "Professional guidance to support prevention and well-being.",
  "Todos los servicios": "All services",
  "Compara en un vistazo qué evalúa cada estudio y las indicaciones que conviene considerar antes de acudir.":
    "Compare at a glance what each study evaluates and the instructions to consider before your visit.",
  "Análisis de laboratorio": "Laboratory testing",
  "Consultas y prevención": "Consultations and prevention",
  "¿No sabes qué estudio necesitas?": "Not sure which study you need?",
  "Primero entendemos qué necesitas revisar.": "First, we understand what you need to review.",
  "Envíanos la indicación de tu médico o escríbenos para ayudarte a identificar la información que necesitas antes de tu cita. Utiliza el botón flotante de WhatsApp cuando estés listo.":
    "Send us your doctor's order or message us so we can help identify the information you need before your appointment. Use the floating WhatsApp button when you are ready.",
  "Comparte tu indicación": "Share your doctor's order",
  "Recibe orientación de nuestro equipo": "Receive guidance from our team",
  "Confirma preparación": "Confirm preparation",
  "Confirma requisitos, preparación y disponibilidad antes de acudir al centro.":
    "Confirm requirements, preparation, and availability before coming to the center.",

  // Prevention.
  "Un punto de vista": "A starting point",
  "Conoce tus opciones preventivas": "Learn about your preventive options",
  "Explora posibilidades para revisar aspectos generales de tu salud sin asumir que existe una opción única para todas las personas.":
    "Explore ways to review general aspects of your health without assuming there is one option for everyone.",
  "Consulta qué estudios pueden ser adecuados": "Ask which studies may be suitable",
  "Comparte tus antecedentes y la indicación de tu médico para recibir información sobre los estudios disponibles.":
    "Share your medical history and your doctor's referral to receive information about the available studies.",
  "Entiende qué revisar, cómo prepararte y qué sigue.":
    "Understand what to review, how to prepare, and what comes next.",
  "Los estudios preventivos pueden aportar información útil para conversar con un profesional y decidir si necesitas seguimiento.":
    "Preventive studies can provide useful information to discuss with a professional and decide whether you need follow-up.",
  "Prevenir también": "Prevention also",
  "es cuidarte.": "means caring for yourself.",
  "Orientación profesional para cuidar tu salud, prevenir riesgos y dar seguimiento a tus necesidades.":
    "Professional guidance to care for your health, prevent risks, and follow up on your needs.",
  "¿Qué quieres revisar?": "What would you like to review?",
  "Encuentra el estudio": "Find the study",
  "que necesitas.": "you need.",
  "Estudios de imagen": "Imaging studies",
  "Laboratorio y estudios clínicos": "Laboratory and clinical studies",
  "Evaluaciones preventivas": "Preventive assessments",
  Consultas: "Consultations",
  "Opciones preventivas": "Preventive options",
  "Conoce opciones para revisar tu salud de forma oportuna y tomar decisiones con mayor tranquilidad.":
    "Explore options to review your health in a timely way and make decisions with greater peace of mind.",
  "Salud de la mujer": "Women's health",
  "Salud del hombre": "Men's health",
  "Revisión general": "General checkup",
  "Corazón": "Heart health",
  "Nutrición y bienestar": "Nutrition and wellness",
  "Aún no presentamos paquetes cerrados porque los estudios y requisitos deben confirmarse de manera individual. Estas opciones te ayudan a comenzar sin inventar una lista que quizá no corresponda a tu caso.":
    "We do not present fixed packages because studies and requirements must be confirmed individually. These options help you get started without creating a list that may not fit your case.",
  "Estas opciones son una orientación inicial y no sustituyen una valoración médica.":
    "These options provide initial guidance and do not replace a medical assessment.",
  "Prevención con información clara": "Prevention with clear information",
  "Saber qué sigue también da tranquilidad.": "Knowing what comes next also brings peace of mind.",
  "Te acompañamos antes de tu visita para confirmar requisitos y disponibilidad. Cuando estés listo, utiliza el botón flotante de WhatsApp o consulta nuestros datos de contacto.":
    "We support you before your visit to confirm requirements and availability. When you are ready, use the floating WhatsApp button or view our contact details.",
  "Beneficios de orientarte": "Benefits of getting guidance",
  "Conoce mejor tu estado de salud": "Understand your health more clearly",
  "Reúne información que puede ayudar a comprender tu situación actual.":
    "Gather information that can help you understand your current situation.",
  "Identifica la necesidad de seguimiento": "Identify the need for follow-up",
  "Reconoce cambios o resultados que conviene revisar con un profesional.":
    "Recognize changes or results that should be reviewed with a professional.",
  "Recibe orientación clara": "Receive clear guidance",
  "Confirma qué sigue, cómo prepararte y cuándo consultar tus resultados.":
    "Confirm what comes next, how to prepare, and when to review your results.",
  "Estas opciones organizan la información disponible; no son diagnósticos ni sustituyen una valoración médica.":
    "These options organize the available information; they are not diagnoses and do not replace a medical assessment.",
  "Orientación 0": "Guidance 0",
  "Orientación para revisar tu salud de forma oportuna.":
    "Guidance to review your health in a timely way.",

  // Contact.
  "Contacto · Puerto Vallarta": "Contact · Puerto Vallarta",
  "Hablemos.": "Let's talk.",
  "Estamos cerca.": "We are nearby.",
  "Una duda, un estudio, tu próxima cita. Cuéntanos qué necesitas y te ayudamos a dar el siguiente paso.":
    "A question, a study, your next appointment. Tell us what you need and we will help you take the next step.",
  "Contacto directo": "Direct contact",
  "Te escuchamos y te orientamos.": "We listen and guide you.",
  "Elige el canal que prefieras. Comparte el estudio que buscas o la duda que deseas resolver.":
    "Choose the channel you prefer. Tell us which study you need or what question you would like to resolve.",
  WhatsApp: "WhatsApp",
  "Aquí nos encontramos": "Find us here",
  "Ven a conocernos.": "Come visit us.",
  "Puerto Vallarta, Jalisco": "Puerto Vallarta, Jalisco",
  "Nuestra dirección": "Our address",
  "Calle 10 de Mayo #980": "10 de Mayo Street #980",
  "Entre Guatemala y Brasil": "Between Guatemala and Brasil streets",
  "Colonia Coapinole, Puerto Vallarta, Jalisco.":
    "Coapinole neighborhood, Puerto Vallarta, Jalisco.",
  "Cómo llegar": "Directions",
  "Confirma atención": "Confirm service",
  "Antes de tu visita": "Before your visit",
  "Resolvemos las preguntas más comunes antes de tu cita.":
    "We answer the most common questions before your appointment.",
  "¿Cómo puedo agendar?": "How can I schedule an appointment?",
  "Escríbenos por WhatsApp o llama al 322 403 5071. Te ayudaremos a confirmar el estudio y la disponibilidad.":
    "Message us on WhatsApp or call 322 403 5071. We will help you confirm the study and availability.",
  "¿Qué debo llevar el día de mi estudio?": "What should I bring on the day of my study?",
  "Lleva tu orden médica si cuentas con una, una identificación y estudios previos relacionados. Al agendar te confirmaremos si necesitas algo adicional.":
    "Bring your doctor's order if you have one, an ID, and related previous studies. When scheduling, we will confirm whether you need anything else.",
  "¿Cuándo recibiré mis resultados?": "When will I receive my results?",
  "El tiempo de entrega depende del estudio. Pregunta por el plazo estimado al agendar o durante tu atención.":
    "Delivery time depends on the study. Ask for the estimated timeframe when scheduling or during your visit.",
  "¿Atienden fines de semana?": "Are you open on weekends?",
  "Sí. Sábado y domingo atendemos de 8:00 a. m. a 2:00 p. m., sujeto a disponibilidad.":
    "Yes. We are open Saturday and Sunday from 8:00 a.m. to 2:00 p.m., subject to availability.",
  "¿Atienden urgencias?": "Do you handle emergencies?",
  "Llama al 322 132 7405 para confirmar atención. Este número no sustituye al 911 ni a una ambulancia.":
    "Call 322 132 7405 to confirm care. This number does not replace 911 or an ambulance.",
  "¿Tu pregunta no aparece aquí?": "Is your question not listed here?",
  "La línea de urgencias no sustituye al 911 ni a una ambulancia.":
    "The emergency line does not replace 911 or an ambulance.",

  // Service names and shared detail labels.
  Radiografías: "X-rays",
  radiografías: "X-rays",
  Ultrasonidos: "Ultrasounds",
  ultrasonidos: "ultrasounds",
  Electrocardiogramas: "Electrocardiograms",
  electrocardiogramas: "electrocardiograms",
  "laboratorio clínico": "clinical laboratory",
  "Consulta médica": "Medical consultation",
  "consulta médica": "medical consultation",
  "Biopsias guiadas": "Guided biopsies",
  "biopsias guiadas": "guided biopsies",
  "Consulta nutricional": "Nutritional consultation",
  "consulta nutricional": "nutritional consultation",
  "Más claridad.": "Greater clarity.",
  "Acompañarte de cerca.": "Supporting you closely.",
  "Cada latido importa.": "Every heartbeat matters.",
  "Información valiosa.": "Valuable information.",
  "Te escuchamos.": "We listen to you.",
  "Cercanía en el proceso.": "Support throughout the process.",
  "Tu propio camino.": "Your own path.",
  "El estudio que necesitas": "The study you need",
  "Un espacio para ti": "A space for you",
  "Confirma con nuestro equipo el servicio que necesitas, su disponibilidad y las indicaciones para tu cita.":
    "Confirm with our team which service you need, its availability, and the instructions for your appointment.",
  "Antes de venir": "Before you come",
  "Tu cita comienza con buena información.": "Your appointment begins with good information.",
  "Confirma estas indicaciones al agendar.": "Confirm these instructions when scheduling.",
  "Indicación para tu cita": "Appointment instruction",
  "Así será tu visita": "What your visit will be like",
  "Contigo,": "With you,",
  "en cada paso.": "every step of the way.",
  "Conoce cómo se desarrolla tu atención de": "Learn what to expect during your",
  "Seguimos cuidando de ti": "We continue caring for you",
  "Tu cuidado puede continuar.": "Your care can continue.",
  "Explora servicios relacionados que pueden acompañar los siguientes pasos de tu atención.":
    "Explore related services that can support the next steps in your care.",
  "Preparación, requisitos y cita: confirma estos datos con nuestro equipo.":
    "Preparation, requirements, and appointment: confirm these details with our team.",

  // X-rays.
  "Realizamos estudios de radiografía como apoyo para que tu profesional de salud pueda valorar distintas zonas del cuerpo.":
    "We perform X-ray studies to help your healthcare professional assess different areas of the body.",
  "Radiografías que puedes consultar": "Available X-ray studies",
  Tórax: "Chest",
  Extremidades: "Extremities",
  "Columna y pelvis": "Spine and pelvis",
  "Cráneo y senos paranasales": "Skull and paranasal sinuses",
  "Proyecciones indicadas por tu médico": "Views requested by your doctor",
  "Confirma el tipo de proyección al agendar.": "Confirm the requested view when scheduling.",
  "Lleva tu orden médica si cuentas con una.": "Bring your doctor's order if you have one.",
  "Pregunta si tu estudio requiere preparación.": "Ask whether your study requires preparation.",
  "Confirmamos la proyección": "We confirm the requested view",
  "Revisamos contigo qué zona y proyecciones fueron solicitadas.":
    "We review which area and views were requested with you.",
  "Retiras objetos metálicos": "You remove metal objects",
  "Te indicamos qué accesorios o prendas pueden interferir con la imagen.":
    "We explain which accessories or garments may interfere with the image.",
  "Realizamos la toma": "We take the images",
  "Te ayudamos a colocarte correctamente para obtener las imágenes necesarias.":
    "We help position you correctly to obtain the necessary images.",

  // Ultrasounds.
  "Contamos con ultrasonidos generales, obstétricos, pélvicos, mamarios, prostáticos y estudios 3D sujetos a disponibilidad.":
    "We offer general, obstetric, pelvic, breast, prostate, and 3D ultrasounds, subject to availability.",
  "Tipos de ultrasonido": "Types of ultrasound",
  General: "General",
  Obstétrico: "Obstetric",
  Pélvico: "Pelvic",
  Mamario: "Breast",
  Prostático: "Prostate",
  "Ultrasonido 3D": "3D ultrasound",
  "La preparación depende del tipo de ultrasonido.": "Preparation depends on the type of ultrasound.",
  "Te explicamos las indicaciones antes de tu cita.": "We explain the instructions before your appointment.",
  "Puedes consultar disponibilidad por teléfono o WhatsApp.":
    "You can check availability by phone or WhatsApp.",
  "Confirmamos la preparación": "We confirm preparation",
  "Algunos estudios requieren ayuno o vejiga llena; te damos la indicación exacta.":
    "Some studies require fasting or a full bladder; we give you the exact instructions.",
  "Revisamos antecedentes": "We review your history",
  "Puedes compartir estudios previos e información relevante antes de comenzar.":
    "You may share previous studies and relevant information before we begin.",
  "Exploramos la zona": "We examine the area",
  "Aplicamos gel y realizamos el recorrido con el transductor de forma cuidadosa.":
    "We apply gel and carefully examine the area with the transducer.",

  // Electrocardiograms.
  "El electrocardiograma es un estudio breve y no invasivo que registra la actividad eléctrica del corazón para apoyar la valoración médica.":
    "An electrocardiogram is a brief, non-invasive study that records the heart's electrical activity to support medical assessment.",
  "Para qué puede solicitarse": "Why it may be requested",
  "Valoración en reposo": "Resting assessment",
  "Control médico": "Medical checkup",
  "Revisión preoperatoria": "Preoperative assessment",
  "Seguimiento de síntomas": "Symptom follow-up",
  "Apoyo a una valoración cardiovascular": "Support for cardiovascular assessment",
  "Consulta disponibilidad antes de acudir.": "Check availability before coming in.",
  "Usa ropa cómoda que facilite la colocación de electrodos.":
    "Wear comfortable clothing that allows easy electrode placement.",
  "Comparte estudios previos si tu médico lo indicó.":
    "Share previous studies if your doctor requested it.",
  "Descansas unos minutos": "You rest for a few minutes",
  "El reposo previo ayuda a registrar la actividad del corazón en condiciones estables.":
    "Resting beforehand helps record the heart's activity under stable conditions.",
  "Colocamos los electrodos": "We place the electrodes",
  "Se adhieren sensores en pecho y extremidades; no producen descargas.":
    "Sensors are attached to the chest and limbs; they do not deliver electrical shocks.",
  "Registramos la actividad": "We record the activity",
  "La toma es breve y genera un trazado para la valoración profesional.":
    "The recording is brief and produces a tracing for professional assessment.",

  // Laboratory.
  "Realizamos toma de muestras para distintos análisis de laboratorio. Nuestro equipo confirma contigo el ayuno y las indicaciones de cada prueba.":
    "We collect samples for different laboratory tests. Our team confirms fasting requirements and instructions for each test with you.",
  "Áreas de laboratorio": "Laboratory areas",
  "Biometría hemática": "Complete blood count",
  "Química sanguínea": "Blood chemistry",
  "Perfil de lípidos": "Lipid profile",
  "Examen general de orina": "Urinalysis",
  "Pruebas hormonales y antígenos": "Hormone and antigen tests",
  "No todos los análisis requieren ayuno.": "Not all tests require fasting.",
  "No suspendas medicamentos sin indicación médica.": "Do not stop medications without medical advice.",
  "Confirma el tiempo estimado de entrega de resultados.":
    "Confirm the estimated result delivery time.",
  "Verificamos tus pruebas": "We verify your tests",
  "Confirmamos los análisis solicitados y si requieren ayuno u otra preparación.":
    "We confirm the requested tests and whether they require fasting or other preparation.",
  "Tomamos la muestra": "We collect the sample",
  "Realizamos la recolección correspondiente con material adecuado para cada estudio.":
    "We collect the appropriate sample using suitable materials for each test.",
  "Indicamos la entrega": "We explain result delivery",
  "Te informamos el tiempo estimado y la forma de consultar tus resultados.":
    "We explain the estimated timeframe and how to access your results.",

  // Medical consultation.
  "Consulta las especialidades disponibles y agenda una valoración para recibir orientación profesional de acuerdo con tus necesidades.":
    "Review the available specialties and schedule an assessment to receive professional guidance based on your needs.",
  "Motivos de consulta": "Reasons for consultation",
  "Valoración general": "General assessment",
  "Revisión de resultados": "Results review",
  "Seguimiento médico": "Medical follow-up",
  "Orientación preventiva": "Preventive guidance",
  "Especialidades sujetas a disponibilidad": "Specialties subject to availability",
  "Pregunta por la especialidad que necesitas.": "Ask about the specialty you need.",
  "Lleva estudios y antecedentes relevantes.": "Bring relevant studies and medical history.",
  "Confirma horario y disponibilidad al agendar.": "Confirm schedule and availability when booking.",
  "Escuchamos el motivo": "We listen to your reason for visiting",
  "Conversamos sobre síntomas, antecedentes y la razón principal de tu visita.":
    "We discuss symptoms, medical history, and the main reason for your visit.",
  "Realizamos la valoración": "We perform the assessment",
  "El profesional revisa la información clínica y efectúa la exploración necesaria.":
    "The professional reviews the clinical information and performs the necessary examination.",
  "Acordamos los siguientes pasos": "We agree on the next steps",
  "Recibes indicaciones, solicitudes de estudio o seguimiento según la valoración.":
    "You receive instructions, study requests, or follow-up recommendations based on the assessment.",

  // Guided biopsies.
  "Las biopsias guiadas por ultrasonido requieren valoración previa e indicaciones personalizadas para realizarse de forma segura.":
    "Ultrasound-guided biopsies require prior assessment and personalized instructions to be performed safely.",
  "Cómo se organiza el procedimiento": "How the procedure is organized",
  "Valoración previa": "Prior assessment",
  "Localización por ultrasonido": "Ultrasound localization",
  "Toma guiada": "Guided sampling",
  "Indicaciones personalizadas": "Personalized instructions",
  "Seguimiento posterior": "Follow-up care",
  "Requiere valoración y orden médica.": "A medical assessment and doctor's order are required.",
  "La preparación se confirma de manera individual.": "Preparation is confirmed individually.",
  "Informa medicamentos, alergias y condiciones relevantes.":
    "Tell us about medications, allergies, and relevant conditions.",
  "Realizamos la valoración previa": "We perform the prior assessment",
  "Revisamos la orden, antecedentes, medicamentos y estudios relacionados.":
    "We review the order, medical history, medications, and related studies.",
  "Localizamos la zona": "We locate the area",
  "El ultrasonido permite identificar el sitio y acompañar la toma de forma precisa.":
    "Ultrasound helps identify the site and guide the sampling accurately.",
  "Explicamos los cuidados": "We explain aftercare",
  "Al terminar recibes indicaciones específicas para las horas posteriores.":
    "When finished, you receive specific instructions for the following hours.",

  // Nutritional consultation.
  "Recibe orientación nutricional adaptada a tus objetivos, hábitos y antecedentes para construir cambios realistas y sostenibles.":
    "Receive nutritional guidance tailored to your goals, habits, and history to build realistic, sustainable changes.",
  "Qué incluye la orientación": "What the guidance includes",
  "Evaluación inicial": "Initial assessment",
  "Revisión de hábitos": "Habit review",
  "Objetivos realistas": "Realistic goals",
  "Plan de alimentación": "Meal plan",
  "Seguimiento y ajustes": "Follow-up and adjustments",
  "Comparte tus objetivos y antecedentes de salud.": "Share your goals and health history.",
  "Lleva análisis recientes si cuentas con ellos.": "Bring recent test results if you have them.",
  "Pregunta por horarios y seguimiento disponible.": "Ask about schedules and available follow-up.",
  "Conocemos tu contexto": "We learn about your context",
  "Revisamos antecedentes, hábitos, horarios y los objetivos que deseas trabajar.":
    "We review your history, habits, schedule, and the goals you want to work on.",
  "Realizamos la evaluación": "We perform the assessment",
  "Integramos la información necesaria para definir prioridades realistas.":
    "We bring together the necessary information to set realistic priorities.",
  "Construimos tu plan": "We build your plan",
  "Recibes recomendaciones prácticas y una ruta de seguimiento con ajustes.":
    "You receive practical recommendations and a follow-up plan with adjustments.",

  // Practical service labels.
  "Ayuno según el estudio": "Fasting depending on the study",
  "Ayuno sólo si se indica": "Fast only if instructed",
  "Vejiga llena si se indica": "Full bladder if instructed",
  "Informa si hay embarazo": "Tell us if you are pregnant",
  "Retira objetos metálicos": "Remove metal objects",
  "Ubica el área a estudiar": "Identify the area to be studied",
  "Usa ropa cómoda": "Wear comfortable clothing",
  "Evita crema en el pecho": "Avoid lotion on the chest",
  "Registro en reposo": "Resting recording",
  "Identifica tu análisis": "Identify your test",
  "Pregunta por la entrega": "Ask about delivery",
  "Lleva estudios previos": "Bring previous studies",

  // Privacy and terms.
  "Aviso de": "Privacy",
  "privacidad.": "notice.",
  "Aviso de privacidad": "Privacy notice",
  "Última actualización: 1 de octubre de 2026": "Last updated: October 1, 2026",
  "1. Responsable del tratamiento": "1. Data controller",
  "Salud e Imagen del Puerto, con domicilio en Calle 10 de Mayo #980, entre Guatemala y Brasil, Colonia Coapinole, Puerto Vallarta, Jalisco, México, es responsable del tratamiento y protección de los datos personales que sean proporcionados voluntariamente por medios de contacto como WhatsApp o teléfono.":
    "Salud e Imagen del Puerto, located at 10 de Mayo Street #980, between Guatemala and Brasil streets, Coapinole neighborhood, Puerto Vallarta, Jalisco, Mexico, is responsible for processing and protecting personal data voluntarily provided through contact channels such as WhatsApp or telephone.",
  "2. Datos que podemos recibir": "2. Data we may receive",
  "Podemos recibir datos de identificación, contacto, información del estudio solicitado y la ubicación necesaria para coordinar una cita. Este sitio no utiliza formularios para solicitar datos personales.":
    "We may receive identification and contact details, information about the requested study, and the location needed to coordinate an appointment. This website does not use forms to request personal data.",
  "3. Finalidades": "3. Purposes",
  "La información será utilizada para atender solicitudes, coordinar citas, confirmar disponibilidad y preparación, prestar los servicios solicitados y dar seguimiento a la atención.":
    "The information will be used to respond to requests, coordinate appointments, confirm availability and preparation, provide the requested services, and follow up on care.",
  "4. Derechos ARCO": "4. ARCO rights",
  "La persona titular puede ejercer sus derechos de acceso, rectificación, cancelación u oposición, así como revocar su consentimiento, a través de WhatsApp o teléfono. La solicitud deberá incluir nombre, medio para recibir respuesta, descripción clara de la petición y documentación que acredite identidad cuando sea necesaria.":
    "The data subject may exercise rights of access, rectification, cancellation, or objection, and may revoke consent through WhatsApp or telephone. The request must include a name, a means of receiving a response, a clear description of the request, and documentation proving identity when necessary.",
  "5. Protección y conservación": "5. Protection and retention",
  "Adoptamos medidas administrativas, técnicas y físicas razonables para proteger la información contra daño, pérdida, alteración, destrucción o acceso no autorizado. Conservaremos los datos durante el tiempo necesario para las finalidades descritas y las obligaciones legales aplicables.":
    "We adopt reasonable administrative, technical, and physical measures to protect information against damage, loss, alteration, destruction, or unauthorized access. We retain data for as long as necessary for the purposes described and applicable legal obligations.",
  "6. Cambios al aviso": "6. Changes to this notice",
  "Este aviso puede actualizarse para reflejar cambios operativos, legales o de servicio. La versión vigente estará disponible en esta página indicando la fecha de actualización.":
    "This notice may be updated to reflect operational, legal, or service changes. The current version will be available on this page with its update date.",
  "Este documento es una base informativa. Valida su versión final con asesoría legal especializada en protección de datos personales en México antes de publicarlo.":
    "This document is provided for informational purposes. Have the final version reviewed by legal counsel specializing in personal data protection in Mexico before publication.",
  "Términos y": "Terms and",
  "condiciones.": "conditions.",
  "Términos y condiciones": "Terms and conditions",
  "1. Aceptación": "1. Acceptance",
  "Al navegar por este sitio aceptas estos términos y condiciones. Si no estás de acuerdo, deja de utilizarlo. El sitio pertenece a Salud e Imagen del Puerto, con domicilio en Puerto Vallarta, Jalisco, México.":
    "By browsing this website, you accept these terms and conditions. If you do not agree, stop using it. The website belongs to Salud e Imagen del Puerto, located in Puerto Vallarta, Jalisco, Mexico.",
  "2. Finalidad informativa": "2. Informational purpose",
  "El contenido presenta información general sobre servicios de imagen, laboratorio, prevención y atención médica. No constituye diagnóstico, prescripción ni consejo médico y no sustituye la valoración de un profesional de la salud.":
    "The content provides general information about imaging, laboratory, prevention, and medical care services. It does not constitute a diagnosis, prescription, or medical advice and does not replace assessment by a healthcare professional.",
  "3. Urgencias": "3. Emergencies",
  "Este sitio y sus canales digitales no son servicios de emergencia. Ante una urgencia médica llama al 911 o acude de inmediato al servicio de urgencias más cercano.":
    "This website and its digital channels are not emergency services. In a medical emergency, call 911 or go immediately to the nearest emergency department.",
  "4. Citas, precios y disponibilidad": "4. Appointments, prices, and availability",
  "Las citas se confirman únicamente por los canales de contacto indicados. Precios, promociones, horarios, preparación, cobertura y disponibilidad pueden cambiar; deben confirmarse directamente con el equipo del centro antes de acudir.":
    "Appointments are confirmed only through the listed contact channels. Prices, promotions, schedules, preparation, coverage, and availability may change and must be confirmed directly with the center's team before visiting.",
  "5. Uso responsable": "5. Responsible use",
  "La persona usuaria se compromete a utilizar el sitio de forma lícita y a no intentar alterar su funcionamiento, acceder sin autorización a sistemas o datos, introducir código malicioso ni utilizar el contenido para engañar a terceros.":
    "Users agree to use the website lawfully and not attempt to alter its operation, access systems or data without authorization, introduce malicious code, or use the content to mislead others.",
  "6. Propiedad intelectual": "6. Intellectual property",
  "Los textos, logotipos, elementos gráficos y demás contenido propio del sitio están protegidos por la legislación aplicable. No pueden reproducirse, modificarse o explotarse comercialmente sin autorización previa y por escrito.":
    "The website's text, logos, graphic elements, and other proprietary content are protected by applicable law. They may not be reproduced, modified, or commercially exploited without prior written authorization.",
  "7. Servicios de terceros": "7. Third-party services",
  "Los enlaces a WhatsApp y redes sociales llevan a servicios administrados por terceros, sujetos a sus propios términos y políticas. Salud e Imagen del Puerto no controla su disponibilidad ni el tratamiento que esos servicios hagan de la información.":
    "Links to WhatsApp and social media lead to services operated by third parties and governed by their own terms and policies. Salud e Imagen del Puerto does not control their availability or how those services process information.",
  "8. Cambios y legislación aplicable": "8. Changes and applicable law",
  "Podemos actualizar estos términos cuando cambien el sitio, los servicios o las disposiciones aplicables. La versión vigente será la publicada aquí. Cualquier controversia se interpretará conforme a las leyes de México y la jurisdicción competente de Jalisco.":
    "We may update these terms when the website, services, or applicable provisions change. The current version will be the one published here. Any dispute will be interpreted under the laws of Mexico and the competent jurisdiction of Jalisco.",
  "Este documento es una base informativa. Valida su versión final con asesoría legal especializada antes de publicarlo.":
    "This document is provided for informational purposes. Have the final version reviewed by specialized legal counsel before publication.",

  // Footer and accessibility labels.
  "Estamos cerca de ti": "We are close to you",
  "Cuidarte también": "Caring for you also",
  "es prevenir.": "means prevention.",
  "Te orientamos sobre disponibilidad, preparación y requisitos antes de tu cita.":
    "We guide you on availability, preparation, and requirements before your appointment.",
  "© 2026 Salud e Imagen del Puerto.": "© 2026 Salud e Imagen del Puerto.",
  "Navegación principal": "Main navigation",
  "Navegación móvil": "Mobile navigation",
  "Navegación del pie de página": "Footer navigation",
  "Servicios en el pie de página": "Footer services",
  "Accesos rápidos a servicios": "Quick access to services",
  "Abrir menú": "Open menu",
  "Cerrar menú": "Close menu",
  "Abrir WhatsApp de Salud e Imagen del Puerto": "Open Salud e Imagen del Puerto on WhatsApp",
  "Llamar a Salud e Imagen del Puerto": "Call Salud e Imagen del Puerto",
  "Salud e Imagen del Puerto, inicio": "Salud e Imagen del Puerto, home",
  "Salud e Imagen del Puerto en números": "Salud e Imagen del Puerto in numbers",
  "Cargando nueva página": "Loading new page",

  // Image and section descriptions.
  "Atención médica y orientación profesional": "Medical care and professional guidance",
  "Consulta profesional orientada al bienestar": "Professional wellness consultation",
  "Entrada de una clínica en Puerto Vallarta": "Entrance to a clinic in Puerto Vallarta",
  "Equipo de ultrasonido utilizado para guiar procedimientos": "Ultrasound equipment used to guide procedures",
  "Equipo médico utilizado para estudios de imagen": "Medical equipment used for imaging studies",
  "Familia recibiendo orientación preventiva en un entorno clínico": "Family receiving preventive guidance in a clinical setting",
  "Mapa satelital 3D de Salud e Imagen del Puerto": "3D satellite map of Salud e Imagen del Puerto",
  "Preparación para biopsias guiadas": "Preparation for guided biopsies",
  "Preparación para consulta médica": "Preparation for a medical consultation",
  "Preparación para consulta nutricional": "Preparation for a nutritional consultation",
  "Preparación para electrocardiogramas": "Preparation for electrocardiograms",
  "Preparación para laboratorio clínico": "Preparation for clinical laboratory testing",
  "Preparación para radiografías": "Preparation for X-rays",
  "Preparación para ultrasonidos": "Preparation for ultrasounds",
  "Profesional de la salud conversando con una paciente": "Healthcare professional speaking with a patient",
  "Profesional de la salud durante una valoración clínica": "Healthcare professional during a clinical assessment",
  "Profesional de la salud orientando a una paciente": "Healthcare professional guiding a patient",
  "Profesional de la salud realizando un estudio de ultrasonido": "Healthcare professional performing an ultrasound study",
  "Profesional de la salud realizando un ultrasonido": "Healthcare professional performing an ultrasound",
  "Profesional trabajando con equipo de laboratorio": "Professional working with laboratory equipment",
  "Profesional trabajando con equipo médico": "Professional working with medical equipment",
  "Profesional trabajando con material de laboratorio": "Professional working with laboratory materials",
  "Información práctica de Electrocardiogramas": "Practical information about electrocardiograms",
  "Información práctica de Laboratorio clínico": "Practical information about clinical laboratory testing",
  "Información práctica de Radiografías": "Practical information about X-rays",
  "Información práctica de Ultrasonidos": "Practical information about ultrasounds",
  "Revisa estas indicaciones antes de acudir a tu cita de radiografías.":
    "Review these instructions before attending your X-ray appointment.",
  "Revisa estas indicaciones antes de acudir a tu cita de electrocardiogramas.":
    "Review these instructions before attending your electrocardiogram appointment.",
  "Revisa estas indicaciones antes de acudir a tu cita de consulta médica.":
    "Review these instructions before attending your medical consultation.",
  "Revisa estas indicaciones antes de acudir a tu cita de consulta nutricional.":
    "Review these instructions before attending your nutrition consultation.",
  "Recorrido de información de Biopsias guiadas": "Guided biopsy information journey",
  "Recorrido de información de Consulta médica": "Medical consultation information journey",
  "Recorrido de información de Consulta nutricional": "Nutritional consultation information journey",
  "Recorrido de información de Electrocardiogramas": "Electrocardiogram information journey",
  "Recorrido de información de Laboratorio clínico": "Clinical laboratory information journey",
  "Recorrido de información de Radiografías": "X-ray information journey",
  "Recorrido de información de Ultrasonidos": "Ultrasound information journey",
};

const languageFromPath = (): SiteLanguage =>
  window.location.pathname.match(/^\/(es|en)(?=\/|$)/)?.[1] === "en"
    ? "en"
    : "es";

let language: SiteLanguage = languageFromPath();
const listeners = new Set<() => void>();
export const LANGUAGE_CHANGE_START_EVENT = "seidp-language-change-start";
let languageChangeTimer: number | undefined;

export function setSiteLanguage(nextLanguage: SiteLanguage) {
  const currentPath = window.location.pathname.replace(
    /^\/(es|en)(?=\/|$)/,
    ""
  );
  const localizedPath = `/${nextLanguage}${currentPath || "/"}`;
  if (
    language === nextLanguage &&
    window.location.pathname === localizedPath
  ) return;
  window.dispatchEvent(new Event(LANGUAGE_CHANGE_START_EVENT));
  window.clearTimeout(languageChangeTimer);
  languageChangeTimer = window.setTimeout(() => {
    window.history.pushState(
      window.history.state,
      "",
      `${localizedPath}${window.location.search}${window.location.hash}`
    );
    language = nextLanguage;
    try {
      localStorage.setItem("seidp-language", language);
    } catch {
      // Language still changes when storage is unavailable.
    }
    listeners.forEach(listener => listener());
    window.dispatchEvent(new PopStateEvent("popstate"));
  }, 450);
}

window.addEventListener("popstate", () => {
  const nextLanguage = languageFromPath();
  if (nextLanguage === language) return;
  language = nextLanguage;
  listeners.forEach(listener => listener());
});

export function useSiteLanguage() {
  return useSyncExternalStore(
    listener => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => language
  );
}

const translatedAttributes = ["aria-label", "alt", "title", "placeholder"];
const ignoredTextParents = new Set(["SCRIPT", "STYLE", "NOSCRIPT"]);
const originalText = new WeakMap<Node, string>();
const originalAttributes = new WeakMap<Element, Map<string, string>>();

export function localizeText(value: string, targetLanguage: SiteLanguage) {
  if (targetLanguage === "es") return value;
  const content = value.trim();
  if (!content) return value;
  const translated = esToEn[content];
  return translated ? value.replace(content, translated) : value;
}

function translateTree(root: Node, targetLanguage: SiteLanguage) {
  if (
    root.nodeType === Node.TEXT_NODE &&
    root.parentElement &&
    !ignoredTextParents.has(root.parentElement.tagName)
  ) {
    const value = root.nodeValue ?? "";
    if (targetLanguage === "es") {
      const original = originalText.get(root);
      if (original !== undefined && original !== value) root.nodeValue = original;
      return;
    }
    if (esToEn[value.trim()]) originalText.set(root, value);
    const translated = localizeText(originalText.get(root) ?? value, "en");
    if (translated !== value) root.nodeValue = translated;
    return;
  }

  if (root instanceof Element) {
    translatedAttributes.forEach(attribute => {
      const value = root.getAttribute(attribute);
      if (!value) return;
      const saved = originalAttributes.get(root) ?? new Map<string, string>();
      if (!originalAttributes.has(root)) originalAttributes.set(root, saved);
      if (targetLanguage === "es") {
        const original = saved.get(attribute);
        if (original !== undefined && original !== value) {
          root.setAttribute(attribute, original);
        }
        return;
      }
      if (esToEn[value.trim()]) saved.set(attribute, value);
      const translated = localizeText(saved.get(attribute) ?? value, "en");
      if (translated !== value) root.setAttribute(attribute, translated);
    });
  }

  root.childNodes.forEach(child => translateTree(child, targetLanguage));
}

export function TranslationLayer() {
  const targetLanguage = useSiteLanguage();

  useLayoutEffect(() => {
    document.documentElement.lang = targetLanguage;
    document.documentElement.dataset.language = targetLanguage;
    translateTree(document.documentElement, targetLanguage);

    const observer = new MutationObserver(records => {
      records.forEach(record => {
        if (record.type === "characterData") {
          translateTree(record.target, targetLanguage);
          return;
        }
        if (record.type === "attributes") {
          translateTree(record.target, targetLanguage);
          return;
        }
        record.addedNodes.forEach(node => translateTree(node, targetLanguage));
      });
    });
    observer.observe(document.documentElement, {
      subtree: true,
      childList: true,
      characterData: true,
      attributes: true,
      attributeFilter: translatedAttributes,
    });
    return () => observer.disconnect();
  }, [targetLanguage]);

  return null;
}

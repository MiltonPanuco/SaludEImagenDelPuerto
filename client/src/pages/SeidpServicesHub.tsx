import {
  ArrowRight,
  CalendarCheck,
  CheckCircle2,
  ClipboardCheck,
  HeartHandshake,
  HeartPulse,
  Images,
  Search,
  Stethoscope,
  TestTube2,
} from "lucide-react";
import { Link } from "wouter";
import { Eyebrow, PageIntro, PageShell } from "@/components/SeidpLayout";
import { services } from "@/serviceData";

const featuredSlugs = [
  "ultrasonidos",
  "radiografias",
  "laboratorio-clinico",
  "electrocardiogramas",
] as const;

const practicalInfo: Record<string, readonly string[]> = {
  radiografias: [
    "Ubica el área a estudiar",
    "Retira objetos metálicos",
    "Informa si hay embarazo",
  ],
  ultrasonidos: [
    "Ayuno según el estudio",
    "Vejiga llena si se indica",
    "Lleva estudios previos",
  ],
  electrocardiogramas: [
    "Usa ropa cómoda",
    "Evita crema en el pecho",
    "Registro en reposo",
  ],
  "laboratorio-clinico": [
    "Ayuno sólo si se indica",
    "Identifica tu análisis",
    "Pregunta por la entrega",
  ],
};

const featuredAction: Record<string, string> = {
  radiografias: "Ver tipos de radiografía",
  ultrasonidos: "Conocer ultrasonidos",
  electrocardiogramas: "Conocer el estudio",
  "laboratorio-clinico": "Consultar análisis",
};

const groups = [
  {
    id: "imagen",
    title: "Estudios de imagen",
    description:
      "Estudios de imagen para apoyar la valoración médica con orientación clara antes, durante y después de tu visita.",
    action: "Ver estudios de imagen",
    Icon: Images,
    slugs: ["radiografias", "ultrasonidos", "biopsias-guiadas"],
    prevention: false,
  },
  {
    id: "laboratorio",
    title: "Laboratorio y estudios clínicos",
    description:
      "Pruebas y estudios para seguimiento, prevención y apoyo al diagnóstico médico.",
    action: "Ver estudios clínicos",
    Icon: TestTube2,
    slugs: ["laboratorio-clinico", "electrocardiogramas"],
    prevention: false,
  },
  {
    id: "consultas",
    title: "Consultas y prevención",
    description:
      "Orientación profesional para cuidar tu salud, prevenir riesgos y dar seguimiento a tus necesidades.",
    action: "Ver consultas y prevención",
    Icon: Stethoscope,
    slugs: ["consulta-medica", "consulta-nutricional"],
    prevention: true,
  },
] as const;

const quickLinks = [
  [Images, "Imagen", "#imagen"],
  [TestTube2, "Laboratorio", "#laboratorio"],
  [HeartPulse, "Corazón", "/servicios/electrocardiogramas"],
  [Stethoscope, "Consultas", "#consultas"],
  [HeartHandshake, "Prevención", "/prevencion"],
] as const;

export default function SeidpServicesHub() {
  const featured = featuredSlugs.map(slug =>
    services.find(service => service.slug === slug)!
  );

  return (
    <PageShell darkHeader>
      <main>
        <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-[#082b46] pb-12 pt-28 text-white sm:min-h-[72svh] sm:pb-16">
          <img
            src="/media/seidp-hero-clinic.webp"
            alt="Profesional trabajando con equipo médico"
            className="absolute inset-0 size-full object-cover object-center opacity-75"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.76),rgba(8,43,70,.54)_48%,rgba(8,43,70,.16))]" />
          <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <PageIntro
              eyebrow="Nuestros servicios"
              title="Encuentra el estudio"
              italic="que necesitas."
              description="Te orientamos sobre disponibilidad, preparación y requisitos antes de tu cita."
              dark
            />
          </div>
        </section>

        <section
          className="border-b border-[#12395d]/10 bg-white py-10 sm:py-12"
          aria-labelledby="busqueda-rapida"
        >
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3">
              <Search className="size-5 text-[#0f7065]" />
              <h2
                id="busqueda-rapida"
                className="font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d]"
              >
                ¿Qué estás buscando?
              </h2>
            </div>
            <nav
              className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5"
              aria-label="Accesos rápidos a servicios"
            >
              {quickLinks.map(([Icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="group flex min-h-14 items-center gap-3 rounded-2xl border border-[#12395d]/10 bg-[#fbfdfe] px-4 py-3 text-sm font-semibold text-[#12395d] transition-colors hover:border-[#4291cd] hover:bg-[#edf6fb] focus-visible:border-[#4291cd]"
                >
                  <Icon className="size-5 shrink-0 text-[#0f7065]" />
                  <span>{label}</span>
                  <ArrowRight className="ml-auto size-4 text-[#4291cd] transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </nav>
          </div>
        </section>

        <section
          className="bg-[#fbfdfe] py-16 sm:py-24"
          aria-labelledby="servicios-principales"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <Eyebrow>Para comenzar</Eyebrow>
              <h2
                id="servicios-principales"
                className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-6xl"
              >
                Conoce nuestros servicios principales.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#597286]">
                Compara en un vistazo qué evalúa cada estudio y las indicaciones
                que conviene considerar antes de acudir.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {featured.map(
                ({ slug, title, short, image, alt, Icon }, index) => (
                  <article
                    key={slug}
                    className={`group overflow-hidden rounded-[22px] border border-[#12395d]/10 bg-white shadow-[0_14px_34px_rgba(18,57,93,.06)] ${index === 0 ? "lg:col-span-2 lg:grid lg:grid-cols-[1.15fr_.85fr]" : "sm:grid sm:grid-cols-[.72fr_1fr]"}`}
                  >
                    <div
                      className={`relative overflow-hidden bg-[#dceef4] ${index === 0 ? "min-h-64 lg:min-h-[360px]" : "min-h-44"}`}
                    >
                      <img
                        src={image}
                        alt={alt}
                        className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading={index ? "lazy" : "eager"}
                        decoding="async"
                      />
                      <span className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-full bg-white text-[#0f7065] shadow-lg">
                        <Icon className="size-5" />
                      </span>
                    </div>
                    <div className="flex flex-col p-6 sm:p-8">
                      <p className="text-[11px] font-bold uppercase tracking-[.14em] text-[#0f7065]">
                        Servicio diagnóstico
                      </p>
                      <h3 className="mt-3 font-display text-3xl font-semibold tracking-[-.045em] text-[#12395d]">
                        {title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-[#597286]">
                        {short}
                      </p>
                      <ul
                        className="mt-6 flex flex-wrap gap-2"
                        aria-label={`Información práctica de ${title}`}
                      >
                        {practicalInfo[slug].map(item => (
                          <li
                            key={item}
                            className="rounded-full bg-[#edf6fb] px-3 py-2 text-xs font-semibold text-[#315f7c]"
                          >
                            <CheckCircle2 className="mr-1.5 inline size-3.5 text-[#0f7065]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                      <Link
                        href={`/servicios/${slug}`}
                        className="mt-7 inline-flex min-h-11 w-fit items-center gap-2 font-bold text-[#0f7065] hover:text-[#12395d]"
                      >
                        {featuredAction[slug]} <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </article>
                )
              )}
            </div>
          </div>
        </section>

        <section
          className="bg-white py-16 sm:py-24"
          aria-labelledby="todos-los-servicios"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <Eyebrow>Todos los servicios</Eyebrow>
              <h2
                id="todos-los-servicios"
                className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-5xl"
              >
                Elige por el tipo de atención que buscas.
              </h2>
            </div>
            <div className="mt-12 space-y-6">
              {groups.map(
                ({
                  id,
                  title,
                  description,
                  action,
                  Icon,
                  slugs,
                  prevention,
                }) => (
                  <section
                    key={id}
                    id={id}
                    className="scroll-mt-24 rounded-[22px] border border-[#12395d]/10 bg-[#f7fafb] p-5 sm:p-8"
                  >
                    <div className="grid gap-7 lg:grid-cols-[.72fr_1.28fr] lg:items-start">
                      <div>
                        <span className="grid size-12 place-items-center rounded-full bg-[#e8f5f5] text-[#0f7065]">
                          <Icon className="size-5" />
                        </span>
                        <h3 className="mt-5 font-display text-3xl font-semibold tracking-[-.04em] text-[#12395d]">
                          {title}
                        </h3>
                        <p className="mt-3 max-w-md text-sm leading-relaxed text-[#597286]">
                          {description}
                        </p>
                        <a
                          href={`#${id}-lista`}
                          className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-bold text-[#0f7065]"
                        >
                          {action}
                          <ArrowRight className="size-4" />
                        </a>
                      </div>
                      <div
                        id={`${id}-lista`}
                        className="divide-y divide-[#12395d]/10 border-y border-[#12395d]/10"
                      >
                        {slugs
                          .map(slug =>
                            services.find(service => service.slug === slug)!
                          )
                          .map(({ slug, title, Icon: ServiceIcon }) => (
                            <Link
                              key={slug}
                              href={`/servicios/${slug}`}
                              className="group grid min-h-20 grid-cols-[2.75rem_1fr_auto] items-center gap-3 py-4"
                            >
                              <span className="grid size-11 place-items-center rounded-full bg-white text-[#0f7065]">
                                <ServiceIcon className="size-5" />
                              </span>
                              <strong className="block text-base text-[#12395d]">
                                {title}
                              </strong>
                              <span className="flex items-center gap-2 text-sm font-bold text-[#0f7065]">
                                Detalles{" "}
                                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                              </span>
                            </Link>
                          ))}
                        {prevention && (
                          <Link
                            href="/prevencion"
                            className="group grid min-h-20 grid-cols-[2.75rem_1fr_auto] items-center gap-3 py-4"
                          >
                            <span className="grid size-11 place-items-center rounded-full bg-white text-[#0f7065]">
                              <HeartHandshake className="size-5" />
                            </span>
                            <span>
                              <strong className="block text-base text-[#12395d]">
                                Opciones preventivas
                              </strong>
                              <span className="mt-1 hidden text-sm text-[#597286] sm:block">
                                Orientación para revisar tu salud de forma
                                oportuna.
                              </span>
                            </span>
                            <span className="flex items-center gap-2 text-sm font-bold text-[#0f7065]">
                              Conocer{" "}
                              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </section>
                )
              )}
            </div>
          </div>
        </section>

        <section className="bg-[#12395d] py-16 text-white sm:py-20">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[.85fr_1.15fr] lg:items-center lg:px-12">
            <div>
              <Eyebrow light>¿No sabes qué estudio necesitas?</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[.98] tracking-[-.05em] sm:text-5xl">
                Podemos ayudarte a ordenar la información.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">
                Envíanos la indicación de tu médico o escríbenos para ayudarte a
                identificar la información que necesitas antes de tu cita.
                Utiliza el botón flotante de WhatsApp cuando estés listo.
              </p>
              <Link
                href="/contacto"
                className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-[#9bc9e7] hover:text-white"
              >
                Consulta nuestros datos de contacto{" "}
                <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                [ClipboardCheck, "01", "Comparte tu indicación"],
                [CalendarCheck, "02", "Confirma preparación"],
                [HeartHandshake, "03", "Conoce el siguiente paso"],
              ].map(([Icon, number, text]) => {
                const StepIcon = Icon as typeof ClipboardCheck;
                return (
                  <div
                    key={number as string}
                    className="rounded-[18px] border border-white/15 bg-[#082b46]/25 p-5"
                  >
                    <StepIcon className="size-5 text-[#9bc9e7]" />
                    <span className="mt-8 block text-[10px] font-bold text-white/50">
                      {number as string}
                    </span>
                    <p className="mt-2 font-display text-lg font-semibold">
                      {text as string}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

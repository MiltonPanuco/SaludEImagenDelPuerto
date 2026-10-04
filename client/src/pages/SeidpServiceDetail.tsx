import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Check,
  Phone,
} from "lucide-react";
import { Link } from "wouter";
import {
  APPOINTMENT_PHONE,
  Eyebrow,
  PageIntro,
  PageShell,
  WHATSAPP_URL,
} from "@/components/SeidpLayout";
import { services } from "@/serviceData";
import NotFound from "./NotFound";

type EditorialDesign = {
  accent: string;
  image: string;
  related: string[];
  light?: boolean;
  imageRight?: boolean;
  heroAlign: "left" | "center" | "right";
  catalogGrid: boolean;
  prepDark: boolean;
};

const editorial: Record<string, EditorialDesign> = {
  radiografias: {
    accent: "Más claridad.",
    image: "/media/seidp-hero-clinic.webp",
    related: ["ultrasonidos", "consulta-medica"],
    heroAlign: "left",
    catalogGrid: false,
    prepDark: false,
  },
  ultrasonidos: {
    accent: "Acompañarte de cerca.",
    image: "/media/seidp-prevention-family.webp",
    related: ["biopsias-guiadas", "consulta-medica"],
    imageRight: true,
    heroAlign: "right",
    catalogGrid: true,
    prepDark: false,
  },
  electrocardiogramas: {
    accent: "Cada latido importa.",
    image: "/media/seidp-consulta-medica.webp",
    related: ["laboratorio-clinico", "consulta-medica"],
    heroAlign: "center",
    catalogGrid: false,
    prepDark: true,
  },
  "laboratorio-clinico": {
    accent: "Información valiosa.",
    image: "/media/seidp-lab-detail.webp",
    related: ["consulta-medica", "consulta-nutricional"],
    imageRight: true,
    heroAlign: "left",
    catalogGrid: true,
    prepDark: true,
  },
  "consulta-medica": {
    accent: "Te escuchamos.",
    image: "/media/seidp-prevention-family.webp",
    light: true,
    related: ["laboratorio-clinico", "ultrasonidos"],
    heroAlign: "right",
    catalogGrid: false,
    prepDark: false,
  },
  "biopsias-guiadas": {
    accent: "Cercanía en el proceso.",
    image: "/media/seidp-ultrasonido-obstetrico.webp",
    related: ["ultrasonidos", "consulta-medica"],
    imageRight: true,
    heroAlign: "left",
    catalogGrid: true,
    prepDark: true,
  },
  "consulta-nutricional": {
    accent: "Tu propio camino.",
    image: "/media/seidp-prevencion-mujer.webp",
    light: true,
    related: ["laboratorio-clinico", "consulta-medica"],
    heroAlign: "center",
    catalogGrid: true,
    prepDark: false,
  },
};

export default function SeidpServiceDetail({
  params,
}: {
  params: { slug: string };
}) {
  const service = services.find(item => item.slug === params.slug);
  if (!service) return <NotFound />;
  const {
    title,
    intro,
    image,
    alt,
    highlights,
    catalogTitle,
    catalog,
    process,
  } = service;
  const design = editorial[service.slug];
  const whatsapp = new URL(WHATSAPP_URL);
  whatsapp.searchParams.set(
    "text",
    `Hola, Salud e Imagen del Puerto. Quiero consultar disponibilidad e indicaciones para ${title.toLowerCase()}.`
  );

  return (
    <PageShell darkHeader>
      <main>
        <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-[#12395d] pb-14 pt-32 text-white sm:pb-20">
          <img
            src={image}
            alt={alt}
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[#4291cd]/10 mix-blend-multiply" />
          <div
            className={`absolute inset-0 ${design.heroAlign === "right" ? "bg-[linear-gradient(270deg,rgba(8,43,70,.72),rgba(8,43,70,.50)_50%,rgba(8,43,70,.12))]" : design.heroAlign === "center" ? "bg-[linear-gradient(0deg,rgba(8,43,70,.68),rgba(8,43,70,.28)_70%,rgba(8,43,70,.22))]" : "bg-[linear-gradient(90deg,rgba(8,43,70,.72),rgba(8,43,70,.52)_48%,rgba(8,43,70,.10))]"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082b46]/45 via-transparent to-[#082b46]/10" />
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <PageIntro
              eyebrow=""
              title={title}
              italic={design.accent}
              description={intro}
              dark
              right={design.heroAlign === "right"}
              centered={design.heroAlign === "center"}
            />
            <div
              className={`mt-8 flex flex-wrap items-center gap-5 ${design.heroAlign === "right" ? "justify-end" : design.heroAlign === "center" ? "justify-center" : ""}`}
            >
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-4 rounded-full bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[.1em] text-[#12395d] transition-colors hover:bg-[#dceef4]"
              >
                Consultar este servicio
                <ArrowUpRight className="size-4" />
              </a>
              <a
                href="#estudios"
                className="group inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-3 text-xs font-semibold text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white/60 hover:bg-white/10 hover:shadow-[0_12px_28px_rgba(0,0,0,.16)]"
              >
                Conocer más
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </section>

        <section
          id="estudios"
          className="scroll-mt-24 bg-[#fbfdfe] py-16 sm:py-24"
        >
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:gap-24 lg:px-12">
            <div>
              <Eyebrow>
                {design.light
                  ? "Un espacio para ti"
                  : "El estudio que necesitas"}
              </Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[1.05] tracking-[-.05em] text-[#12395d] sm:text-5xl">
                {catalogTitle}.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#597286]">
                Confirma con nuestro equipo el servicio que necesitas, su
                disponibilidad y las indicaciones para tu cita.
              </p>
              <a
                href={whatsapp.href}
                target="_blank"
                rel="noreferrer"
                className="mt-7 inline-flex items-center gap-3 border-b border-current/30 pb-2 text-xs font-bold text-[#4291cd]"
              >
                Preguntar por {title.toLowerCase()}
                <ArrowUpRight className="size-4 shrink-0" />
              </a>
            </div>
            <ol
              className={
                design.catalogGrid
                  ? "grid gap-3 sm:grid-cols-2"
                  : "border-t border-[#12395d]/20"
              }
            >
              {catalog.map((item, index) => (
                <li
                  key={item}
                  className={
                    design.catalogGrid
                      ? "flex min-h-28 items-center gap-4 rounded-2xl bg-[#edf6fb] p-5"
                      : "flex items-center gap-5 border-b border-[#12395d]/15 py-5 sm:py-6"
                  }
                >
                  <span className="text-[10px] font-bold text-[#4291cd]">
                    0{index + 1}
                  </span>
                  <h3 className="font-display text-xl font-medium tracking-[-.035em] text-[#12395d] sm:text-2xl">
                    {item}
                  </h3>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section
          id="preparacion"
          className={`scroll-mt-24 py-14 sm:py-18 ${design.prepDark ? "bg-[#12395d]" : "bg-[#edf6fb]"}`}
        >
          <div className="mx-auto grid max-w-[1280px] gap-8 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:gap-20 lg:px-12">
            <div>
              <Eyebrow light={design.prepDark}>Antes de venir</Eyebrow>
              <h2
                className={`font-display text-3xl font-semibold leading-[1.05] tracking-[-.04em] sm:text-4xl ${design.prepDark ? "text-white" : "text-[#12395d]"}`}
              >
                Tu cita comienza
                <br />
                <span
                  className={`italic ${design.prepDark ? "text-white/65" : "text-[#4291cd]"}`}
                >
                  con buena información.
                </span>
              </h2>
            </div>
            <ul
              className={
                design.prepDark
                  ? "divide-y divide-white/15"
                  : "divide-y divide-[#12395d]/15"
              }
            >
              {highlights.map(item => (
                <li
                  key={item}
                  className="flex items-start gap-4 py-5 first:pt-0"
                >
                  <span
                    className={`grid size-7 shrink-0 place-items-center rounded-full text-white ${design.prepDark ? "bg-white/15" : "bg-[#4291cd]"}`}
                  >
                    <Check className="size-4" />
                  </span>
                  <p
                    className={`pt-0.5 text-[15px] leading-relaxed ${design.prepDark ? "text-white/70" : "text-[#12395d]"}`}
                  >
                    {item}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="visita" className="scroll-mt-24 bg-white py-16 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <Eyebrow>Así será tu visita</Eyebrow>
                <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-[-.05em] text-[#12395d] sm:text-5xl">
                  Contigo, en cada paso.
                </h2>
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-[#597286]">
                Conoce cómo se desarrolla tu atención de {title.toLowerCase()}.
              </p>
            </div>
            <div className="mt-12 grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch lg:gap-14">
              <figure
                className={`min-h-[320px] overflow-hidden rounded-[24px] bg-[#dceef4] ${design.imageRight ? "lg:order-2" : ""}`}
              >
                <img
                  src={design.image}
                  alt={`Atención relacionada con ${title.toLowerCase()}`}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <ol
                className={`border-t border-[#12395d]/20 ${design.imageRight ? "lg:order-1" : ""}`}
              >
                {process.map(([stepTitle, text], index) => (
                  <li
                    key={stepTitle}
                    className="grid grid-cols-[3rem_1fr] gap-5 border-b border-[#12395d]/15 py-6"
                  >
                    <span className="font-display text-2xl font-medium tracking-[-.05em] text-[#4291cd]">
                      0{index + 1}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-semibold tracking-[-.035em] text-[#12395d]">
                        {stepTitle}
                      </h3>
                      <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#597286]">
                        {text}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <div className="mt-16 grid gap-7 rounded-[24px] bg-[#12395d] p-7 text-white sm:p-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[.16em] text-white/60">
                  {title} · Información para tu cita
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-[-.04em]">
                  Demos el siguiente paso.
                </h2>
                <p className="mt-3 text-sm text-white/65">
                  Te ayudamos a confirmar disponibilidad y preparación.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={whatsapp.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-5 rounded-full bg-white px-6 py-4 text-xs font-bold text-[#12395d] hover:bg-[#dceef4]"
                >
                  Consultar por WhatsApp
                  <ArrowUpRight className="size-4" />
                </a>
                <a
                  href={`tel:${APPOINTMENT_PHONE}`}
                  className="inline-flex items-center justify-center gap-3 py-3 text-xs text-white/80"
                >
                  <Phone className="size-4" />
                  322 403 5071
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f1f6f8] py-14 sm:py-18">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <Eyebrow>Seguimos cuidando de ti</Eyebrow>
            <div className="grid gap-5 md:grid-cols-2">
              {design.related
                .map(slug => services.find(item => item.slug === slug)!)
                .map(
                  ({
                    slug,
                    title: relatedTitle,
                    short,
                    image: relatedImage,
                    Icon: RelatedIcon,
                  }) => (
                    <Link
                      key={slug}
                      href={`/servicios/${slug}`}
                      className="group grid overflow-hidden rounded-[20px] bg-white shadow-[0_12px_30px_rgba(18,57,93,.06)] sm:grid-cols-[.72fr_1fr]"
                    >
                      <div className="relative min-h-48 overflow-hidden bg-[#dceef4]">
                        <img
                          src={relatedImage}
                          alt=""
                          className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                          decoding="async"
                        />
                        <span className="absolute bottom-4 left-4 grid size-10 place-items-center rounded-full bg-white text-[#0f7065] shadow-lg">
                          <RelatedIcon className="size-5" />
                        </span>
                      </div>
                      <span className="flex flex-col p-6">
                        <span className="block font-display text-xl font-semibold tracking-[-.04em] text-[#12395d]">
                          {relatedTitle}
                        </span>
                        <span className="mt-2 block text-sm leading-relaxed text-[#597286]">
                          {short}
                        </span>
                        <ArrowRight className="mt-auto size-4 text-[#0f7065] transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  )
                )}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "wouter";
import {
  Eyebrow,
  PageIntro,
  PageShell,
  SharedScrollBackground,
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
};

const editorial: Record<string, EditorialDesign> = {
  radiografias: {
    accent: "Más claridad.",
    image: "/media/seidp-hero-clinic.webp",
    related: ["ultrasonidos", "consulta-medica"],
    heroAlign: "left",
    catalogGrid: false,
  },
  ultrasonidos: {
    accent: "Acompañarte de cerca.",
    image: "/media/seidp-prevention-family.webp",
    related: ["biopsias-guiadas", "consulta-medica"],
    imageRight: true,
    heroAlign: "right",
    catalogGrid: true,
  },
  electrocardiogramas: {
    accent: "Cada latido importa.",
    image: "/media/seidp-consulta-medica.webp",
    related: ["laboratorio-clinico", "consulta-medica"],
    heroAlign: "center",
    catalogGrid: false,
  },
  "laboratorio-clinico": {
    accent: "Información valiosa.",
    image: "/media/seidp-lab-detail.webp",
    related: ["consulta-medica", "consulta-nutricional"],
    imageRight: true,
    heroAlign: "left",
    catalogGrid: true,
  },
  "consulta-medica": {
    accent: "Te escuchamos.",
    image: "/media/seidp-prevention-family.webp",
    light: true,
    related: ["laboratorio-clinico", "ultrasonidos"],
    heroAlign: "right",
    catalogGrid: false,
  },
  "biopsias-guiadas": {
    accent: "Cercanía en el proceso.",
    image: "/media/seidp-ultrasonido-obstetrico.webp",
    related: ["ultrasonidos", "consulta-medica"],
    imageRight: true,
    heroAlign: "left",
    catalogGrid: true,
  },
  "consulta-nutricional": {
    accent: "Tu propio camino.",
    image: "/media/seidp-prevencion-mujer.webp",
    light: true,
    related: ["laboratorio-clinico", "consulta-medica"],
    heroAlign: "center",
    catalogGrid: true,
  },
};

export default function SeidpServiceDetail({
  params,
}: {
  params: { slug: string };
}) {
  const journeyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const journey = journeyRef.current;
    const track = trackRef.current;
    if (!journey || !track) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = journey.offsetHeight - track.clientHeight;
      const progress = distance
        ? Math.min(
            Math.max(-journey.getBoundingClientRect().top / distance, 0),
            1
          )
        : 0;
      const horizontalDistance = track.scrollWidth - track.clientWidth;
      track.style.transform = `translate3d(${-progress * horizontalDistance}px, 0, 0)`;
    };
    const requestUpdate = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    document.documentElement.classList.remove("service-scroll-snap");
    const updateSnap = () => {
      const bounds = journey.getBoundingClientRect();
      document.documentElement.classList.toggle(
        "service-scroll-snap",
        bounds.top <= 1 && bounds.bottom >= window.innerHeight
      );
      requestUpdate();
    };
    window.addEventListener("scroll", updateSnap, { passive: true });
    window.addEventListener("resize", updateSnap);
    updateSnap();
    return () => {
      window.removeEventListener("scroll", updateSnap);
      window.removeEventListener("resize", updateSnap);
      document.documentElement.classList.remove("service-scroll-snap");
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [params.slug]);

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
  const compactPreparation = design.imageRight;

  return (
    <PageShell darkHeader>
      <main className="relative isolate">
        <SharedScrollBackground
          name={`servicio-${service.slug}`}
          src={image}
          alt={alt}
          endRef={journeyRef}
          imageClassName="opacity-80"
        />
        <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden pb-12 pt-28 text-white sm:min-h-[72svh] sm:pb-16">
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
              className={`hero-enter hero-enter--actions mt-8 flex flex-wrap items-center gap-5 ${design.heroAlign === "right" ? "justify-end" : design.heroAlign === "center" ? "justify-center" : ""}`}
            >
              <a
                href="#estudios"
                className="group inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-6 py-3 text-xs font-bold text-[#12395d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dceef4]"
              >
                Ver indicaciones
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-1" />
              </a>
            </div>
          </div>
        </section>

        <div
          ref={journeyRef}
          className="service-journey relative h-[400svh]"
          aria-label={`Recorrido de información de ${title}`}
        >
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
          >
            {[0, 1, 2, 3].map(index => (
              <span
                key={index}
                className="block h-[100svh] snap-start snap-always"
              />
            ))}
            <span className="absolute bottom-0 block h-px w-px snap-start snap-always" />
          </div>
          <div className="service-journey-stage sticky top-0 h-[100svh] overflow-hidden">
            <div
              ref={trackRef}
              className="service-panels flex h-full will-change-transform"
            >
              <section
                id="estudios"
                className="service-panel h-full min-w-full shrink-0 overflow-hidden bg-[#fbfdfe] pb-5 pt-[92px] sm:pb-8 sm:pt-[104px] lg:pb-12 lg:pt-[120px]"
              >
                <div className="mx-auto grid h-full max-w-[1280px] content-center gap-4 px-5 sm:gap-7 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12">
                  <div>
                    <Eyebrow>
                      {design.light
                        ? "Un espacio para ti"
                        : "El estudio que necesitas"}
                    </Eyebrow>
                    <h2 className="font-display text-2xl font-semibold leading-[1.05] tracking-[-.05em] text-[#12395d] sm:text-4xl lg:text-5xl">
                      {catalogTitle}.
                    </h2>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-[#597286] sm:mt-4 sm:text-sm">
                      Confirma con nuestro equipo el servicio que necesitas, su
                      disponibilidad y las indicaciones para tu cita.
                    </p>
                    <Link
                      href="/contacto"
                      className="mt-3 inline-flex min-h-10 items-center gap-3 border-b border-current/30 pb-1 text-xs font-bold text-[#0f7065] sm:mt-5 sm:min-h-11 sm:pb-2 sm:text-sm"
                    >
                      Consultar disponibilidad
                      <ArrowRight className="size-4 shrink-0" />
                    </Link>
                  </div>
                  <ol
                    className={
                      design.catalogGrid
                        ? "grid grid-cols-2 gap-2 sm:gap-3"
                        : "border-t border-[#12395d]/20"
                    }
                  >
                    {catalog.map((item, index) => (
                      <li
                        key={item}
                        className={
                          design.catalogGrid
                            ? "flex min-h-14 items-center gap-3 rounded-xl bg-[#edf6fb] p-2.5 sm:min-h-20 sm:rounded-2xl sm:p-4 lg:min-h-24 lg:p-5"
                            : "flex items-center gap-3 border-b border-[#12395d]/15 py-2 sm:gap-4 sm:py-3 lg:py-4"
                        }
                      >
                        <span className="text-[10px] font-bold text-[#4291cd]">
                          0{index + 1}
                        </span>
                        <h3 className="font-display text-base font-medium leading-tight tracking-[-.035em] text-[#12395d] sm:text-xl lg:text-2xl">
                          {item}
                        </h3>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section
                id="preparacion"
                className="service-panel h-full min-w-full shrink-0 overflow-hidden bg-white pb-5 pt-[92px] sm:pb-8 sm:pt-[104px] lg:pb-12 lg:pt-[120px]"
              >
                <div className="mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 sm:px-8 lg:px-12">
                  <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-end sm:gap-5">
                    <div>
                      <Eyebrow>Antes de venir</Eyebrow>
                      <h2
                        className={`max-w-xl font-display font-semibold leading-[1.05] tracking-[-.05em] text-[#12395d] ${compactPreparation ? "text-2xl sm:text-3xl lg:text-4xl" : "text-2xl sm:text-4xl lg:text-5xl"}`}
                      >
                        Tu cita comienza con buena información.
                      </h2>
                    </div>
                    <p className="max-w-xs text-xs leading-relaxed text-[#597286] sm:text-sm">
                      {compactPreparation
                        ? "Confirma estas indicaciones al agendar."
                        : `Revisa estas indicaciones antes de acudir a tu cita de ${title.toLowerCase()}.`}
                    </p>
                  </div>
                  <div className="mt-4 grid gap-4 sm:mt-7 sm:gap-5 md:grid-cols-[.75fr_1.25fr] md:items-center lg:gap-10">
                    <figure
                      data-preparation-image
                      className={`hidden overflow-hidden rounded-[24px] bg-[#dceef4] md:block ${compactPreparation ? "h-[clamp(12rem,34svh,20rem)] min-h-0 self-center md:order-2" : "min-h-60 self-stretch"}`}
                    >
                      <img
                        src={image}
                        alt={`Preparación para ${title.toLowerCase()}`}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    </figure>
                    <ol
                      className={`border-t border-[#12395d]/20 ${design.imageRight ? "md:order-1" : ""}`}
                    >
                      {highlights.map((item, index) => (
                        <li
                          key={item}
                          className="grid grid-cols-[2rem_1fr] gap-3 border-b border-[#12395d]/15 py-2.5 sm:grid-cols-[2.5rem_1fr] sm:gap-4 sm:py-4"
                        >
                          <span className="font-display text-2xl font-medium tracking-[-.05em] text-[#4291cd]">
                            0{index + 1}
                          </span>
                          <div>
                            {!compactPreparation && (
                              <h3 className="font-display text-lg font-semibold tracking-[-.035em] text-[#12395d] sm:text-xl">
                                Indicación para tu cita
                              </h3>
                            )}
                            <p
                              className={`max-w-lg leading-relaxed text-[#597286] ${compactPreparation ? "text-sm sm:text-base" : "mt-1 text-xs sm:mt-2 sm:text-sm"}`}
                            >
                              {item}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </section>

              <section
                id="visita"
                className="service-panel relative h-full min-w-full shrink-0 overflow-hidden text-white"
              >
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.88)_0%,rgba(8,43,70,.68)_50%,rgba(8,43,70,.38)_100%)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082b46]/65 via-transparent to-[#082b46]/20" />
                <div className="relative mx-auto grid h-full max-w-[1280px] content-center gap-4 px-5 pb-5 pt-[92px] sm:gap-6 sm:px-8 sm:pb-10 sm:pt-[104px] lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-16 lg:px-12 lg:pt-[120px]">
                  <div className="max-w-xl">
                    <Eyebrow light>Así será tu visita</Eyebrow>
                    <h2 className="font-display text-2xl font-medium leading-[.95] tracking-[-.05em] sm:text-5xl lg:text-6xl">
                      Contigo,
                      <br />
                      <span className="text-[#9bc9e7] italic">
                        en cada paso.
                      </span>
                    </h2>
                    <p className="mt-2 max-w-sm text-xs leading-relaxed text-white/70 sm:mt-6 sm:text-sm">
                      Conoce cómo se desarrolla tu atención de{" "}
                      {title.toLowerCase()}.
                    </p>
                  </div>
                  <ol className="overflow-hidden rounded-[18px] border border-white/15 bg-[#082b46]/70 px-4 backdrop-blur-md sm:rounded-[22px] sm:px-7">
                    {process.map(([stepTitle, text], index) => (
                      <li
                        key={stepTitle}
                        className="grid grid-cols-[1.75rem_1fr] gap-2 border-b border-white/15 py-2.5 last:border-b-0 sm:grid-cols-[3rem_1fr] sm:gap-5 sm:py-5"
                      >
                        <span className="font-mono text-[10px] font-semibold tracking-[.14em] text-[#9bc9e7] sm:pt-1">
                          0{index + 1}
                        </span>
                        <div>
                          <h3 className="font-display text-base font-medium tracking-[-.035em] text-white sm:text-xl">
                            {stepTitle}
                          </h3>
                          <p className="mt-1 max-w-lg text-[11px] leading-relaxed text-white/65 sm:mt-2 sm:text-sm">
                            {text}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section className="service-panel flex h-full min-w-full shrink-0 items-center overflow-hidden bg-[#edf4f6] px-2 pb-2 pt-[74px] sm:px-5 sm:pb-5 sm:pt-[77px] lg:px-8 lg:pb-8 lg:pt-[80px]">
                <div
                  data-related-panel-content
                  className="mx-auto flex h-[78svh] max-h-[calc(100%-1rem)] w-full max-w-[1280px] flex-col justify-center overflow-hidden px-3 py-3 sm:px-8 sm:py-8 lg:px-12"
                >
                  <div className="grid items-end gap-4 sm:grid-cols-[1fr_.7fr]">
                    <div>
                      <Eyebrow>Seguimos cuidando de ti</Eyebrow>
                      <h2 className="max-w-2xl font-display text-2xl font-medium leading-[.95] tracking-[-.05em] text-[#12395d] sm:text-4xl lg:text-5xl">
                        Tu cuidado puede continuar.
                      </h2>
                    </div>
                    <p className="hidden max-w-sm text-sm leading-relaxed text-[#597286] sm:block sm:pb-1">
                      Explora servicios relacionados que pueden acompañar los
                      siguientes pasos de tu atención.
                    </p>
                  </div>
                  <div className="mt-4 grid min-h-0 flex-1 grid-rows-2 gap-2 sm:mt-8 sm:grid-cols-[1.12fr_.88fr] sm:grid-rows-1 sm:gap-5">
                    {design.related
                      .map(slug => services.find(item => item.slug === slug)!)
                      .map(
                        (
                          {
                            slug,
                            title: relatedTitle,
                            short,
                            image: relatedImage,
                            Icon: RelatedIcon,
                          },
                          index
                        ) => (
                          <Link
                            key={slug}
                            href={`/servicios/${slug}`}
                            className="group relative isolate min-h-0 overflow-hidden rounded-[22px] bg-[#12395d] shadow-[0_18px_45px_rgba(18,57,93,.12)]"
                          >
                            <img
                              src={relatedImage}
                              alt=""
                              className="absolute inset-0 -z-20 size-full object-cover transition-transform duration-700 group-hover:scale-105"
                              loading="lazy"
                              decoding="async"
                            />
                            <span className="absolute inset-0 -z-10 bg-gradient-to-t from-[#082b46]/95 via-[#082b46]/30 to-transparent" />
                            <span className="flex h-full flex-col justify-between p-4 text-white sm:p-7">
                              <span className="flex items-start justify-between">
                                <span className="grid size-8 place-items-center rounded-full border border-white/25 bg-white/10 backdrop-blur-sm sm:size-10">
                                  <RelatedIcon className="size-5" />
                                </span>
                                <span className="font-mono text-[10px] tracking-[.14em] text-white/60">
                                  0{index + 1}
                                </span>
                              </span>
                              <span>
                                <span className="block font-display text-xl font-medium tracking-[-.04em] sm:text-3xl">
                                  {relatedTitle}
                                </span>
                                <span className="mt-2 hidden max-w-md text-sm leading-relaxed text-white/70 md:block">
                                  {short}
                                </span>
                                <span className="mt-4 inline-flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[.12em] text-[#bfe0f1]">
                                  Conocer servicio
                                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                                </span>
                              </span>
                            </span>
                          </Link>
                        )
                      )}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>
    </PageShell>
  );
}

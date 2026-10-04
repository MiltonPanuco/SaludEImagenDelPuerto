import { useEffect, useRef } from "react";
import { ArrowDown, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { Eyebrow, PageIntro, PageShell } from "@/components/SeidpLayout";
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
      const distance = journey.offsetHeight - window.innerHeight;
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

  return (
    <PageShell darkHeader>
      <main>
        <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-[#12395d] pb-12 pt-28 text-white sm:min-h-[72svh] sm:pb-16">
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
                className="service-panel h-[100svh] min-w-full shrink-0 overflow-hidden bg-[#fbfdfe] py-10 sm:py-12 lg:py-16"
              >
                <div className="mx-auto grid h-full max-w-[1280px] content-center gap-7 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12">
                  <div>
                    <Eyebrow>
                      {design.light
                        ? "Un espacio para ti"
                        : "El estudio que necesitas"}
                    </Eyebrow>
                    <h2 className="font-display text-3xl font-semibold leading-[1.05] tracking-[-.05em] text-[#12395d] sm:text-4xl lg:text-5xl">
                      {catalogTitle}.
                    </h2>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#597286]">
                      Confirma con nuestro equipo el servicio que necesitas, su
                      disponibilidad y las indicaciones para tu cita.
                    </p>
                    <Link
                      href="/contacto"
                      className="mt-5 inline-flex min-h-11 items-center gap-3 border-b border-current/30 pb-2 text-sm font-bold text-[#0f7065]"
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
                            ? "flex min-h-20 items-center gap-3 rounded-2xl bg-[#edf6fb] p-3 sm:min-h-24 sm:p-5"
                            : "flex items-center gap-4 border-b border-[#12395d]/15 py-3 sm:py-4"
                        }
                      >
                        <span className="text-[10px] font-bold text-[#4291cd]">
                          0{index + 1}
                        </span>
                        <h3 className="font-display text-lg font-medium tracking-[-.035em] text-[#12395d] sm:text-xl lg:text-2xl">
                          {item}
                        </h3>
                      </li>
                    ))}
                  </ol>
                </div>
              </section>

              <section
                id="preparacion"
                className={`service-panel h-[100svh] min-w-full shrink-0 overflow-hidden py-12 sm:py-16 ${design.prepDark ? "bg-[#12395d]" : "bg-[#edf6fb]"}`}
              >
                <div className="mx-auto grid h-full max-w-[1280px] content-center gap-8 px-5 sm:px-8 lg:grid-cols-[.75fr_1.25fr] lg:items-center lg:gap-20 lg:px-12">
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
                        className="flex items-start gap-4 py-4 first:pt-0"
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

              <section
                id="visita"
                className="service-panel h-[100svh] min-w-full shrink-0 overflow-hidden bg-white py-10 sm:py-14 lg:py-16"
              >
                <div className="mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 sm:px-8 lg:px-12">
                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div>
                      <Eyebrow>Así será tu visita</Eyebrow>
                      <h2 className="max-w-xl font-display text-3xl font-semibold leading-[1.05] tracking-[-.05em] text-[#12395d] sm:text-4xl lg:text-5xl">
                        Contigo, en cada paso.
                      </h2>
                    </div>
                    <p className="max-w-xs text-sm leading-relaxed text-[#597286]">
                      Conoce cómo se desarrolla tu atención de{" "}
                      {title.toLowerCase()}.
                    </p>
                  </div>
                  <div className="mt-7 grid gap-5 md:grid-cols-[.75fr_1.25fr] md:items-stretch lg:gap-10">
                    <figure
                      className={`hidden min-h-60 overflow-hidden rounded-[24px] bg-[#dceef4] md:block ${design.imageRight ? "md:order-2" : ""}`}
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
                      className={`border-t border-[#12395d]/20 ${design.imageRight ? "md:order-1" : ""}`}
                    >
                      {process.map(([stepTitle, text], index) => (
                        <li
                          key={stepTitle}
                          className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#12395d]/15 py-4"
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
                </div>
              </section>

              <section className="service-panel h-[100svh] min-w-full shrink-0 overflow-hidden bg-[#f1f6f8] py-10 sm:py-14 lg:py-16">
                <div className="mx-auto flex h-full max-w-[1280px] flex-col justify-center px-5 sm:px-8 lg:px-12">
                  <Eyebrow>Seguimos cuidando de ti</Eyebrow>
                  <div className="grid grid-cols-2 gap-3 sm:gap-5">
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
                            <div className="relative min-h-32 overflow-hidden bg-[#dceef4] sm:min-h-44">
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
                            <span className="flex flex-col p-4 sm:p-5">
                              <span className="block font-display text-lg font-semibold tracking-[-.04em] text-[#12395d] sm:text-xl">
                                {relatedTitle}
                              </span>
                              <span className="mt-2 hidden text-sm leading-relaxed text-[#597286] sm:block">
                                {short}
                              </span>
                              <ArrowRight className="mt-4 size-4 text-[#0f7065] transition-transform group-hover:translate-x-1 sm:mt-auto" />
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

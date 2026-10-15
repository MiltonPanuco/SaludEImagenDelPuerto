import { useRef } from "react";
import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  HeartPulse,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";
import { AnimatedStat } from "@/components/AnimatedStat";
import {
  Eyebrow,
  PageIntro,
  PageShell,
  SharedScrollBackground,
} from "@/components/SeidpLayout";
import {localized, localizedImage, useSanityPage} from "@/sanity";

const steps = [
  [
    ClipboardCheck,
    "01",
    "Elige tu estudio",
    "Consulta el servicio que necesitas o escríbenos para orientarte.",
  ],
  [
    CalendarCheck,
    "02",
    "Agenda tu visita",
    "Confirma disponibilidad directamente con nuestro equipo.",
  ],
  [
    ShieldCheck,
    "03",
    "Recibe atención clara",
    "Te explicamos cada indicación antes de comenzar.",
  ],
] as const;

const services = [
  {
    number: "01",
    title: "Imagen diagnóstica",
    description:
      "Ultrasonidos y estudios de imagen con atención cercana y orientación sencilla.",
    href: "/servicios/ultrasonidos",
    image: "/media/seidp-ultrasonido-obstetrico.webp",
    Icon: Microscope,
  },
  {
    number: "02",
    title: "Laboratorio clínico",
    description:
      "Pruebas para seguimiento, prevención y apoyo al diagnóstico médico.",
    href: "/servicios/laboratorio-clinico",
    image: "/media/seidp-laboratorio.webp",
    Icon: HeartPulse,
  },
  {
    number: "03",
    title: "Paquetes preventivos",
    description:
      "Opciones organizadas para revisar tu salud sin esperar a tener síntomas.",
    href: "/prevencion",
    image: "/media/seidp-prevention-family.webp",
    Icon: ShieldCheck,
  },
] as const;

export default function SeidpHome() {
  const statsRef = useRef<HTMLElement>(null);
  const {page, section, language} = useSanityPage("page-home");
  const hero = page?.hero;
  const introduction = section("introduccion");
  const servicesSection = section("servicios");
  const processSection = section("proceso");
  const closure = section("cierre");
  const heroImage = localizedImage(hero?.image, language, {src: "/media/seidp-hero-main.webp", alt: "Profesional de la salud realizando un estudio de ultrasonido"});

  return (
    <PageShell darkHeader>
      <main className="relative isolate flex flex-col">
        <SharedScrollBackground
          name="home"
          src={heroImage.src}
          alt={heroImage.alt}
          endRef={statsRef}
        />
        <section
          data-home-hero
          className="order-0 relative flex min-h-screen min-h-[100svh] items-end overflow-hidden pb-12 pt-28 text-white sm:pb-16"
        >
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.78)_0%,rgba(8,43,70,.62)_36%,rgba(8,43,70,.14)_73%,rgba(8,43,70,.28)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082b46]/55 via-transparent to-[#082b46]/15" />

          <div className="relative z-10 mx-auto grid w-full max-w-[1440px] items-end gap-10 px-5 sm:px-8 lg:grid-cols-[minmax(0,1fr)_260px] lg:px-12">
            <div>
              <PageIntro
                eyebrow={localized(hero?.eyebrow, language, "Diagnóstico con atención humana")}
                title={localized(hero?.title, language, "Tu salud merece")}
                italic={localized(hero?.highlight, language, "verse con claridad.")}
                description={localized(hero?.description, language, "Estudios de imagen, laboratorio y prevención en Puerto Vallarta. Información precisa para que tomes el siguiente paso con calma.")}
                dark
              />
              <div className="hero-enter hero-enter--actions mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contacto"
                  className="inline-flex min-h-11 items-center gap-3 rounded-full bg-[#378ca0] px-6 text-[10px] font-bold uppercase tracking-[.13em] text-white transition-colors hover:bg-[#4291cd]"
                >
                  Agendar una consulta <ArrowRight className="size-4" />
                </Link>
                <Link
                  href="/servicios"
                  className="inline-flex min-h-11 items-center gap-3 rounded-full border border-white/35 px-6 text-[10px] font-bold uppercase tracking-[.13em] text-white transition-colors hover:bg-white hover:text-[#12395d]"
                >
                  Explorar servicios <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
            <aside className="hero-enter hero-enter--aside hidden border-l border-white/25 pl-6 lg:block">
              <p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#bfe0f1]">
                Aquí empieza
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/75">
                Una conversación clara también forma parte de tu cuidado.
              </p>
            </aside>
          </div>
        </section>

        <section className="order-3 bg-[#f4f8fa] py-24 sm:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_.65fr]">
              <div>
                <Eyebrow>{localized(servicesSection?.eyebrow, language, "Servicios principales")}</Eyebrow>
                <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[.94] tracking-[-.055em] text-[#12395d] sm:text-6xl">
                  {localized(servicesSection?.title, language, "Lo necesario para cuidar tu salud, en un mismo lugar.")}
                </h2>
              </div>
              <div className="lg:pb-2">
                <p className="max-w-md text-base leading-relaxed text-[#597286]">
                  {localized(servicesSection?.description, language, "Reunimos estudios diagnósticos y opciones preventivas para ayudarte a tomar decisiones informadas.")}
                </p>
                <Link
                  href="/servicios"
                  className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#0f7065] hover:text-[#12395d]"
                >
                  {localized(servicesSection?.action?.label, language, "Ver todos los servicios")}
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {services.map(
                ({ number, title, description, href, image, Icon }, index) => {
                  const cmsCard = servicesSection?.items?.[index];
                  const cmsImage = localizedImage(cmsCard?.image, language, {src: image, alt: ""});
                  return (
                  <Link
                    key={number}
                    href={href}
                    className="group overflow-hidden rounded-[20px] bg-white shadow-[0_14px_36px_rgba(18,57,93,.08)] transition-transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#dceef4]">
                      <img
                        src={cmsImage.src}
                        alt={cmsImage.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                      <span className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-full bg-white text-[#0f7065] shadow-lg">
                        <Icon className="size-5" />
                      </span>
                      <span className="absolute right-4 top-4 text-[10px] font-bold text-white drop-shadow">
                        {number}
                      </span>
                    </div>
                    <div className="p-6">
                      <strong className="block font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d]">
                        {localized(cmsCard?.title, language, title)}
                      </strong>
                      <span className="mt-2 block text-sm leading-relaxed text-[#597286]">
                        {localized(cmsCard?.description, language, description)}
                      </span>
                      <ArrowRight className="mt-6 size-5 text-[#0f7065] transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                  );
                }
              )}
            </div>
          </div>
        </section>

        <section className="order-1 bg-[#fbfdfe] py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-20 lg:px-12">
            <div>
              <Eyebrow>{localized(introduction?.eyebrow, language, "Atención que acompaña")}</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-6xl">
                {localized(introduction?.title, language, "Tecnología precisa, trato cercano.")}
              </h2>
              <p className="mt-7 max-w-md text-base leading-relaxed text-[#597286]">
                {localized(introduction?.description, language, "Cada estudio comienza escuchándote. Nuestro equipo te orienta con claridad para que sepas qué esperar antes, durante y después de tu visita.")}
              </p>
              <Link
                href="/nosotros"
                className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#0f7065] hover:text-[#12395d]"
              >
                {localized(introduction?.action?.label, language, "Conoce nuestro enfoque")}
                <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="grid gap-4 sm:grid-cols-[1.15fr_.85fr]">
              <figure className="overflow-hidden bg-[#dceef4] sm:translate-y-8">
                <img
                  src="/media/seidp-hero-clinic.webp"
                  alt="Profesional de la salud realizando un estudio de ultrasonido"
                  className="aspect-[4/5] h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
              <figure className="overflow-hidden bg-[#dceef4]">
                <img
                  src="/media/seidp-lab-detail.webp"
                  alt="Profesional trabajando con equipo de laboratorio"
                  className="aspect-[4/5] h-full w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            </div>
          </div>
        </section>

        <section
          ref={statsRef}
          className="order-2 relative w-full overflow-hidden text-white"
          aria-label="Salud e Imagen del Puerto en números"
        >
          <div className="absolute inset-0 bg-[#12395d]/82" />
          <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-2 gap-x-6 gap-y-12 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-4 lg:gap-10 lg:px-12 lg:py-28">
            <AnimatedStat value={1000} suffix="+" label="Pacientes atendidos" />
            <AnimatedStat value={3000} suffix="+" label="Estudios de imagen" />
            <AnimatedStat
              value={5000}
              suffix="+"
              label="Análisis de laboratorio"
            />
            <AnimatedStat
              value={600}
              suffix="+"
              label="Evaluaciones preventivas"
            />
          </div>
        </section>



        <section
          id="conoce"
          className="order-4 bg-[linear-gradient(180deg,#f4f8fa_0%,#fbfdfe_42%,#ffffff_100%)] py-24 sm:py-32"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
              <div>
                <Eyebrow>{localized(processSection?.eyebrow, language, "Una visita más sencilla")}</Eyebrow>
                <h2 className="max-w-xl font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-6xl">
                  {localized(processSection?.title, language, "Saber qué sigue también da tranquilidad.")}
                </h2>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-[#597286]">
                  {localized(processSection?.description, language, "Te acompañamos desde la elección del estudio hasta tus resultados, sin procesos innecesarios ni información confusa.")}
                </p>
              </div>

              <div className="border-t border-[#12395d]/15">
                {steps.map(([Icon, number, title, description], index) => (
                  <article
                    key={number as string}
                    className="grid grid-cols-[3rem_1fr] gap-5 border-b border-[#12395d]/15 py-7 sm:grid-cols-[4rem_1fr] sm:py-9"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-[#e8f5f5] text-[#0f7065]">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d] sm:text-3xl">
                        {localized(processSection?.items?.[index]?.title, language, title)}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#597286]">
                        {localized(processSection?.items?.[index]?.description, language, description)}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

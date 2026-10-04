import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  HeartPulse,
  MessageCircle,
  Microscope,
  ShieldCheck,
} from "lucide-react";
import { Link } from "wouter";
import { Eyebrow, PageIntro, PageShell } from "@/components/SeidpLayout";

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
  return (
    <PageShell darkHeader>
      <main className="flex flex-col">
        <section className="order-0 relative flex min-h-[68svh] items-end overflow-hidden bg-[#082b46] pb-12 pt-28 text-white sm:min-h-[72svh] sm:pb-16">
          <img
            src="/media/seidp-hero-main.webp"
            alt="Profesional de la salud realizando un estudio de ultrasonido"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-65"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.78)_0%,rgba(8,43,70,.62)_36%,rgba(8,43,70,.14)_73%,rgba(8,43,70,.28)_100%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082b46]/55 via-transparent to-[#082b46]/15" />

          <div className="relative z-10 mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <PageIntro
              eyebrow="Diagnóstico con atención humana"
              title="Tu salud merece"
              italic="verse con claridad."
              description="Estudios de imagen, laboratorio y prevención en Puerto Vallarta, con información clara desde tu primera consulta."
              dark
            />
          </div>
        </section>

        <section className="order-1 bg-[#fbfdfe] py-24 sm:py-32">
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[.72fr_1.28fr] lg:items-center lg:gap-20 lg:px-12">
            <div>
              <Eyebrow>Atención que acompaña</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-6xl">
                Tecnología precisa, trato cercano.
              </h2>
              <p className="mt-7 max-w-md text-base leading-relaxed text-[#597286]">
                Cada estudio comienza escuchándote. Nuestro equipo te orienta
                con claridad para que sepas qué esperar antes, durante y después
                de tu visita.
              </p>
              <Link
                href="/nosotros"
                className="mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#0f7065] hover:text-[#12395d]"
              >
                Conoce nuestro enfoque
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
          className="order-2 w-full bg-[#12395d] text-white"
          aria-label="Nuestro enfoque de atención"
        >
          <div className="mx-auto grid max-w-[1280px] gap-4 px-5 py-12 sm:grid-cols-2 sm:px-8 lg:grid-cols-4 lg:px-12 lg:py-16">
            {[
              [HeartPulse, "Atención cercana"],
              [MessageCircle, "Información clara"],
              [CalendarCheck, "Orientación antes de tu cita"],
              [ShieldCheck, "Servicios en un mismo lugar"],
            ].map(([Icon, label]) => {
              const BenefitIcon = Icon as typeof HeartPulse;
              return (
                <div
                  key={label as string}
                  className="flex min-h-24 items-center gap-4 rounded-[18px] border border-white/10 bg-white/5 p-5"
                >
                  <BenefitIcon className="size-6 shrink-0 text-[#7ab2db]" />
                  <p className="font-display text-lg font-semibold leading-tight">
                    {label as string}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="order-4 bg-[#f4f8fa] py-24 sm:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid items-end gap-8 lg:grid-cols-[1fr_.65fr]">
              <div>
                <Eyebrow>Servicios principales</Eyebrow>
                <h2 className="max-w-3xl font-display text-4xl font-semibold leading-[.94] tracking-[-.055em] text-[#12395d] sm:text-6xl">
                  Lo necesario para cuidar tu salud, en un mismo lugar.
                </h2>
              </div>
              <div className="lg:pb-2">
                <p className="max-w-md text-base leading-relaxed text-[#597286]">
                  Reunimos estudios diagnósticos y opciones preventivas para
                  ayudarte a tomar decisiones informadas.
                </p>
                <Link
                  href="/servicios"
                  className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.15em] text-[#0f7065] hover:text-[#12395d]"
                >
                  Ver todos los servicios
                  <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {services.map(
                ({ number, title, description, href, image, Icon }) => (
                  <Link
                    key={number}
                    href={href}
                    className="group overflow-hidden rounded-[20px] bg-white shadow-[0_14px_36px_rgba(18,57,93,.08)] transition-transform hover:-translate-y-1"
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-[#dceef4]">
                      <img
                        src={image}
                        alt=""
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
                        {title}
                      </strong>
                      <span className="mt-2 block text-sm leading-relaxed text-[#597286]">
                        {description}
                      </span>
                      <ArrowRight className="mt-6 size-5 text-[#0f7065] transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>

        <section id="conoce" className="order-3 bg-[#fbfdfe] py-24 sm:py-32">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-14 lg:grid-cols-[.82fr_1.18fr] lg:gap-24">
              <div>
                <Eyebrow>Una visita más sencilla</Eyebrow>
                <h2 className="max-w-xl font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-6xl">
                  Saber qué sigue también da tranquilidad.
                </h2>
                <p className="mt-7 max-w-lg text-base leading-relaxed text-[#597286]">
                  Te acompañamos desde la elección del estudio hasta tus
                  resultados, sin procesos innecesarios ni información confusa.
                </p>
              </div>

              <div className="border-t border-[#12395d]/15">
                {steps.map(([Icon, number, title, description]) => (
                  <article
                    key={number as string}
                    className="grid grid-cols-[3rem_1fr] gap-5 border-b border-[#12395d]/15 py-7 sm:grid-cols-[4rem_1fr] sm:py-9"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-[#e8f5f5] text-[#0f7065]">
                      <Icon className="size-4" />
                    </span>
                    <div>
                      <h3 className="font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d] sm:text-3xl">
                        {title}
                      </h3>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#597286]">
                        {description}
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

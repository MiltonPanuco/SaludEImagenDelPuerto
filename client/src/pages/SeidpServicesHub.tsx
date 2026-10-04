import {
  ArrowRight,
  CalendarCheck,
  ClipboardCheck,
  HeartHandshake,
} from "lucide-react";
import { Link } from "wouter";
import { Eyebrow, PageIntro, PageShell } from "@/components/SeidpLayout";
import { services } from "@/serviceData";

export default function SeidpServicesHub() {
  return (
    <PageShell darkHeader>
      <main>
        <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-[#082b46] pb-14 pt-[104px] text-white sm:pb-18">
          <img
            src="/media/seidp-hero-clinic.webp"
            alt="Profesional trabajando con equipo médico"
            className="absolute inset-0 h-full w-full object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.72),rgba(8,43,70,.50)_48%,rgba(8,43,70,.12))]" />
          <div className="relative mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
            <PageIntro
              eyebrow="Nuestros servicios"
              title="Estudios y atención"
              italic="para cada necesidad."
              description="Elige un servicio para conocer sus indicaciones generales y agendar con nuestro equipo."
              dark
            />
          </div>
        </section>

        <section className="bg-[#fbfdfe] py-18 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <Eyebrow>Elige un servicio</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[.95] tracking-[-.05em] text-[#12395d] sm:text-6xl">
                Información clara antes de agendar.
              </h2>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(({ slug, title, short, image, alt, Icon }) => (
                <Link
                  key={slug}
                  href={`/servicios/${slug}`}
                  className="group overflow-hidden rounded-[20px] border border-[#12395d]/10 bg-white transition-transform hover:-translate-y-1"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#dceef4]">
                    <img
                      src={image}
                      alt={alt}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                    <span className="absolute bottom-4 left-4 grid size-11 place-items-center rounded-full bg-white text-[#0f7065] shadow-lg">
                      <Icon className="size-5" />
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d]">
                      {title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#597286]">
                      {short}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] text-[#0f7065]">
                      Ver servicio <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#082b46] py-18 text-white sm:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <Eyebrow light>Una visita más simple</Eyebrow>
                <h2 className="max-w-xl font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] sm:text-5xl">
                  Del primer mensaje a tus resultados.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-white/60">
                Nuestro objetivo es que sepas qué necesitas, cómo prepararte y
                qué sigue después de tu estudio.
              </p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[
                [
                  ClipboardCheck,
                  "01",
                  "Elige tu estudio",
                  "Revisa cada servicio o cuéntanos qué te indicó tu médico.",
                ],
                [
                  CalendarCheck,
                  "02",
                  "Confirma tu cita",
                  "Te ayudamos con disponibilidad, requisitos y preparación.",
                ],
                [
                  HeartHandshake,
                  "03",
                  "Recibe orientación",
                  "Te acompañamos con información clara durante tu visita.",
                ],
              ].map(([Icon, number, title, text]) => {
                const StepIcon = Icon as typeof ClipboardCheck;
                return (
                  <article
                    key={number as string}
                    className="rounded-[20px] border border-white/10 bg-white/5 p-6 sm:p-8"
                  >
                    <div className="flex items-center justify-between">
                      <StepIcon className="size-6 text-[#7ab2db]" />
                      <span className="text-[10px] font-bold tracking-[.14em] text-white/35">
                        {number as string}
                      </span>
                    </div>
                    <h3 className="mt-10 font-display text-2xl font-semibold tracking-[-.04em]">
                      {title as string}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-white/55">
                      {text as string}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

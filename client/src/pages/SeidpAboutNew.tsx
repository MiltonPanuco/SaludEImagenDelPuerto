import { useRef } from "react";
import { ArrowRight, Eye, HeartHandshake, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import {
  Eyebrow,
  PageIntro,
  PageShell,
  SharedScrollBackground,
} from "@/components/SeidpLayout";

export default function SeidpAboutNew() {
  const peopleRef = useRef<HTMLElement>(null);

  return (
    <PageShell darkHeader animateFirstSection>
      <main className="relative isolate flex flex-col">
        <SharedScrollBackground
          name="nosotros"
          src="/media/seidp-consulta-medica.webp"
          alt="Profesional de la salud conversando con una paciente"
          endRef={peopleRef}
          imageClassName="opacity-75"
        />
        <section className="relative flex min-h-[68svh] items-end overflow-hidden pb-12 pt-28 text-white sm:min-h-[72svh] sm:pb-16">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.72),rgba(8,43,70,.48)_52%,rgba(8,43,70,.12))]" />
          <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
            <PageIntro
              eyebrow="Nosotros"
              title="Diagnóstico cercano,"
              italic="decisiones más claras."
              description="Un centro de salud creado para acercar imagen, laboratorio, prevención y orientación profesional a Coapinole y Puerto Vallarta."
              dark
            />
          </div>
        </section>

        <section className="order-1 bg-[#fbfdfe] pb-16 pt-16 sm:pb-24 sm:pt-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12">
            <div className="overflow-hidden rounded-[24px] bg-[#dceef4]">
              <img
                src="/media/seidp-prevention-family.webp"
                alt="Atención médica y orientación profesional"
                className="aspect-[4/5] h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div>
              <Eyebrow>Nuestra historia</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-5xl">
                Nacimos para acercar estudios confiables a nuestra comunidad.
              </h2>
              <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-[#597286]">
                <p>
                  Salud e Imagen del Puerto surge en Coapinole con una idea
                  sencilla: reunir servicios de diagnóstico y prevención en un
                  lugar accesible, con atención humana.
                </p>
                <p>
                  Desde el inicio buscamos que cada persona comprenda su
                  proceso, reciba indicaciones claras y encuentre acompañamiento
                  antes y después de su estudio.
                </p>
              </div>
              <div className="mt-9 grid grid-cols-2 gap-4 border-t border-[#12395d]/12 pt-6">
                <div>
                  <p className="font-display text-3xl font-semibold text-[#0f7065]">
                    Local
                  </p>
                  <p className="mt-1 text-xs text-[#597286]">
                    Cerca de Coapinole
                  </p>
                </div>
                <div>
                  <p className="font-display text-3xl font-semibold text-[#0f7065]">
                    Integral
                  </p>
                  <p className="mt-1 text-xs text-[#597286]">
                    Imagen, laboratorio y prevención
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          ref={peopleRef}
          className="order-2 relative overflow-hidden py-20 text-white sm:py-28"
        >
          <div className="absolute inset-0 bg-[#082b46]/84" />
          <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-2xl">
              <Eyebrow light>Las personas detrás del centro</Eyebrow>
              <h2 className="max-w-xl font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] sm:text-5xl">
                Un equipo que escucha antes de comenzar.
              </h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60">
                Nos tomamos el tiempo de escuchar tus dudas, conocer el motivo
                de tu visita y explicarte los siguientes pasos con claridad.
              </p>
              <Link
                href="/contacto"
                className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#7ab2db]"
              >
                Conoce dónde estamos <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </section>

        <section className="order-3 bg-[linear-gradient(180deg,#f4f8fa_0%,#edf4f6_100%)] py-16 sm:py-24">
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
              <div>
                <Eyebrow>El compromiso que nos mueve</Eyebrow>
                <h2 className="max-w-xl font-display text-5xl leading-[.92] tracking-[-.04em] text-[#12395d] sm:text-6xl">
                  De nuestra comunidad.
                  <br />
                  <span className="text-[#0f7065] italic">
                    Para nuestra comunidad.
                  </span>
                </h2>
                <Link
                  href="/contacto"
                  className="mt-8 inline-flex min-h-11 items-center gap-3 border-b border-[#0f7065]/30 font-mono text-xs font-semibold uppercase tracking-[.1em] text-[#0f7065]"
                >
                  Estamos cerca de ti <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="divide-y divide-[#12395d]/15 border-y border-[#12395d]/15">
                <article className="py-7">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#0f7065]">
                    01 · Nuestra misión
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-[#12395d]">
                    Hacer más cercano el cuidado de tu salud.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#597286]">
                    Facilitar el acceso a estudios y orientación profesional,
                    con calidad, trato humano e indicaciones claras.
                  </p>
                </article>
                <article className="py-7">
                  <p className="font-mono text-[10px] font-semibold uppercase tracking-[.16em] text-[#0f7065]">
                    02 · Nuestra visión
                  </p>
                  <h3 className="mt-3 font-display text-3xl leading-tight text-[#12395d]">
                    Crecer contigo, seguir cerca.
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#597286]">
                    Ser un referente de salud diagnóstica en Puerto Vallarta,
                    con atención profesional y comunicación comprensible.
                  </p>
                </article>
              </div>
            </div>

            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {[
                [
                  HeartHandshake,
                  "Cercanía",
                  "Tratamos a cada persona con respeto, escucha y atención.",
                ],
                [
                  ShieldCheck,
                  "Confianza",
                  "Comunicamos indicaciones con honestidad y claridad.",
                ],
                [
                  Eye,
                  "Prevención",
                  "Impulsamos decisiones informadas antes de que aparezcan síntomas.",
                ],
              ].map(([Icon, title, description]) => {
                const ValueIcon = Icon as typeof Eye;
                return (
                  <article
                    key={title as string}
                    className="rounded-[24px] bg-white p-8 shadow-[0_14px_34px_rgba(18,57,93,.05)] transition-transform duration-300 hover:-translate-y-1 sm:p-10"
                  >
                    <ValueIcon className="size-7 text-[#27839a]" />
                    <h3 className="mt-12 font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d]">
                      {title as string}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-[#597286]">
                      {description as string}
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

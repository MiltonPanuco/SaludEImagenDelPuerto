import { useRef } from "react";
import {
  Activity,
  ArrowRight,
  Heart,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
  Stethoscope,
  TestTube2,
  UserRound,
  Utensils,
} from "lucide-react";
import { Link } from "wouter";
import {
  Eyebrow,
  PageIntro,
  PageShell,
  SharedScrollBackground,
} from "@/components/SeidpLayout";

const needs = [
  [ShieldCheck, "Revisión general", "#orientacion"],
  [Heart, "Salud de la mujer", "#orientacion"],
  [UserRound, "Salud del hombre", "#orientacion"],
  [HeartPulse, "Corazón", "/servicios/electrocardiogramas"],
  [TestTube2, "Laboratorio", "/servicios/laboratorio-clinico"],
  [Utensils, "Nutrición y bienestar", "/servicios/consulta-nutricional"],
] as const;

const orientationCards = [
  [
    ShieldCheck,
    "Conoce tus opciones preventivas",
    "Explora posibilidades para revisar aspectos generales de tu salud sin asumir que existe una opción única para todas las personas.",
  ],
  [
    Stethoscope,
    "Consulta qué estudios pueden ser adecuados",
    "Comparte tus antecedentes y la indicación de tu médico para recibir información sobre los estudios disponibles.",
  ],
  [
    MessageCircle,
    "Recibe orientación de nuestro equipo",
    "Confirma requisitos, preparación y disponibilidad antes de acudir al centro.",
  ],
] as const;

export default function SeidpPreventionNew() {
  const clarityRef = useRef<HTMLElement>(null);

  return (
    <PageShell darkHeader animateFirstSection>
      <main className="relative isolate">
        <SharedScrollBackground
          name="prevencion"
          src="/media/seidp-prevention-family.webp"
          alt="Familia recibiendo orientación preventiva en un entorno clínico"
          endRef={clarityRef}
          imageClassName="opacity-80"
        />
        <section className="relative flex min-h-[68svh] items-end overflow-hidden pb-12 pt-28 text-white sm:min-h-[72svh] sm:pb-16">
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.72),rgba(8,43,70,.48)_52%,rgba(8,43,70,.14))]" />
          <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <PageIntro
              eyebrow="Prevención"
              title="Cuidarte también"
              italic="es prevenir."
              description="Conoce opciones para revisar tu salud de forma oportuna y tomar decisiones con mayor tranquilidad."
              dark
            />
          </div>
        </section>

        <section
          className="bg-white py-12 sm:py-16"
          aria-labelledby="necesidades"
        >
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <Eyebrow>Un punto de vista</Eyebrow>
            <h2
              id="necesidades"
              className="font-display text-4xl font-semibold tracking-[-.05em] text-[#12395d] sm:text-5xl"
            >
              ¿Qué quieres revisar?
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#597286]">
              Estas opciones organizan la información disponible; no son
              diagnósticos ni sustituyen una valoración médica.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
              {needs.map(([Icon, label, href]) => (
                <a
                  key={label}
                  href={href}
                  className="group flex min-h-16 items-center gap-3 rounded-2xl border border-[#12395d]/10 bg-[#fbfdfe] px-4 py-3 text-sm font-semibold text-[#12395d] transition-colors hover:border-[#4291cd] hover:bg-[#edf6fb]"
                >
                  <Icon className="size-5 shrink-0 text-[#0f7065]" />
                  <span>{label}</span>
                  <ArrowRight className="ml-auto size-4 text-[#4291cd] transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section
          id="orientacion"
          className="relative scroll-mt-24 overflow-hidden bg-white py-16 sm:py-24"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -right-36 top-12 size-[360px] rounded-full border-[58px] border-[#dceef4] sm:-right-24 sm:size-[420px] sm:border-[70px]"
          />
          <div className="relative mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <div className="max-w-3xl">
              <Eyebrow>Opciones preventivas</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-6xl">
                Primero entendemos qué necesitas revisar.
              </h2>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#597286]">
                Aún no presentamos paquetes cerrados porque los estudios y
                requisitos deben confirmarse de manera individual. Estas
                opciones te ayudan a comenzar sin inventar una lista que quizá
                no corresponda a tu caso.
              </p>
            </div>
            <div className="mt-12 grid gap-5 lg:grid-cols-3">
              {orientationCards.map(([Icon, title, text], index) => (
                <article
                  key={title}
                  className={`rounded-[22px] border border-[#12395d]/10 p-6 sm:p-8 ${index === 0 ? "bg-[#12395d] text-white lg:row-span-2" : "bg-[#edf6fb] text-[#12395d]"}`}
                >
                  <span
                    className={`grid size-12 place-items-center rounded-full ${index === 0 ? "bg-white/10 text-[#7ab2db]" : "bg-white text-[#0f7065]"}`}
                  >
                    <Icon className="size-5" />
                  </span>
                  <p
                    className={`mt-8 text-[10px] font-bold uppercase tracking-[.15em] ${index === 0 ? "text-[#7ab2db]" : "text-[#0f7065]"}`}
                  >
                    Orientación 0{index + 1}
                  </p>
                  <h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em]">
                    {title}
                  </h3>
                  <p
                    className={`mt-4 text-sm leading-relaxed ${index === 0 ? "text-white/70" : "text-[#597286]"}`}
                  >
                    {text}
                  </p>
                  <p
                    className={`mt-7 border-t pt-5 text-xs ${index === 0 ? "border-white/15 text-white/60" : "border-[#12395d]/10 text-[#597286]"}`}
                  >
                    Preparación, requisitos y cita: confirma estos datos con
                    nuestro equipo.
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[#597286]">
              Estas opciones son una orientación inicial y no sustituyen una
              valoración médica.
            </p>
          </div>
        </section>

        <section
          ref={clarityRef}
          className="relative overflow-hidden py-16 text-white sm:py-20"
        >
          <div className="absolute inset-0 bg-[#082b46]/84" />
          <div className="relative mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_.9fr] lg:items-center lg:px-12">
            <div>
              <Eyebrow light>Prevención con información clara</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[.98] tracking-[-.05em] sm:text-5xl">
                Entiende qué revisar, cómo prepararte y qué sigue.
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/70">
                Te acompañamos antes de tu visita para confirmar requisitos y
                disponibilidad. Cuando estés listo, utiliza el botón flotante de
                WhatsApp o consulta nuestros datos de contacto.
              </p>
              <Link
                href="/contacto"
                className="mt-7 inline-flex min-h-11 items-center gap-2 font-bold text-[#7ab2db] hover:text-white"
              >
                Ver datos de contacto <ArrowRight className="size-4" />
              </Link>
            </div>
            <div className="overflow-hidden rounded-[22px] bg-[#12395d]">
              <img
                src="/media/seidp-consulta-medica.webp"
                alt="Profesional de la salud orientando a una paciente"
                className="aspect-[4/3] size-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </section>

        <section className="bg-[#f4f8fa] py-16 sm:py-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div>
                <Eyebrow>Beneficios de orientarte</Eyebrow>
                <h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-5xl">
                  Información para cuidar lo que sigue.
                </h2>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-[#597286]">
                Los estudios preventivos pueden aportar información útil para
                conversar con un profesional y decidir si necesitas seguimiento.
              </p>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {[
                [
                  Activity,
                  "Conoce mejor tu estado de salud",
                  "Reúne información que puede ayudar a comprender tu situación actual.",
                ],
                [
                  HeartPulse,
                  "Identifica la necesidad de seguimiento",
                  "Reconoce cambios o resultados que conviene revisar con un profesional.",
                ],
                [
                  MessageCircle,
                  "Recibe orientación clara",
                  "Confirma qué sigue, cómo prepararte y cuándo consultar tus resultados.",
                ],
              ].map(([Icon, title, text]) => {
                const ValueIcon = Icon as typeof Activity;
                return (
                  <article
                    key={title as string}
                    className="rounded-[20px] border border-[#12395d]/10 bg-white p-6 sm:p-8"
                  >
                    <span className="grid size-11 place-items-center rounded-full bg-[#e8f5f5] text-[#0f7065]">
                      <ValueIcon className="size-5" />
                    </span>
                    <h3 className="mt-7 font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d]">
                      {title as string}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#597286]">
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

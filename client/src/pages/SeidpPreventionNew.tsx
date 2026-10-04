import { Activity, ArrowRight, Heart, MessageCircle, ShieldCheck, Stethoscope } from "lucide-react";
import { Link } from "wouter";
import { AnimatedStat } from "@/components/AnimatedStat";
import { Eyebrow, PageIntro, PageShell, WhatsAppButton } from "@/components/SeidpLayout";

const careRoutes = [
  {
    title: "Una ruta para ella",
    label: "Escuchar y acompañar",
    Icon: Heart,
    accentClass: "text-[#d65387]",
    backgroundClass: "bg-[#fcecf3]",
    description: "Un punto de partida para conversar sobre bienestar, antecedentes y los cambios que deseas observar.",
    steps: ["Cuéntanos qué quieres revisar", "Definimos contigo una base de estudios", "Te orientamos para dar seguimiento"],
    note: "Puede integrar análisis de laboratorio y ultrasonidos pélvico o mamario, según tus necesidades.",
  },
  {
    title: "Una ruta para él",
    label: "Conocer y anticipar",
    Icon: ShieldCheck,
    accentClass: "text-[#6b3fa0]",
    backgroundClass: "bg-[#f4effa]",
    description: "Una conversación sencilla para reconocer prioridades y reunir información útil para tu próxima valoración.",
    steps: ["Hablamos de tu etapa y antecedentes", "Elegimos estudios con una intención clara", "Organizamos los siguientes pasos"],
    note: "Puede integrar laboratorio, antígeno prostático y ultrasonido prostático, de acuerdo con cada caso.",
  },
] as const;

export default function SeidpPreventionNew() {
  return (
    <PageShell darkHeader>
      <main>
        <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-[#082b46] pb-14 pt-[104px] text-white sm:pb-20">
          <img src="/media/seidp-prevencion-mujer.webp" alt="Consulta médica orientada a la prevención" className="absolute inset-0 h-full w-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.12),rgba(8,43,70,.48)_48%,rgba(8,43,70,.72))]" />
          <div className="relative mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <PageIntro eyebrow="Prevención" title="Conocer tu salud hoy" italic="cambia tus decisiones mañana." description="El cuidado preventivo puede empezar con una conversación. Te ayudamos a reconocer qué deseas revisar y a elegir una ruta clara." dark right />
          </div>
        </section>

        <section className="bg-[#fbfdfe] py-18 sm:py-24">
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
              <div><Eyebrow>Prevenir es observar a tiempo</Eyebrow><h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-5xl">Un punto de partida para cuidar lo que sigue.</h2></div>
              <p className="max-w-xl text-sm leading-relaxed text-[#597286]">Los check-ups no sustituyen una valoración médica. Son una forma práctica de reunir información útil para hablar con un profesional y dar seguimiento a tu bienestar.</p>
            </div>
            <div className="mt-12 grid gap-4 md:grid-cols-3">
              {[[Activity, "Detectar cambios", "Comparar resultados ayuda a identificar variaciones que merecen seguimiento."], [Stethoscope, "Decidir con información", "Tus resultados pueden orientar una conversación más útil con tu médico."], [MessageCircle, "Resolver dudas", "Nuestro equipo confirma contigo preparación, requisitos y disponibilidad."]].map(([Icon, title, text]) => { const ValueIcon = Icon as typeof Activity; return <article key={title as string} className="rounded-[20px] border border-[#12395d]/10 bg-white p-6 sm:p-8"><span className="grid size-11 place-items-center rounded-full bg-[#e8f5f5] text-[#0f7065]"><ValueIcon className="size-5" /></span><h3 className="mt-8 font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d]">{title as string}</h3><p className="mt-3 text-sm leading-relaxed text-[#597286]">{text as string}</p></article>; })}
            </div>
          </div>
        </section>

        <section className="bg-[#12395d] py-14 text-white sm:py-16" aria-label="Opciones preventivas en números">
          <div className="mx-auto grid max-w-[1180px] grid-cols-2 gap-8 px-5 sm:px-8 lg:grid-cols-4 lg:px-12">
            <AnimatedStat value={600} suffix="+" label="Evaluaciones preventivas" />
            <AnimatedStat value={5000} suffix="+" label="Análisis de laboratorio" />
            <AnimatedStat value={2} label="Rutas de cuidado" />
            <AnimatedStat value={7} label="Días con atención" />
          </div>
        </section>

        <section className="relative overflow-hidden bg-gradient-to-b from-[#f1f6f8] to-white py-18 sm:py-24">
          <span aria-hidden="true" className="pointer-events-none absolute -right-36 top-12 size-[360px] rounded-full border-[58px] border-[#dceef4] sm:-right-24 sm:size-[420px] sm:border-[70px]" />
          <div className="mx-auto max-w-[1180px] px-5 sm:px-8 lg:px-12">
            <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end"><div><Eyebrow>Rutas de cuidado</Eyebrow><h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-5xl">Primero la conversación. Después, los estudios.</h2></div><p className="max-w-xl text-sm leading-relaxed text-[#597286]">No se trata de elegir una lista cerrada. Se trata de entender tu momento, ordenar tus dudas y construir una ruta que tenga sentido para ti.</p></div>
            <div className="mt-12 grid gap-5 lg:grid-cols-2">
              {careRoutes.map(({ title, label, Icon, accentClass, backgroundClass, description, steps, note }) => (
                <article key={title} className="overflow-hidden rounded-[22px] bg-white shadow-[0_14px_36px_rgba(18,57,93,.07)]">
                  <div className={`flex items-center justify-between p-6 sm:p-8 ${backgroundClass}`}><span className={`grid size-12 place-items-center rounded-full bg-white ${accentClass}`}><Icon className="size-5" /></span><span className={`text-[9px] font-bold uppercase tracking-[.15em] ${accentClass}`}>{label}</span></div>
                  <div className="p-6 sm:p-8"><h3 className="font-display text-3xl font-semibold tracking-[-.04em] text-[#12395d]">{title}</h3><p className="mt-4 text-sm leading-relaxed text-[#597286]">{description}</p><ol className="mt-7 border-t border-[#12395d]/10">{steps.map((step, index) => <li key={step} className="grid grid-cols-[2rem_1fr] gap-3 border-b border-[#12395d]/10 py-4"><span className={`text-xs font-bold ${accentClass}`}>0{index + 1}</span><span className="font-display text-lg font-semibold text-[#12395d]">{step}</span></li>)}</ol><p className={`mt-6 rounded-2xl p-4 text-xs leading-relaxed text-[#597286] ${backgroundClass}`}>{note}</p><Link href="/contacto" className={`mt-7 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.13em] ${accentClass}`}>Comenzar una conversación <ArrowRight className="size-4" /></Link></div>
                </article>
              ))}
            </div>
            <p className="mt-6 text-xs leading-relaxed text-[#597286]">Los estudios se confirman de manera individual. Estas rutas son una orientación inicial y no sustituyen una valoración médica.</p>
          </div>
        </section>

        <section className="bg-white py-18 sm:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-12">
            <div className="overflow-hidden rounded-[24px] bg-[#dceef4]"><img src="/media/seidp-prevention-family.webp" alt="Orientación médica para elegir estudios preventivos" className="aspect-[4/3] h-full w-full object-cover" loading="lazy" decoding="async" /></div>
            <div><Eyebrow>Cómo comenzar</Eyebrow><h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-5xl">Tres pasos, sin complicaciones.</h2><div className="mt-8 border-t border-[#12395d]/12">{[["01", "Cuéntanos qué deseas revisar"], ["02", "Confirma estudios y preparación"], ["03", "Agenda el horario que te funcione"]].map(([number, text]) => <div key={number} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#12395d]/12 py-5"><span className="text-xs font-bold text-[#0f7065]">{number}</span><p className="font-display text-xl font-semibold text-[#12395d]">{text}</p></div>)}</div><div className="mt-8"><WhatsAppButton>Hablar con el equipo</WhatsAppButton></div></div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

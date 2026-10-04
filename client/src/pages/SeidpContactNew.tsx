import { ArrowDown, ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { APPOINTMENT_PHONE, Eyebrow, PageIntro, PageShell, URGENCY_PHONE, WHATSAPP_URL, WhatsAppIcon } from "@/components/SeidpLayout";

const questions = [
  ["¿Cómo puedo agendar?", "Escríbenos por WhatsApp o llama al 322 403 5071. Te ayudaremos a confirmar el estudio y la disponibilidad."],
  ["¿Qué debo llevar el día de mi estudio?", "Lleva tu orden médica si cuentas con una, una identificación y estudios previos relacionados. Al agendar te confirmaremos si necesitas algo adicional."],
  ["¿Cuándo recibiré mis resultados?", "El tiempo de entrega depende del estudio. Pregunta por el plazo estimado al agendar o durante tu atención."],
  ["¿Qué información de salud debo compartir?", "Avísanos si estás embarazada o podrías estarlo, si tienes alergias, implantes, marcapasos o tomas medicamentos relevantes."],
  ["¿Atienden fines de semana?", "Sí. Sábado y domingo atendemos de 8:00 a. m. a 2:00 p. m., sujeto a disponibilidad."],
  ["¿Atienden urgencias?", "Llama al 322 132 7405 para confirmar atención. Este número no sustituye al 911 ni a una ambulancia."],
] as const;

export default function SeidpContactNew() {
  return (
    <PageShell darkHeader>
      <main>
        <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-[#082b46] pb-14 pt-32 text-white sm:pb-20">
          <img src="/media/seidp-contacto-clinica.webp" alt="Entrada de una clínica en Puerto Vallarta" fetchPriority="high" className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.72),rgba(8,43,70,.50)_52%,rgba(8,43,70,.10))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082b46]/45 via-transparent to-[#082b46]/10" />
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <PageIntro eyebrow="Contacto · Puerto Vallarta" title="Hablemos." italic="Estamos cerca." description="Una duda, un estudio, tu próxima cita. Cuéntanos qué necesitas y te ayudamos a dar el siguiente paso." dark />
            <a href="#hablar" className="mt-8 inline-flex items-center gap-3 text-xs font-semibold text-white"><span className="grid size-9 place-items-center rounded-full border border-white/40"><ArrowDown className="size-4" /></span>Habla con nosotros</a>
          </div>
        </section>
        <section id="hablar" className="scroll-mt-24 bg-[#fbfdfe] py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:px-12">
            <div><Eyebrow>Contacto directo</Eyebrow><h2 className="font-display text-4xl font-semibold leading-[1] tracking-[-.05em] text-[#12395d] sm:text-5xl">Te escuchamos y te orientamos.</h2><p className="mt-6 max-w-sm text-sm leading-relaxed text-[#597286]">Elige el canal que prefieras. Comparte el estudio que buscas o la duda que deseas resolver.</p></div>
            <div className="border-t border-[#12395d]/15">
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-[#12395d]/15 py-6 text-[#12395d] transition-all duration-300 hover:bg-[#e8f5f5] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:px-5"><span className="grid size-11 place-items-center rounded-full bg-[#0f7065] text-white"><WhatsAppIcon className="size-5" /></span><span><span className="block text-[9px] font-bold uppercase tracking-[.15em] text-[#0f7065]">Mensajes y citas</span><strong className="mt-1 block font-display text-xl sm:text-2xl">WhatsApp</strong></span><span className="hidden text-sm text-[#597286] sm:block">322 470 4622</span><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
              <a href={`tel:${APPOINTMENT_PHONE}`} className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-[#12395d]/15 py-6 text-[#12395d] transition-all duration-300 hover:bg-[#e8f5f5] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:px-5"><span className="grid size-11 place-items-center rounded-full bg-[#e8f5f5] text-[#0f7065]"><Phone className="size-5" /></span><span><span className="block text-[9px] font-bold uppercase tracking-[.15em] text-[#0f7065]">Agenda por teléfono</span><strong className="mt-1 block font-display text-xl sm:text-2xl">Línea de citas</strong></span><span className="hidden text-sm text-[#597286] sm:block">322 403 5071</span><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
              <a href={`tel:${URGENCY_PHONE}`} className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-[#12395d]/15 py-6 text-[#12395d] transition-all duration-300 hover:bg-[#e8f5f5] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:px-5"><span className="grid size-11 place-items-center rounded-full bg-[#12395d] text-white"><Clock3 className="size-5" /></span><span><span className="block text-[9px] font-bold uppercase tracking-[.15em] text-[#0f7065]">Confirma atención</span><strong className="mt-1 block font-display text-xl sm:text-2xl">Urgencias</strong></span><span className="hidden text-sm text-[#597286] sm:block">322 132 7405</span><ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
              <p className="pt-4 text-xs leading-relaxed text-[#597286]">La línea de urgencias no sustituye al 911 ni a una ambulancia.</p>
            </div>
          </div>
        </section>
        <section id="encuentranos" className="scroll-mt-24 bg-[#082b46] py-16 text-white sm:py-24">
          <div className="mx-auto grid max-w-[1280px] gap-10 px-5 sm:px-8 lg:grid-cols-[1.35fr_.65fr] lg:items-stretch lg:gap-0 lg:px-12">
            <div className="min-h-[420px] overflow-hidden rounded-[24px] bg-[#dceef4] lg:rounded-r-none"><iframe title="Ubicación de Salud e Imagen del Puerto" src="https://www.google.com/maps?q=Calle%2010%20de%20Mayo%20980%2C%20Coapinole%2C%20Puerto%20Vallarta%2C%20Jalisco&z=16&output=embed" className="h-full min-h-[420px] w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <div className="flex flex-col justify-between rounded-[24px] bg-[#12395d] p-7 sm:p-10 lg:rounded-l-none">
              <div><Eyebrow light>Encuéntranos</Eyebrow><h2 className="font-display text-4xl font-semibold leading-[1] tracking-[-.05em]">Cerca de tu día a día.</h2><a href="https://maps.app.goo.gl/EnPoYMCfZ6Cm4Fzs7" target="_blank" rel="noreferrer" className="mt-7 flex items-start gap-3 text-sm leading-relaxed text-white/65 transition-colors hover:text-white"><MapPin className="mt-0.5 size-5 shrink-0 text-[#7ab2db]" /><span>Calle 10 de Mayo #980, entre Guatemala y Brasil, Colonia Coapinole, Puerto Vallarta.</span></a></div>
              <dl className="mt-10 border-t border-white/15 text-sm"><div className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/15 py-5"><dt className="text-white/55">Lunes a viernes</dt><dd className="font-semibold">8:00 a. m. - 8:00 p. m.</dd></div><div className="grid grid-cols-[1fr_auto] gap-4 border-b border-white/15 py-5"><dt className="text-white/55">Sábado y domingo</dt><dd className="font-semibold">8:00 a. m. - 2:00 p. m.</dd></div></dl>
            </div>
          </div>
        </section>
        <section className="bg-[#f4f8fa] py-16 sm:py-24">
          <div className="mx-auto max-w-[980px] px-5 sm:px-8 lg:px-12">
            <div className="mx-auto max-w-2xl text-center"><div className="flex justify-center"><Eyebrow>Antes de tu visita</Eyebrow></div><h2 className="font-display text-4xl font-semibold leading-[1] tracking-[-.05em] text-[#12395d] sm:text-5xl">Respuestas claras, sin darle más vueltas.</h2><p className="mx-auto mt-5 max-w-lg text-sm leading-relaxed text-[#597286]">Lo más consultado antes de agendar o acudir al centro.</p></div>
            <Accordion type="single" collapsible className="mt-12 border-t border-[#12395d]/15">{questions.map(([question, answer], index) => <AccordionItem key={question} value={question} className="border-[#12395d]/15"><AccordionTrigger className="gap-4 py-6 text-left font-display text-lg font-semibold tracking-[-.025em] text-[#12395d] hover:no-underline sm:text-xl [&>svg]:text-[#0f7065]"><span className="flex items-baseline gap-4"><span className="font-sans text-[10px] text-[#0f7065]">0{index + 1}</span>{question}</span></AccordionTrigger><AccordionContent className="max-w-2xl pb-6 pl-7 text-sm leading-relaxed text-[#597286]">{answer}</AccordionContent></AccordionItem>)}</Accordion>
            <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-[#12395d]/15 pt-7 text-center sm:flex-row sm:text-left"><p className="text-sm text-[#597286]">¿Tu pregunta no aparece aquí?</p><a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#0f7065]">Preguntar por WhatsApp <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

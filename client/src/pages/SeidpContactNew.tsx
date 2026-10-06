import { ArrowDown, ArrowUpRight, Clock3, MapPin, Phone } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MapboxTiltMap } from "@/components/MapboxTiltMap";
import {
  APPOINTMENT_PHONE,
  Eyebrow,
  PageIntro,
  PageShell,
  URGENCY_PHONE,
  WhatsAppIcon,
  useWhatsAppUrl,
} from "@/components/SeidpLayout";

const questions = [
  [
    "¿Cómo puedo agendar?",
    "Escríbenos por WhatsApp o llama al 322 403 5071. Te ayudaremos a confirmar el estudio y la disponibilidad.",
  ],
  [
    "¿Qué debo llevar el día de mi estudio?",
    "Lleva tu orden médica si cuentas con una, una identificación y estudios previos relacionados. Al agendar te confirmaremos si necesitas algo adicional.",
  ],
  [
    "¿Cuándo recibiré mis resultados?",
    "El tiempo de entrega depende del estudio. Pregunta por el plazo estimado al agendar o durante tu atención.",
  ],
  [
    "¿Atienden fines de semana?",
    "Sí. Sábado y domingo atendemos de 8:00 a. m. a 2:00 p. m., sujeto a disponibilidad.",
  ],
  [
    "¿Atienden urgencias?",
    "Llama al 322 132 7405 para confirmar atención. Este número no sustituye al 911 ni a una ambulancia.",
  ],
] as const;

export default function SeidpContactNew() {
  const whatsAppUrl = useWhatsAppUrl();

  return (
    <PageShell darkHeader animateFirstSection>
      <main>
        <section className="relative isolate flex min-h-[68svh] items-end overflow-hidden bg-[#082b46] pb-12 pt-28 text-white sm:min-h-[72svh] sm:pb-16">
          <img
            src="/media/seidp-contacto-clinica.webp"
            alt="Entrada de una clínica en Puerto Vallarta"
            fetchPriority="high"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.72),rgba(8,43,70,.50)_52%,rgba(8,43,70,.10))]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#082b46]/45 via-transparent to-[#082b46]/10" />
          <div className="relative z-10 mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <PageIntro
              eyebrow="Contacto · Puerto Vallarta"
              title="Hablemos."
              italic="Estamos cerca."
              description="Una duda, un estudio, tu próxima cita. Cuéntanos qué necesitas y te ayudamos a dar el siguiente paso."
              dark
            />
            <a
              href="#hablar"
              className="hero-enter hero-enter--actions mt-8 inline-flex items-center gap-3 text-xs font-semibold text-white"
            >
              <span className="grid size-9 place-items-center rounded-full border border-white/40">
                <ArrowDown className="size-4" />
              </span>
              Habla con nosotros
            </a>
          </div>
        </section>
        <section
          id="hablar"
          className="scroll-mt-24 bg-[linear-gradient(180deg,#fbfdfe_0%,#f6f9fa_62%,#edf4f6_100%)] py-16 sm:py-24"
        >
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-8 lg:grid-cols-[.7fr_1.3fr] lg:gap-24 lg:px-12">
            <div>
              <Eyebrow>Contacto directo</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[1] tracking-[-.05em] text-[#12395d] sm:text-5xl">
                Te escuchamos y te orientamos.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#597286]">
                Elige el canal que prefieras. Comparte el estudio que buscas o
                la duda que deseas resolver.
              </p>
            </div>
            <div className="border-t border-[#12395d]/15">
              <a
                href={whatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-[#12395d]/15 py-6 text-[#12395d] transition-all duration-300 hover:bg-[#e8f5f5] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:px-5"
              >
                <span className="grid size-11 place-items-center rounded-full bg-[#0f7065] text-white">
                  <WhatsAppIcon className="size-5" />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[.15em] text-[#0f7065]">
                    Mensajes y citas
                  </span>
                  <strong className="mt-1 block font-display text-xl font-medium sm:text-2xl">
                    WhatsApp
                  </strong>
                </span>
                <span className="hidden text-sm text-[#597286] sm:block">
                  322 470 4622
                </span>
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a
                href={`tel:${APPOINTMENT_PHONE}`}
                className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-[#12395d]/15 py-6 text-[#12395d] transition-all duration-300 hover:bg-[#e8f5f5] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:px-5"
              >
                <span className="grid size-11 place-items-center rounded-full bg-[#e8f5f5] text-[#0f7065]">
                  <Phone className="size-5" />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[.15em] text-[#0f7065]">
                    Agenda por teléfono
                  </span>
                  <strong className="mt-1 block font-display text-xl font-medium sm:text-2xl">
                    Línea de citas
                  </strong>
                </span>
                <span className="hidden text-sm text-[#597286] sm:block">
                  322 403 5071
                </span>
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <a
                href={`tel:${URGENCY_PHONE}`}
                className="group grid grid-cols-[2.75rem_1fr_auto] items-center gap-4 border-b border-[#12395d]/15 py-6 text-[#12395d] transition-all duration-300 hover:bg-[#e8f5f5] sm:grid-cols-[3.5rem_1fr_auto_auto] sm:px-5"
              >
                <span className="grid size-11 place-items-center rounded-full bg-[#12395d] text-white">
                  <Clock3 className="size-5" />
                </span>
                <span>
                  <span className="block text-[9px] font-bold uppercase tracking-[.15em] text-[#0f7065]">
                    Confirma atención
                  </span>
                  <strong className="mt-1 block font-display text-xl font-medium sm:text-2xl">
                    Urgencias
                  </strong>
                </span>
                <span className="hidden text-sm text-[#597286] sm:block">
                  322 132 7405
                </span>
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>
              <p className="pt-4 text-xs leading-relaxed text-[#597286]">
                La línea de urgencias no sustituye al 911 ni a una ambulancia.
              </p>
            </div>
          </div>
        </section>
        <section
          id="encuentranos"
          className="scroll-mt-24 bg-[#edf4f6] py-16 text-[#12395d] sm:py-24"
        >
          <div className="mx-auto max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <div className="mb-10 grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <Eyebrow>Aquí nos encontramos</Eyebrow>
                <h2 className="font-display text-5xl font-semibold leading-[.95] tracking-[-.055em] sm:text-6xl">
                  Ven a conocernos.
                </h2>
              </div>
              <p className="flex items-center gap-2 text-sm text-[#597286] lg:pb-2">
                <MapPin className="size-4 text-[#0f7065]" />
                Puerto Vallarta, Jalisco
              </p>
            </div>
          </div>
          <div className="px-5 sm:px-8 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))] lg:pr-0">
            <div className="grid overflow-hidden rounded-[26px] shadow-[0_18px_50px_rgba(18,57,93,.1)] lg:grid-cols-[minmax(360px,500px)_1fr] lg:rounded-r-none">
              <div className="flex flex-col justify-between bg-[#e7f0f3] p-7 sm:p-10 lg:min-h-[620px] lg:p-12">
                <div>
                  <Eyebrow>Nuestra dirección</Eyebrow>
                  <h3 className="mt-6 max-w-sm font-display text-4xl font-semibold leading-[.92] tracking-[-.05em] sm:text-5xl">
                    Calle 10 de Mayo #980
                  </h3>
                  <p className="mt-5 text-sm leading-relaxed text-[#597286]">
                    Entre Guatemala y Brasil
                    <br />
                    Colonia Coapinole, Puerto Vallarta, Jalisco.
                  </p>
                </div>
                <dl className="mt-8 border-y border-[#12395d]/15 py-5 text-sm">
                  <div>
                    <dt className="text-[#597286]">Lunes a viernes</dt>
                    <dd className="mt-1 font-semibold">
                      8:00 a. m. - 8:00 p. m.
                    </dd>
                  </div>
                  <div className="mt-5">
                    <dt className="text-[#597286]">Sábado y domingo</dt>
                    <dd className="mt-1 font-semibold">
                      8:00 a. m. - 2:00 p. m.
                    </dd>
                  </div>
                </dl>
                <div className="mt-7 grid gap-3">
                  <a
                    href="https://maps.app.goo.gl/EnPoYMCfZ6Cm4Fzs7"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-[#cfe6f0] px-4 text-[10px] font-bold uppercase tracking-[.12em] transition-colors hover:bg-[#b9dbe9]"
                  >
                    Cómo llegar <ArrowUpRight className="size-4" />
                  </a>
                  <div className="grid grid-cols-2 gap-3">
                    <a
                      href={`tel:${APPOINTMENT_PHONE}`}
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#12395d]/20 px-3 text-xs font-bold transition-colors hover:bg-white"
                    >
                      Llamar <Phone className="size-4" />
                    </a>
                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#12395d]/20 px-3 text-xs font-bold transition-colors hover:bg-white"
                    >
                      Consultar por WhatsApp <WhatsAppIcon className="size-4" />
                    </a>
                  </div>
                </div>
              </div>
              <div className="min-h-[420px] bg-[#dceef4] lg:min-h-[620px]">
                <MapboxTiltMap />
              </div>
            </div>
          </div>
        </section>
        <section
          id="preguntas-frecuentes"
          className="scroll-mt-24 bg-[linear-gradient(180deg,#edf4f6_0%,#f7fafb_44%,#ffffff_100%)] py-16 sm:py-24"
        >
          <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-[.68fr_1.32fr] lg:gap-24 lg:px-12">
            <div>
              <Eyebrow>Antes de tu visita</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[1] tracking-[-.05em] text-[#12395d] sm:text-5xl">
                Llega con más claridad.
              </h2>
              <p className="mt-6 max-w-sm text-sm leading-relaxed text-[#597286]">
                Resolvemos las preguntas más comunes antes de tu cita.
              </p>
            </div>
            <div>
              <Accordion
                type="single"
                collapsible
                className="border-t border-[#12395d]/15"
              >
                {questions.map(([question, answer], index) => (
                  <AccordionItem
                    key={question}
                    value={question}
                    className="border-[#12395d]/15"
                  >
                    <AccordionTrigger className="gap-4 py-6 text-left font-display text-lg font-semibold tracking-[-.025em] text-[#12395d] hover:no-underline sm:text-xl [&>svg]:text-[#0f7065]">
                      <span className="flex items-baseline gap-4">
                        <span className="font-sans text-[10px] text-[#0f7065]">
                          0{index + 1}
                        </span>
                        {question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="max-w-2xl pb-6 pl-7 text-sm leading-relaxed text-[#597286]">
                      {answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <div className="mt-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                <p className="text-sm text-[#597286]">
                  ¿Tu pregunta no aparece aquí?
                </p>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex min-h-11 items-center gap-3 text-[10px] font-bold uppercase tracking-[.13em] text-[#0f7065]"
                >
                  Preguntar por WhatsApp{" "}
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

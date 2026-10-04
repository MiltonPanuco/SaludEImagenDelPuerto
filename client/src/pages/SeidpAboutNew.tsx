import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Eyebrow, ImageModal, PageIntro, PageShell } from "@/components/SeidpLayout";

const galleryImages = [
  { src: "/media/seidp-hero-clinic.webp", alt: "Equipo de imagen diagnóstica del centro", size: "h-44 w-72 sm:h-52 sm:w-96" },
  { src: "/media/seidp-lab-detail.webp", alt: "Área de laboratorio clínico", size: "h-44 w-56 sm:h-52 sm:w-72" },
  { src: "/media/seidp-consulta-medica.webp", alt: "Consulta y orientación profesional", size: "h-44 w-64 sm:h-52 sm:w-80" },
  { src: "/media/seidp-contacto-clinica.webp", alt: "Instalaciones de Salud e Imagen del Puerto", size: "h-44 w-80 sm:h-52 sm:w-[430px]" },
  { src: "/media/seidp-ultrasonido-obstetrico.webp", alt: "Estudio de ultrasonido", size: "h-40 w-60 sm:h-48 sm:w-72" },
  { src: "/media/seidp-radiografias.webp", alt: "Servicio de radiografías", size: "h-40 w-72 sm:h-48 sm:w-96" },
  { src: "/media/seidp-laboratorio.webp", alt: "Estudios de laboratorio", size: "h-40 w-56 sm:h-48 sm:w-64" },
  { src: "/media/seidp-prevention-family.webp", alt: "Atención preventiva para familias", size: "h-40 w-80 sm:h-48 sm:w-[420px]" },
] as const;

export default function SeidpAboutNew() {
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  return (
    <PageShell darkHeader>
      <main className="flex flex-col">
        <section className="relative isolate flex min-h-screen items-end overflow-hidden bg-[#082b46] pb-6 pt-36 text-white sm:pb-8">
          <img src="/media/seidp-consulta-medica.webp" alt="Profesional de la salud conversando con una paciente" className="absolute inset-0 h-full w-full object-cover object-center opacity-70" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.72),rgba(8,43,70,.48)_52%,rgba(8,43,70,.12))]" />
          <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
            <PageIntro eyebrow="Nosotros" title="Diagnóstico cercano," italic="decisiones más claras." description="Un centro de salud creado para acercar imagen, laboratorio, prevención y orientación profesional a Coapinole y Puerto Vallarta." dark />
          </div>
        </section>

        <section className="order-1 bg-[#fbfdfe] pb-10 pt-16 sm:pb-12 sm:pt-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[.9fr_1.1fr] lg:items-center lg:gap-20 lg:px-12">
            <div className="overflow-hidden rounded-[24px] bg-[#dceef4]"><img src="/media/seidp-prevention-family.webp" alt="Atención médica y orientación profesional" className="aspect-[4/5] h-full w-full object-cover" loading="lazy" decoding="async" /></div>
            <div>
              <Eyebrow>Nuestra historia</Eyebrow>
              <h2 className="font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] text-[#12395d] sm:text-5xl">Nacimos para acercar estudios confiables a nuestra comunidad.</h2>
              <div className="mt-7 space-y-4 text-[15px] leading-relaxed text-[#597286]">
                <p>Salud e Imagen del Puerto surge en Coapinole con una idea sencilla: reunir servicios de diagnóstico y prevención en un lugar accesible, con atención humana.</p>
                <p>Desde el inicio buscamos que cada persona comprenda su proceso, reciba indicaciones claras y encuentre acompañamiento antes y después de su estudio.</p>
              </div>
              <div className="mt-9 grid grid-cols-2 gap-4 border-t border-[#12395d]/12 pt-6">
                <div><p className="font-display text-3xl font-semibold text-[#0f7065]">Local</p><p className="mt-1 text-xs text-[#597286]">Cerca de Coapinole</p></div>
                <div><p className="font-display text-3xl font-semibold text-[#0f7065]">Integral</p><p className="mt-1 text-xs text-[#597286]">Imagen, laboratorio y prevención</p></div>
              </div>
            </div>
          </div>
        </section>

        <section className="business-gallery order-4 overflow-hidden bg-[#fbfdfe] py-14 sm:py-18" aria-label="Galería de Salud e Imagen del Puerto">
          <div className="mx-auto mb-9 max-w-[1280px] px-5 sm:px-8 lg:px-12">
            <Eyebrow>Nuestro espacio</Eyebrow>
            <p className="max-w-xl text-sm leading-relaxed text-[#597286]">Conoce algunos de los espacios, servicios y momentos que forman parte de nuestro trabajo diario.</p>
          </div>
          {[galleryImages.slice(0, 4), galleryImages.slice(4)].map((row, rowIndex) => (
            <div key={rowIndex} className={`business-gallery-track flex w-max gap-4 py-2 ${rowIndex ? "business-gallery-track--slow" : ""}`}>
              {[...row, ...row].map((image, index) => (
                <button key={`${image.src}-${index}`} type="button" onClick={() => setSelectedImage(image)} className={`group shrink-0 overflow-hidden rounded-[18px] bg-[#dceef4] text-left ${image.size}`} aria-label={`Ampliar: ${image.alt}`}>
                  <img src={image.src} alt="" className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          ))}
          <ImageModal image={selectedImage} onClose={() => setSelectedImage(null)} />
        </section>

        <section className="order-3 bg-[#e8f5f5] py-16 sm:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-12">
            <div>
              <Eyebrow>El compromiso que nos mueve</Eyebrow>
              <h2 className="max-w-xl font-display text-4xl font-semibold leading-[1.05] tracking-[-.05em] text-[#12395d] sm:text-6xl">De nuestra comunidad.<br /><span className="text-[#0f7065] italic">Para nuestra comunidad.</span></h2>
              <Link href="/contacto" className="mt-8 inline-flex items-center gap-4 border-b border-[#0f7065]/30 pb-3 text-xs font-bold text-[#0f7065]">Estamos cerca de ti <ArrowRight className="size-4" /></Link>
            </div>
            <div className="divide-y divide-[#12395d]/15 border-y border-[#12395d]/15">
              <article className="grid grid-cols-[2rem_1fr] gap-4 py-7"><span className="pt-1 text-xs text-[#0f7065]">01</span><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#0f7065]">Nuestra misión · Hoy</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d]">Hacer más cercano el cuidado de tu salud.</h3><p className="mt-3 text-sm leading-relaxed text-[#597286]">Facilitar el acceso a estudios y orientación profesional, con calidad, trato humano e indicaciones claras en cada visita.</p></div></article>
              <article className="grid grid-cols-[2rem_1fr] gap-4 py-7"><span className="pt-1 text-xs text-[#0f7065]">02</span><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#0f7065]">Nuestra visión · Mañana</p><h3 className="mt-3 font-display text-2xl font-semibold tracking-[-.04em] text-[#12395d]">Crecer contigo, seguir cerca.</h3><p className="mt-3 text-sm leading-relaxed text-[#597286]">Ser un referente de salud diagnóstica en Puerto Vallarta, con atención profesional y una comunicación siempre comprensible.</p></div></article>
            </div>
          </div>
        </section>

        <section className="order-2 bg-[#082b46] py-18 text-white sm:py-24">
          <div className="mx-auto grid max-w-[1180px] gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_.9fr] lg:items-center lg:px-12">
            <div>
              <Eyebrow light>Las personas detrás del centro</Eyebrow>
              <h2 className="max-w-xl font-display text-4xl font-semibold leading-[.96] tracking-[-.05em] sm:text-5xl">Un equipo que escucha antes de comenzar.</h2>
              <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/60">Nos tomamos el tiempo de escuchar tus dudas, conocer el motivo de tu visita y explicarte los siguientes pasos con claridad.</p>
              <Link href="/contacto" className="mt-8 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[.14em] text-[#7ab2db]">Conoce dónde estamos <ArrowRight className="size-4" /></Link>
            </div>
            <div className="overflow-hidden rounded-[22px] bg-[#12395d]"><img src="/media/seidp-consulta-medica.webp" alt="Profesional de salud escuchando a una paciente" className="aspect-[4/3] h-full w-full object-cover" loading="lazy" decoding="async" /></div>
          </div>
        </section>

        <section className="order-5 relative overflow-hidden bg-[#082b46] text-white">
          <div className="absolute inset-0 opacity-15"><img src="/media/seidp-contacto-clinica.webp" alt="" className="size-full object-cover" loading="lazy" decoding="async" /></div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,43,70,.98),rgba(8,43,70,.82),rgba(8,43,70,.98))]" />
          <div className="relative mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-7 px-5 py-10 text-center sm:px-8 sm:py-12 lg:flex-row lg:px-12 lg:text-left">
            <div className="max-w-2xl"><p className="text-[9px] font-bold uppercase tracking-[.18em] text-[#7ab2db]">Estamos cerca</p><h2 className="mt-3 font-display text-3xl font-semibold leading-[1.05] tracking-[-.045em] sm:text-4xl">Conversemos sobre lo que necesitas.</h2><p className="mt-3 max-w-xl text-sm leading-relaxed text-white/60">Te orientamos sobre servicios, preparación, horarios y disponibilidad.</p></div>
            <Link href="/contacto" className="group inline-flex shrink-0 items-center gap-4 rounded-full bg-white px-6 py-4 text-[10px] font-bold uppercase tracking-[.12em] text-[#12395d] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#dceef4]">Ir a contacto <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
          </div>
        </section>
      </main>
    </PageShell>
  );
}

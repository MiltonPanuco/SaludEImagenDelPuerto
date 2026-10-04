import { PageShell } from "@/components/SeidpLayout";

export default function SeidpTerms() {
  return (
    <PageShell>
      <main className="mx-auto max-w-[900px] px-5 pb-20 sm:px-8 sm:pb-28">
        <section className="pb-10 pt-32 sm:pb-12 sm:pt-40">
        <h1 className="font-display text-4xl font-semibold leading-[.92] tracking-[-.055em] text-[#12395d] sm:text-6xl">
          Términos y<br />
          <span className="italic text-[#0f7065]">condiciones.</span>
        </h1>
        <p className="mt-7 text-sm text-[#597286]">
          Última actualización: 1 de octubre de 2026
        </p>
        </section>
        <div className="space-y-10 border-t border-[#12395d]/15 pt-10 text-[15px] leading-[1.8] text-[#597286] [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-[#12395d] [&_p]:mt-3">
          <section>
            <h2>1. Aceptación</h2>
            <p>
              Al navegar por este sitio aceptas estos términos y condiciones. Si
              no estás de acuerdo, deja de utilizarlo. El sitio pertenece a
              Salud e Imagen del Puerto, con domicilio en Puerto
              Vallarta, Jalisco, México.
            </p>
          </section>
          <section>
            <h2>2. Finalidad informativa</h2>
            <p>
              El contenido presenta información general sobre servicios de
              imagen, laboratorio, prevención y atención médica. No constituye
              diagnóstico, prescripción ni consejo médico y no sustituye la
              valoración de un profesional de la salud.
            </p>
          </section>
          <section>
            <h2>3. Urgencias</h2>
            <p>
              Este sitio y sus canales digitales no son servicios de emergencia.
              Ante una urgencia médica llama al 911 o acude de inmediato al
              servicio de urgencias más cercano.
            </p>
          </section>
          <section>
            <h2>4. Citas, precios y disponibilidad</h2>
            <p>
              Las citas se confirman únicamente por los canales de contacto
              indicados. Precios, promociones, horarios, preparación, cobertura
              y disponibilidad pueden cambiar; deben confirmarse directamente
              con el equipo del centro antes de acudir.
            </p>
          </section>
          <section>
            <h2>5. Uso responsable</h2>
            <p>
              La persona usuaria se compromete a utilizar el sitio de forma
              lícita y a no intentar alterar su funcionamiento, acceder sin
              autorización a sistemas o datos, introducir código malicioso ni
              utilizar el contenido para engañar a terceros.
            </p>
          </section>
          <section>
            <h2>6. Propiedad intelectual</h2>
            <p>
              Los textos, logotipos, elementos gráficos y demás contenido propio
              del sitio están protegidos por la legislación aplicable. No pueden
              reproducirse, modificarse o explotarse comercialmente sin
              autorización previa y por escrito.
            </p>
          </section>
          <section>
            <h2>7. Servicios de terceros</h2>
            <p>
              Los enlaces a WhatsApp y redes sociales llevan a servicios
              administrados por terceros, sujetos a sus propios términos y
              políticas. Salud e Imagen del Puerto no controla su disponibilidad ni el tratamiento
              que esos servicios hagan de la información.
            </p>
          </section>
          <section>
            <h2>8. Cambios y legislación aplicable</h2>
            <p>
              Podemos actualizar estos términos cuando cambien el sitio, los
              servicios o las disposiciones aplicables. La versión vigente será
              la publicada aquí. Cualquier controversia se interpretará conforme
              a las leyes de México y la jurisdicción competente de Jalisco.
            </p>
          </section>
          <section className="rounded-[18px] border border-[#7ab2db]/40 bg-[#e8f5f5] p-6">
            <h2>Nota importante</h2>
            <p>
              Este documento es una base informativa. Valida su versión final
              con asesoría legal especializada antes de publicarlo.
            </p>
          </section>
        </div>
      </main>
    </PageShell>
  );
}

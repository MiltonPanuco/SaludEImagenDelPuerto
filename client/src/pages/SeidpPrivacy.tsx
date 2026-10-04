import { PageShell } from "@/components/SeidpLayout";

export default function SeidpPrivacy() {
  return (
    <PageShell>
      <main className="mx-auto max-w-[900px] px-5 pb-20 sm:px-8 sm:pb-28">
        <section className="pb-10 pt-32 sm:pb-12 sm:pt-40">
          <h1 className="font-display text-4xl font-semibold leading-[.92] tracking-[-.055em] text-[#12395d] sm:text-6xl">
            Aviso de
            <br />
            <span className="italic text-[#0f7065]">privacidad.</span>
          </h1>
          <p className="mt-7 text-sm text-[#597286]">
            Última actualización: 1 de octubre de 2026
          </p>
        </section>
        <div className="space-y-10 border-t border-[#12395d]/15 pt-10 text-[15px] leading-[1.8] text-[#597286] [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-[#12395d] [&_p]:mt-3">
          <section>
            <h2>1. Responsable del tratamiento</h2>
            <p>
              Salud e Imagen del Puerto, con domicilio en Calle 10 de Mayo #980,
              entre Guatemala y Brasil, Colonia Coapinole, Puerto Vallarta,
              Jalisco, México, es responsable del tratamiento y protección de
              los datos personales que sean proporcionados voluntariamente por
              medios de contacto como WhatsApp o teléfono.
            </p>
          </section>
          <section>
            <h2>2. Datos que podemos recibir</h2>
            <p>
              Podemos recibir datos de identificación, contacto, información del
              estudio solicitado y la ubicación necesaria para coordinar una
              cita. Este sitio no utiliza formularios para solicitar datos
              personales.
            </p>
          </section>
          <section>
            <h2>3. Finalidades</h2>
            <p>
              La información será utilizada para atender solicitudes, coordinar
              citas, confirmar disponibilidad y preparación, prestar los
              servicios solicitados y dar seguimiento a la atención.
            </p>
          </section>
          <section>
            <h2>4. Derechos ARCO</h2>
            <p>
              La persona titular puede ejercer sus derechos de acceso,
              rectificación, cancelación u oposición, así como revocar su
              consentimiento, a través de WhatsApp o teléfono. La solicitud
              deberá incluir nombre, medio para recibir respuesta, descripción
              clara de la petición y documentación que acredite identidad cuando
              sea necesaria.
            </p>
          </section>
          <section>
            <h2>5. Protección y conservación</h2>
            <p>
              Adoptamos medidas administrativas, técnicas y físicas razonables
              para proteger la información contra daño, pérdida, alteración,
              destrucción o acceso no autorizado. Conservaremos los datos
              durante el tiempo necesario para las finalidades descritas y las
              obligaciones legales aplicables.
            </p>
          </section>
          <section>
            <h2>6. Cambios al aviso</h2>
            <p>
              Este aviso puede actualizarse para reflejar cambios operativos,
              legales o de servicio. La versión vigente estará disponible en
              esta página indicando la fecha de actualización.
            </p>
          </section>
          <section className="rounded-[18px] border border-[#7ab2db]/40 bg-[#e8f5f5] p-6">
            <h2>Nota importante</h2>
            <p>
              Este documento es una base informativa. Valida su versión final
              con asesoría legal especializada en protección de datos personales
              en México antes de publicarlo.
            </p>
          </section>
        </div>
      </main>
    </PageShell>
  );
}

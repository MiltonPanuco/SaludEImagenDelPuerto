import { PageShell } from "@/components/SeidpLayout";
import {localized, useSanityPage} from "@/sanity";

export default function SeidpPrivacy() {
  const {page, section, language} = useSanityPage("page-privacy");
  const content = section("contenido");
  const note = section("nota-importante");
  return (
    <PageShell>
      <main className="mx-auto max-w-[900px] px-5 pb-20 sm:px-8 sm:pb-28">
        <section className="pb-10 pt-32 sm:pb-12 sm:pt-40">
          <h1 className="font-display text-4xl font-semibold leading-[.92] tracking-[-.055em] text-[#12395d] sm:text-6xl">
            {localized(page?.hero?.title, language, "Aviso de")}
            <br />
            <span className="italic text-[#0f7065]">{localized(page?.hero?.highlight, language, "privacidad.")}</span>
          </h1>
          <p className="mt-7 text-sm text-[#597286]">
            {localized(page?.hero?.description, language, "Última actualización: 1 de octubre de 2026")}
          </p>
        </section>
        <div className="space-y-10 border-t border-[#12395d]/15 pt-10 text-[15px] leading-[1.8] text-[#597286] [&_h2]:font-display [&_h2]:text-3xl [&_h2]:font-semibold [&_h2]:text-[#12395d] [&_p]:mt-3">
          {content?.items?.map(item => (
            <section key={item.key}>
              <h2>{localized(item.title, language)}</h2>
              <p>{localized(item.description, language)}</p>
            </section>
          ))}
          <section className="rounded-[18px] border border-[#7ab2db]/40 bg-[#e8f5f5] p-6">
            <h2>{localized(note?.title, language, "Nota importante")}</h2>
            <p>{localized(note?.description, language, "Este documento es una base informativa. Valida su versión final con asesoría legal especializada en protección de datos personales en México antes de publicarlo.")}</p>
          </section>
        </div>
      </main>
    </PageShell>
  );
}

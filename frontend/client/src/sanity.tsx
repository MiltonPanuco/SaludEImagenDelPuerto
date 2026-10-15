import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {services as fallbackServices, type Service} from "@/serviceData";
import {useSiteLanguage, type SiteLanguage} from "@/i18n";

const PROJECT_ID = "g21lyvbs";
const DATASET = "production";
const CONTENT_URL = "/api/content";

export type Localized = {es?: string; en?: string};
export type SanityImage = {
  es?: {alt?: string; asset?: {_ref?: string}};
  en?: {alt?: string; asset?: {_ref?: string}};
};
export type ContentCard = {
  key?: string;
  title?: Localized;
  description?: Localized;
  image?: SanityImage;
  action?: {label?: Localized; href?: string};
};
export type ContentSection = ContentCard & {eyebrow?: Localized; items?: ContentCard[]};
export type PageDocument = {
  _id: string;
  _type: "homePage" | "aboutPage" | "servicesPage" | "preventionPage" | "contactPage" | "privacyPage" | "termsPage";
  seo?: {title?: Localized; description?: Localized; image?: SanityImage};
  hero?: {
    eyebrow?: Localized;
    title?: Localized;
    highlight?: Localized;
    description?: Localized;
    image?: SanityImage;
    action?: {label?: Localized; href?: string};
  };
  sections?: ContentSection[];
};
export type SiteSettings = {
  _id: "site-settings";
  _type: "siteSettings";
  navigation?: Record<string, Localized>;
  contact?: {
    address?: Localized;
    appointmentPhone?: string;
    urgencyPhone?: string;
    whatsapp?: string;
    whatsappMessage?: Localized;
    mapUrl?: string;
    socialLinks?: Array<{name?: string; url?: string}>;
  };
  hours?: Array<{days?: Localized; schedule?: string}>;
  footer?: Record<string, Localized>;
};
type ServiceDocument = {
  _id: string;
  _type: "service";
  slug?: {current?: string};
  order?: number;
  active?: boolean;
  title?: Localized;
  summary?: Localized;
  introduction?: Localized;
  image?: SanityImage;
  highlights?: Localized[];
  catalogTitle?: Localized;
  catalog?: Localized[];
  process?: Array<{title?: Localized; description?: Localized}>;
};

type SanityContent = {
  documents: Array<PageDocument | SiteSettings | ServiceDocument>;
  error: string | null;
};

const ContentContext = createContext<SanityContent>({documents: [], error: null});

export function resolveSanityImageUrl(reference?: string) {
  const match = reference?.match(/^image-([a-f0-9]+)-(\d+x\d+)-([a-z0-9]+)$/i);
  return match
    ? `https://cdn.sanity.io/images/${PROJECT_ID}/${DATASET}/${match[1]}-${match[2]}.${match[3]}`
    : undefined;
}

export function localized(value: Localized | undefined, language: SiteLanguage, fallback = "") {
  return value?.[language]?.trim() || value?.es?.trim() || fallback;
}

export function localizedImage(
  value: SanityImage | undefined,
  language: SiteLanguage,
  fallback: {src: string; alt: string}
) {
  const selected = value?.[language] ?? value?.es;
  return {
    src: resolveSanityImageUrl(selected?.asset?._ref) ?? fallback.src,
    alt: selected?.alt?.trim() || fallback.alt,
  };
}

export function SanityProvider({children}: {children: ReactNode}) {
  const [content, setContent] = useState<SanityContent>({documents: [], error: null});

  useEffect(() => {
    const controller = new AbortController();
    fetch(CONTENT_URL, {signal: controller.signal})
      .then(response => {
        if (!response.ok) throw new Error(`Sanity respondió ${response.status}`);
        return response.json() as Promise<{result?: SanityContent["documents"]}>;
      })
      .then(payload => setContent({documents: payload.result ?? [], error: null}))
      .catch(error => {
        if (error instanceof DOMException && error.name === "AbortError") return;
        console.error("No se pudo cargar el contenido de Sanity.", error);
        setContent({documents: [], error: "No se pudo cargar el contenido de Sanity."});
      });
    return () => controller.abort();
  }, []);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export function useSanityDocument<T>(id: string) {
  const {documents} = useContext(ContentContext);
  return documents.find(document => document._id === id) as T | undefined;
}

export function useSanityPage(id: string) {
  const language = useSiteLanguage();
  const page = useSanityDocument<PageDocument>(id);
  const section = (key: string) => page?.sections?.find(item => item.key === key);
  return {page, section, language};
}

export function useSiteSettings() {
  return useSanityDocument<SiteSettings>("site-settings");
}

export function useServices(): readonly Service[] {
  const language = useSiteLanguage();
  const {documents} = useContext(ContentContext);
  return useMemo(() => {
    const remote = documents
      .filter((document): document is ServiceDocument => {
        if (!("_type" in document) || document._type !== "service") return false;
        return document.active !== false;
      })
      .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
    if (!remote.length) return fallbackServices;
    return remote.flatMap(document => {
      const slug = document.slug?.current;
      const fallback = fallbackServices.find(service => service.slug === slug);
      if (!slug || !fallback) return [];
      const remoteImage = localizedImage(document.image, language, {src: fallback.image, alt: fallback.alt});
      return [{
        ...fallback,
        title: localized(document.title, language, fallback.title),
        short: localized(document.summary, language, fallback.short),
        intro: localized(document.introduction, language, fallback.intro),
        image: remoteImage.src,
        alt: remoteImage.alt,
        highlights: document.highlights?.map(value => localized(value, language)).filter(Boolean) ?? fallback.highlights,
        catalogTitle: localized(document.catalogTitle, language, fallback.catalogTitle),
        catalog: document.catalog?.map(value => localized(value, language)).filter(Boolean) ?? fallback.catalog,
        process: document.process?.map(step => [localized(step.title, language), localized(step.description, language)] as const).filter(([title, description]) => title && description) ?? fallback.process,
      }];
    });
  }, [documents, language]);
}

import {
  lazy,
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { Route, Router as WouterRouter, Switch, useLocation } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import {
  SanityProvider,
  localized,
  localizedImage,
  useSanityDocument,
  useServices,
  type PageDocument,
} from "./sanity";
import {
  LANGUAGE_CHANGE_START_EVENT,
  localizeText,
  TranslationLayer,
  useSiteLanguage,
} from "./i18n";

const NotFound = lazy(() => import("./pages/NotFound"));
const SeidpHome = lazy(() => import("./pages/SeidpHome"));
const SeidpServices = lazy(() => import("./pages/SeidpServicesHub"));
const SeidpServiceDetail = lazy(() => import("./pages/SeidpServiceDetail"));
const SeidpPrevention = lazy(() => import("./pages/SeidpPreventionNew"));
const SeidpAbout = lazy(() => import("./pages/SeidpAboutNew"));
const SeidpContact = lazy(() => import("./pages/SeidpContactNew"));
const SeidpPrivacy = lazy(() => import("./pages/SeidpPrivacy"));
const SeidpTerms = lazy(() => import("./pages/SeidpTerms"));

const pageTitles: Record<string, string> = {
  "/": "Salud e Imagen del Puerto | Inicio",
  "/servicios": "Salud e Imagen del Puerto | Servicios",
  "/prevencion": "Salud e Imagen del Puerto | Prevención",
  "/nosotros": "Salud e Imagen del Puerto | Nosotros",
  "/contacto": "Salud e Imagen del Puerto | Contacto",
  "/aviso-de-privacidad": "Salud e Imagen del Puerto | Aviso de privacidad",
  "/terminos-y-condiciones":
    "Salud e Imagen del Puerto | Términos y condiciones",
};
const pageIds: Record<string, string> = {
  "/": "page-home",
  "/servicios": "page-services",
  "/prevencion": "page-prevention",
  "/nosotros": "page-about",
  "/contacto": "page-contact",
  "/aviso-de-privacidad": "page-privacy",
  "/terminos-y-condiciones": "page-terms",
};

const siteDescriptions = {
  es: "Salud e Imagen del Puerto: diagnóstico por imagen, laboratorio, prevención y atención médica en Coapinole, Puerto Vallarta.",
  en: "Salud e Imagen del Puerto: diagnostic imaging, laboratory testing, prevention, and medical care in Coapinole, Puerto Vallarta.",
} as const;

function setMeta(attribute: "name" | "property", key: string, content: string) {
  let meta = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`
  );
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    document.head.append(meta);
  }
  meta.content = content;
}

function setLink(rel: string, href: string, hreflang?: string) {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let link = document.head.querySelector<HTMLLinkElement>(selector);
  if (!link) {
    link = document.createElement("link");
    link.rel = rel;
    if (hreflang) link.hreflang = hreflang;
    document.head.append(link);
  }
  link.href = href;
}

function RouteEffects() {
  const [location] = useLocation();
  const language = useSiteLanguage();
  const initialRoute = useRef(true);
  const navigationId = useRef(0);
  const [routeLoading, setRouteLoading] = useState(false);
  const services = useServices();
  const page = useSanityDocument<PageDocument>(pageIds[location]);

  useEffect(() => {
    const showLanguageLoading = () => {
      navigationId.current++;
      document.documentElement.classList.add("is-route-loading");
      setRouteLoading(true);
    };
    window.addEventListener(LANGUAGE_CHANGE_START_EVENT, showLanguageLoading);
    return () =>
      window.removeEventListener(
        LANGUAGE_CHANGE_START_EVENT,
        showLanguageLoading
      );
  }, []);

  useLayoutEffect(() => {
    const service = services.find(item => location === `/servicios/${item.slug}`);
    const title = service
      ? `Salud e Imagen del Puerto | ${localizeText(service.title, language)}`
      : localized(page?.seo?.title, language, localizeText(
        pageTitles[location] ?? "Salud e Imagen del Puerto | Página no encontrada",
        language
      ));
    const description = localized(page?.seo?.description, language, siteDescriptions[language]);
    const socialImage = localizedImage(page?.seo?.image, language, {
      src: "/brand/logo-fondo-blanco.webp",
      alt: "Salud e Imagen del Puerto",
    });
    const route = location === "/" ? "/" : location;
    const localizedPath = `/${language}${route}`;
    const spanishPath = `/es${route}`;
    const englishPath = `/en${route}`;
    const canonicalUrl = new URL(localizedPath, window.location.origin).href;

    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", canonicalUrl);
    setMeta("property", "og:locale", language === "es" ? "es_MX" : "en_US");
    setMeta("property", "og:type", "website");
    setMeta(
      "property",
      "og:image",
      new URL(socialImage.src, window.location.origin).href
    );
    setMeta("name", "twitter:card", "summary_large_image");
    setLink("canonical", canonicalUrl);
    setLink("alternate", new URL(spanishPath, window.location.origin).href, "es");
    setLink("alternate", new URL(englishPath, window.location.origin).href, "en");
    setLink("alternate", new URL(spanishPath, window.location.origin).href, "x-default");
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.classList.remove("service-scroll-snap");
    root.style.scrollBehavior = "auto";
    root.scrollTop = 0;
    document.body.scrollTop = 0;
    root.style.scrollBehavior = previousScrollBehavior;
  }, [language, location, page, services]);

  useEffect(() => {
    if (initialRoute.current) {
      initialRoute.current = false;
      return;
    }

    const currentNavigation = ++navigationId.current;
    const root = document.documentElement;
    const images = Array.from(
      document.querySelectorAll<HTMLImageElement>(
        'main > section:first-of-type img:not([loading="lazy"]), [data-shared-scroll-background] img'
      )
    );
    const waitForImage = (image: HTMLImageElement) => {
      if (image.complete) return image.decode?.().catch(() => undefined);
      return new Promise<void>(resolve => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });
    };
    root.classList.add("is-route-loading");
    setRouteLoading(true);

    Promise.allSettled([document.fonts.ready, ...images.map(waitForImage)]).then(
      () => {
        if (navigationId.current !== currentNavigation) return;
        window.setTimeout(() => {
          if (navigationId.current !== currentNavigation) return;
          root.classList.remove("is-route-loading");
          setRouteLoading(false);
        }, 250);
      }
    );

    return undefined;
  }, [language, location]);

  return (
    <div
      id="route-loading-screen"
      className={`app-loading-screen ${routeLoading ? "" : "app-loading-screen--leaving"}`}
      role="status"
      aria-label="Cargando nueva página"
      aria-hidden={!routeLoading}
    >
      <div className="app-loading-screen__content">
        <img
          className="app-loading-spinner"
          src="/spinner-loading.svg"
          alt=""
        />
      </div>
    </div>
  );
}

function AppRoutes() {
  const [location] = useLocation();

  return (
    <Suspense fallback={null}>
      <Switch key={location}>
        <Route path={"/"} component={SeidpHome} />
        <Route path={"/servicios"} component={SeidpServices} />
        <Route path={"/servicios/:slug"} component={SeidpServiceDetail} />
        <Route path={"/prevencion"} component={SeidpPrevention} />
        <Route path={"/nosotros"} component={SeidpAbout} />
        <Route path={"/contacto"} component={SeidpContact} />
        <Route path={"/aviso-de-privacidad"} component={SeidpPrivacy} />
        <Route path={"/terminos-y-condiciones"} component={SeidpTerms} />
        <Route path={"/404"} component={NotFound} />
        {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const language = useSiteLanguage();

  return (
    <SanityProvider>
      <WouterRouter base={`/${language}`}>
        <ErrorBoundary>
          <TranslationLayer />
          <RouteEffects />
          <AppRoutes />
        </ErrorBoundary>
      </WouterRouter>
    </SanityProvider>
  );
}

export default App;

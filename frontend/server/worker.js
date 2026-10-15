const metadata = {
  es: {
    title: "Salud e Imagen del Puerto | Diagnóstico y prevención",
    description:
      "Salud e Imagen del Puerto: diagnóstico por imagen, laboratorio, prevención y atención médica en Coapinole, Puerto Vallarta.",
    locale: "es_MX",
  },
  en: {
    title: "Salud e Imagen del Puerto | Diagnostic imaging and prevention",
    description:
      "Salud e Imagen del Puerto: diagnostic imaging, laboratory testing, prevention, and medical care in Coapinole, Puerto Vallarta.",
    locale: "en_US",
  },
};

export const indexedRoutes = [
  "/",
  "/servicios",
  "/servicios/radiografias",
  "/servicios/ultrasonidos",
  "/servicios/electrocardiogramas",
  "/servicios/laboratorio-clinico",
  "/servicios/consulta-medica",
  "/servicios/biopsias-guiadas",
  "/servicios/consulta-nutricional",
  "/prevencion",
  "/nosotros",
  "/contacto",
  "/aviso-de-privacidad",
  "/terminos-y-condiciones",
];

const sanityQuery =
  '*[_type in ["siteSettings","homePage","aboutPage","servicesPage","preventionPage","contactPage","privacyPage","termsPage","service"]]';
export const sanityContentUrl = `https://g21lyvbs.api.sanity.io/v2026-10-14/data/query/production?query=${encodeURIComponent(sanityQuery)}`;
const securityHeaders = {
  "content-security-policy": "default-src 'self'; base-uri 'self'; connect-src 'self' https://api.mapbox.com https://events.mapbox.com; font-src 'self' data: https://fonts.gstatic.com; frame-ancestors 'none'; img-src 'self' data: blob: https://api.mapbox.com https://cdn.sanity.io; manifest-src 'self'; object-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; worker-src 'self' blob:; upgrade-insecure-requests",
  "permissions-policy": "camera=(), geolocation=(), microphone=(), payment=(), usb=()",
  "referrer-policy": "strict-origin-when-cross-origin",
  "strict-transport-security": "max-age=63072000; includeSubDomains",
  "x-content-type-options": "nosniff",
  "x-frame-options": "DENY",
};

export function sitemap(origin) {
  const urls = ["es", "en"]
    .flatMap(language =>
      indexedRoutes.map(route => new URL(`/${language}${route}`, origin).href)
    )
    .map(url => `  <url><loc>${url}</loc></url>`)
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const local = ["localhost", "127.0.0.1", "[::1]"].includes(url.hostname);
    if (url.protocol === "http:" && !local) {
      url.protocol = "https:";
      return Response.redirect(url.href, 308);
    }
    if (url.pathname === "/api/content") {
      const response = await fetch(sanityContentUrl, {
        headers: { accept: "application/json" },
        cf: { cacheEverything: true, cacheTtl: 60 },
      });
      if (!response.ok) {
        return Response.json(
          { error: "No fue posible consultar el contenido." },
          { status: 502 }
        );
      }
      return new Response(response.body, {
        headers: {
          "cache-control": "public, max-age=60, stale-while-revalidate=300",
          "content-type": "application/json; charset=utf-8",
        },
      });
    }
    if (url.pathname === "/sitemap.xml") {
      return new Response(sitemap(url.origin), {
        headers: {
          "cache-control": "public, max-age=3600",
          "content-type": "application/xml; charset=utf-8",
        },
      });
    }
    if (url.pathname === "/robots.txt") {
      return new Response(
        `User-agent: *\nAllow: /\nSitemap: ${url.origin}/sitemap.xml\n`,
        { headers: { "content-type": "text/plain; charset=utf-8" } }
      );
    }
    const language =
      url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "es";
    const values = metadata[language];
    const response = await env.ASSETS.fetch(request);

    if (!response.headers.get("content-type")?.includes("text/html")) {
      return response;
    }

    const transformed = new HTMLRewriter()
      .on("html", {
        element(element) {
          element.setAttribute("lang", language);
        },
      })
      .on("title", {
        element(element) {
          element.setInnerContent(values.title);
        },
      })
      .on('meta[name="description"]', {
        element(element) {
          element.setAttribute("content", values.description);
        },
      })
      .on('meta[property="og:title"], meta[name="twitter:title"]', {
        element(element) {
          element.setAttribute("content", values.title);
        },
      })
      .on('meta[property="og:description"], meta[name="twitter:description"]', {
        element(element) {
          element.setAttribute("content", values.description);
        },
      })
      .on('meta[property="og:locale"]', {
        element(element) {
          element.setAttribute("content", values.locale);
        },
      })
      .on('meta[property="og:url"]', {
        element(element) {
          element.setAttribute("content", url.href);
        },
      })
      .on('meta[property="og:image"], meta[name="twitter:image"]', {
        element(element) {
          element.setAttribute(
            "content",
            new URL("/brand/logo-fondo-blanco.webp", url.origin).href
          );
        },
      })
      .transform(response);
    const secured = new Response(transformed.body, transformed);
    for (const [name, value] of Object.entries(securityHeaders)) {
      secured.headers.set(name, value);
    }
    return secured;
  },
};

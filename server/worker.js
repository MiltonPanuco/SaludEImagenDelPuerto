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

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const language =
      url.pathname === "/en" || url.pathname.startsWith("/en/") ? "en" : "es";
    const values = metadata[language];
    const response = await env.ASSETS.fetch(request);

    if (!response.headers.get("content-type")?.includes("text/html")) {
      return response;
    }

    return new HTMLRewriter()
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
      .on(
        'meta[property="og:description"], meta[name="twitter:description"]',
        {
          element(element) {
            element.setAttribute("content", values.description);
          },
        }
      )
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
            new URL("/media/seidp-hero-main.webp", url.origin).href
          );
        },
      })
      .transform(response);
  },
};

// Run with the dev server active: node scripts/check-pages.mjs
// PLAYWRIGHT_MODULE can point to an already-installed Playwright package.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const { chromium } = createRequire(import.meta.url)(
  process.env.PLAYWRIGHT_MODULE || "playwright"
);
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const base = process.env.BASE_URL || "http://localhost:3000";
const screenshots = process.env.QA_SCREENSHOTS;
if (screenshots) await mkdir(screenshots, { recursive: true });

try {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${base}/contacto`);
  const loadingScreen = page.getByRole("status", {
    name: "Cargando Salud e Imagen del Puerto",
  });
  await loadingScreen.waitFor();
  assert.equal(
    await loadingScreen.locator('[data-spinner="4"]').count(),
    1,
    "Initial loading screen uses spinner 4"
  );
  assert.equal(
    await loadingScreen.locator('[data-spinner="4"]').getAttribute("src"),
    "/spinner-loading.svg",
    "Initial loading screen uses the renamed spinner asset"
  );
  assert.equal(
    await page.evaluate(() => getComputedStyle(document.documentElement).overflow),
    "hidden",
    "Initial loading screen prevents scrolling"
  );
  await loadingScreen.waitFor({ state: "detached", timeout: 2500 });
  assert.equal(
    await page.evaluate(() => location.pathname),
    "/es/contacto",
    "Legacy URLs normalize to the Spanish route tree"
  );
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    `${base}/es/contacto`,
    "Spanish routes publish their canonical URL"
  );
  assert.deepEqual(
    await page.locator('link[rel="alternate"][hreflang]').evaluateAll(links =>
      Object.fromEntries(
        links.map(link => [link.getAttribute("hreflang"), link.getAttribute("href")])
      )
    ),
    {
      es: `${base}/es/contacto`,
      en: `${base}/en/contacto`,
      "x-default": `${base}/es/contacto`,
    },
    "Localized routes expose es, en, and x-default alternates"
  );
  assert.notEqual(
    await page.evaluate(() => getComputedStyle(document.documentElement).overflow),
    "hidden",
    "Scrolling returns after real page load"
  );
  await page.evaluate(() => window.scrollTo(0, 600));
  await page.reload();
  await loadingScreen.waitFor();
  await loadingScreen.waitFor({ state: "detached", timeout: 2500 });
  assert.equal(await page.evaluate(() => scrollY), 0, "Reload starts at the top");
  const trigger = page
    .getByRole("navigation", { name: "Navegación principal", exact: true })
    .getByRole("button", { name: "Servicios" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const submenu = page.getByRole("navigation", {
    name: "Submenú de servicios",
    exact: true,
  });
  await submenu.waitFor();
  const routes = await submenu
    .locator("a")
    .evaluateAll(links =>
      links.map(link => link.getAttribute("href").replace(/^\/es(?=\/)/, ""))
    );
  const serviceTitles = await submenu
    .locator("a")
    .evaluateAll(links =>
      Object.fromEntries(
        links.map(link => [link.getAttribute("href"), link.textContent.trim()])
      )
    );
  assert.equal(routes.length, 7);
  const popup = page.getByRole("dialog", { name: "Servicios del centro" });
  for (const scrollY of [0, 420, 0]) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForFunction(() => {
      const header = document.querySelector("header").getBoundingClientRect();
      const menu = document
        .querySelector('[data-slot="popover-content"]')
        .getBoundingClientRect();
      return Math.abs(header.bottom - menu.top) < 1;
    });
    const bounds = await popup.boundingBox();
    assert.ok(
      bounds.width <= 520 && bounds.height < 320,
      "Submenu stays compact"
    );
    await page.waitForFunction(scrolled => {
      const logo = document.querySelector(
        'header a[aria-label="Salud e Imagen del Puerto, inicio"]'
      );
      return (
        getComputedStyle(logo.querySelector(":scope > img")).opacity ===
          (scrolled ? "0" : "1") &&
        getComputedStyle(logo.querySelector(":scope > span")).opacity ===
          (scrolled ? "1" : "0")
      );
    }, scrollY > 24);
    for (const source of ["logo-simbolo.webp", "logo-letras.webp"]) {
      assert.ok(
        await page
          .locator(`header img[src$="${source}"]`)
          .evaluate(img => img.complete && img.naturalWidth > 0)
      );
    }
    if (scrollY > 24) {
      const logo = page.locator(
        'header a[aria-label="Salud e Imagen del Puerto, inicio"]'
      );
      const letters = logo
        .locator('img[src$="logo-letras.webp"]')
        .locator("..");
      await logo.hover();
      await page.waitForFunction(
        element => getComputedStyle(element).opacity === "1",
        await letters.elementHandle()
      );
      await page.mouse.move(700, 500);
      await page.waitForFunction(
        element => getComputedStyle(element).opacity === "0",
        await letters.elementHandle()
      );
    }
  }
  if (screenshots)
    await page.screenshot({
      path: `${screenshots}/header.png`,
      animations: "disabled",
    });
  await page.keyboard.press("Escape");
  await submenu.waitFor({ state: "hidden" });
  assert.equal(
    await trigger.evaluate(element => element === document.activeElement),
    true
  );
  await trigger.click();
  await submenu
    .getByRole("link", { name: "Radiografías", exact: true })
    .click();
  await page.waitForURL("**/servicios/radiografias");
  await submenu.waitFor({ state: "hidden" });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForFunction(() => scrollY > innerHeight);
  await page
    .getByRole("navigation", { name: "Navegación principal", exact: true })
    .getByRole("link", { name: "Contacto", exact: true })
    .click();
  await page.waitForURL("**/contacto");
  await page.getByRole("heading", { name: /Hablemos/i, level: 1 }).waitFor();
  assert.equal(
    await page.evaluate(() => scrollY),
    0,
    "Route changes return to the top without smooth scrolling through sections"
  );
  await page.route(
    "**/media/seidp-consulta-medica.webp",
    async route => {
      await new Promise(resolve => setTimeout(resolve, 350));
      await route.continue();
    },
    { times: 1 }
  );
  await page
    .getByRole("navigation", { name: "Navegación principal", exact: true })
    .getByRole("link", { name: "Nosotros", exact: true })
    .click();
  await page.waitForURL("**/nosotros");
  const routeLoadingScreen = page.getByRole("status", {
    name: "Cargando nueva página",
  });
  await routeLoadingScreen.waitFor({ state: "visible" });
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.classList.contains("is-route-loading")
    ),
    true,
    "Slow route media activates the loading screen and scroll lock"
  );
  assert.deepEqual(
    await page.locator(".hero-copy > h1, .section-reveal-auto").evaluateAll(
      elements => elements.map(element => getComputedStyle(element).animationPlayState)
    ),
    ["paused", "paused"],
    "Automatic entry animations pause behind the route loader"
  );
  await routeLoadingScreen.waitFor({ state: "hidden" });
  assert.equal(
    await page.evaluate(() =>
      document.documentElement.classList.contains("is-route-loading")
    ),
    false,
    "Route loading screen leaves as soon as critical media is ready"
  );
  assert.deepEqual(
    await page.locator(".hero-copy > h1, .section-reveal-auto").evaluateAll(
      elements => elements.map(element => getComputedStyle(element).animationPlayState)
    ),
    ["running", "running"],
    "Automatic entry animations resume when the route is visible"
  );

  for (const [width, height] of [
    [360, 700],
    [768, 900],
    [1440, 1000],
  ]) {
    await page.setViewportSize({ width, height });
    for (const route of [
      "/",
      "/servicios",
      "/prevencion",
      "/contacto",
      "/nosotros",
      "/terminos-y-condiciones",
      "/aviso-de-privacidad",
      ...routes,
    ]) {
      await page.goto(`${base}/es${route}`);
      await page.locator("main h1").waitFor();
      await page.evaluate(() => document.fonts.ready);
      if (width < 1024) {
        const mobileLogo = page.locator(
          'header a[aria-label="Salud e Imagen del Puerto, inicio"]'
        );
        for (const source of ["logo-simbolo.webp", "logo-letras.webp"]) {
          const layer = mobileLogo
            .locator(`img[src$="${source}"]`)
            .locator("..");
          assert.equal(
            await layer.evaluate(element => getComputedStyle(element).opacity),
            "1",
            `${source} remains visible with the hamburger menu`
          );
        }
        assert.equal(
          await page
            .locator('header button[aria-label="Change to English"]')
            .isHidden(),
          true,
          "Language control moves out of the compact header"
        );
        assert.equal(
          await page
            .getByRole("button", { name: "Abrir menú", exact: true })
            .evaluate(element => getComputedStyle(element).borderRadius),
          "0px",
          "Hamburger control is square"
        );
      }
      assert.equal(await page.locator("main h1").count(), 1, route);
      if (["/nosotros", "/contacto", "/prevencion", "/servicios"].includes(route)) {
        assert.equal(
          await page
            .locator("main > section")
            .first()
            .locator(".hero-copy > h1")
            .evaluate(element => getComputedStyle(element).animationName),
          "hero-copy-in",
          `${route}: first section uses its dedicated automatic animation`
        );
        assert.equal(
          await page
            .locator("main > section")
            .first()
            .locator(".section-reveal")
            .count(),
          0,
          `${route}: first section is not hidden by the scroll reveal system`
        );
        assert.equal(
          await page
            .locator("main > section")
            .nth(1)
            .locator(".section-reveal-auto")
            .evaluate(element => getComputedStyle(element).animationName),
          "section-auto-in",
          `${route}: first content section enters automatically`
        );
      }
      const hero = await page.locator("main > section").first().boundingBox();
      if (!route.includes("privacidad") && !route.includes("terminos")) {
        const expectedRatio = route === "/" ? 1 : width < 768 ? 0.68 : 0.72;
        assert.ok(
          Math.abs(hero.height - height * expectedRatio) < 2,
          `${route}: hero height`
        );
      }
      assert.doesNotMatch(
        await page.locator("main h1").innerText(),
        /mereceverse|tambiénes/i,
        `${route}: heading words stay separated`
      );
      if (route === "/") {
        assert.deepEqual(
          await page
            .locator(".hero-enter")
            .evaluateAll(elements =>
              elements.map(element => getComputedStyle(element).animationName)
            ),
          ["hero-copy-in", "hero-copy-in"],
          "Home: hero actions and right note animate in"
        );
        const sharedBackground = page.locator(
          '[data-shared-scroll-background="home"]'
        );
        const heroImage = sharedBackground.locator("img");
        const initialTransform = await heroImage.evaluate(
          element => getComputedStyle(element).transform
        );
        await page.evaluate(() => window.scrollTo(0, 400));
        await page.waitForFunction(
          () =>
            Math.abs(
              document.querySelector("[data-home-hero]").getBoundingClientRect()
                .height - innerHeight
            ) < 2
        );
        await page.waitForFunction(
          initial =>
            getComputedStyle(
              document.querySelector(
                '[data-shared-scroll-background="home"] img'
              )
            ).transform !== initial,
          initialTransform
        );
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForFunction(
          () =>
            Math.abs(
              document.querySelector("[data-home-hero]").getBoundingClientRect()
                .height - innerHeight
            ) < 2
        );
        assert.equal(
          await page
            .getByRole("link", { name: "Agendar una consulta", exact: true })
            .getAttribute("href"),
          "/es/contacto"
        );
        const servicesSectionY = (
          await page
            .getByText("Servicios principales", { exact: true })
            .locator("xpath=ancestor::section")
            .boundingBox()
        ).y;
        const visitSectionY = (
          await page
            .getByText("Una visita más sencilla", { exact: true })
            .locator("xpath=ancestor::section")
            .boundingBox()
        ).y;
        assert.ok(
          servicesSectionY < visitSectionY,
          "Home: Servicios principales comes before Una visita más sencilla"
        );
        assert.equal(
          await sharedBackground
            .locator('img[src="/media/seidp-hero-main.webp"]')
            .count(),
          1,
          "Home: hero and stats share one image element"
        );
        await page.locator("footer").scrollIntoViewIfNeeded();
        await page.waitForFunction(
          element => getComputedStyle(element).visibility === "hidden",
          await sharedBackground.elementHandle()
        );
        await page.evaluate(() => window.scrollTo(0, 0));
      }
      if (route === "/contacto") {
        assert.equal(
          await page
            .locator('a[href="#hablar"]')
            .evaluate(element => getComputedStyle(element).animationName),
          "hero-copy-in",
          "Contact: hero CTA animates in"
        );
        const photo = page.locator("main > section").first().locator("img");
        await photo.evaluate(img => img.decode());
        const bounds = await photo.boundingBox();
        assert.ok(
          Math.abs(bounds.width - hero.width) < 1 &&
            Math.abs(bounds.height - hero.height) < 1,
          `${route}: background covers hero`
        );
      }
      for (const src of await page
        .locator("main img")
        .evaluateAll(images => images.map(img => img.getAttribute("src")))) {
        assert.ok(
          src.startsWith("/media/"),
          `${route}: photo must use local assets`
        );
      }
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > innerWidth
      );
      assert.equal(overflow, false, `${route} overflows at ${width}px`);
      if (route.startsWith("/servicios/")) {
        assert.equal(
          await page
            .locator('a[href="#estudios"]')
            .locator("..")
            .evaluate(element => getComputedStyle(element).animationName),
          "hero-copy-in",
          `${route}: hero CTA animates in`
        );
        const serviceBackground = page.locator(
          '[data-shared-scroll-background^="servicio-"]'
        );
        assert.equal(
          await serviceBackground.count(),
          1,
          `${route}: hero and visit share one background element`
        );
        assert.equal(
          await page
            .locator("main > section")
            .first()
            .evaluate(
              element => getComputedStyle(element).backgroundColor,
              null
            ),
          "rgba(0, 0, 0, 0)",
          `${route}: shared image remains visible behind the hero overlays`
        );
        assert.equal(
          await page.locator("main > section").first().locator("img").count(),
          0,
          `${route}: hero does not duplicate its shared image`
        );
        assert.equal(
          await page.locator("#visita > img").count(),
          0,
          `${route}: visit does not duplicate its shared image`
        );
        await page
          .getByRole("link", { name: "Ver indicaciones", exact: true })
          .waitFor();
        assert.equal(
          await page
            .getByRole("link", {
              name: "Consultar disponibilidad",
              exact: true,
            })
            .getAttribute("href"),
          "/es/contacto"
        );
        for (const id of ["estudios", "preparacion", "visita"])
          assert.equal(await page.locator(`#${id}`).count(), 1);
        assert.equal(
          await page
            .getByText("Demos el siguiente paso.", { exact: true })
            .count(),
          0,
          `${route}: redundant contact box removed`
        );
        const journey = page.locator(".service-journey");
        const stage = page.locator(".service-journey-stage");
        assert.ok(
          Math.abs((await journey.boundingBox()).height - height * 4) < 2,
          `${route}: vertical journey provides four full viewports of scroll`
        );
        assert.ok(
          Math.abs((await stage.boundingBox()).height - height) < 2,
          `${route}: horizontal stage fills the viewport`
        );
        assert.equal(
          await page.locator(".service-panels > section").count(),
          4,
          `${route}: every content section participates in the horizontal journey`
        );
        assert.deepEqual(
          await page
            .locator(".service-panel")
            .evaluateAll(panels =>
              panels.map(panel => panel.scrollHeight <= panel.clientHeight + 2)
            ),
          [true, true, true, true],
          `${route}: panels fit within one viewport without internal vertical scroll`
        );
        assert.ok(
          (await page.locator("[data-related-panel-content]").boundingBox())
            .height <=
            height * 0.8,
          `${route}: final related-services panel stays visually compact`
        );
        assert.deepEqual(
          await page.locator("[data-related-panel-content]").evaluate(element => {
            const style = getComputedStyle(element);
            return [style.borderRadius, style.boxShadow];
          }),
          ["0px", "none"],
          `${route}: related services are not wrapped in a card`
        );
        if (
          [
            "/servicios/ultrasonidos",
            "/servicios/laboratorio-clinico",
            "/servicios/biopsias-guiadas",
          ].includes(route)
        ) {
          assert.equal(
            await page
              .locator("#preparacion")
              .getByText("Indicación para tu cita", { exact: true })
              .count(),
            0,
            `${route}: preparation avoids repeated labels`
          );
          if (width >= 768) {
            assert.ok(
              (await page.locator("[data-preparation-image]").boundingBox())
                .height <=
                height * 0.4,
              `${route}: preparation image stays compact below the header`
            );
          }
        }
        if (width === 1440) {
          await journey.evaluate(element =>
            window.scrollTo(
              0,
              element.getBoundingClientRect().top + scrollY + innerHeight
            )
          );
          await page.waitForFunction(() => {
            const transform = getComputedStyle(
              document.querySelector(".service-panels")
            ).transform;
            return (
              transform !== "none" &&
              Math.abs(new DOMMatrix(transform).m41) > innerWidth * 0.8
            );
          });
          assert.equal(
            await page.evaluate(() => document.scrollingElement.scrollTop > 0),
            true,
            `${route}: vertical document scroll drives the horizontal track`
          );
          assert.match(
            await page.evaluate(
              () => getComputedStyle(document.documentElement).scrollSnapType
            ),
            /y mandatory/,
            `${route}: the journey snaps section by section`
          );
          await journey.evaluate(element =>
            window.scrollTo(
              0,
              element.getBoundingClientRect().top + scrollY + innerHeight * 2
            )
          );
          await page.waitForFunction(
            element => getComputedStyle(element).visibility === "visible",
            await serviceBackground.elementHandle()
          );
          await page.locator("footer").scrollIntoViewIfNeeded();
          await page.waitForFunction(
            () =>
              !document.documentElement.classList.contains(
                "service-scroll-snap"
              )
          );
          await page.waitForFunction(
            element => getComputedStyle(element).visibility === "hidden",
            await serviceBackground.elementHandle()
          );
        }
      }
      if (route === "/prevencion") {
        assert.equal(
          await page.locator('[data-slot="accordion"]').count(),
          0,
          "FAQ only lives on Contacto"
        );
        assert.equal(
          await page
            .getByText("Antes de elegir una opción preventiva", { exact: true })
            .count(),
          0,
          "Prevention: final note removed"
        );
        assert.equal(
          await page.getByText("Tu visita", { exact: true }).count(),
          0,
          "Prevention: visit section removed"
        );
        const preventionOrder = await page
          .locator("main section")
          .evaluateAll(sections =>
            sections.map(section => section.textContent)
          );
        assert.ok(
          preventionOrder.findIndex(text =>
            text.includes("Un punto de vista")
          ) <
            preventionOrder.findIndex(text =>
              text.includes("Opciones preventivas")
            )
        );
        assert.ok(
          preventionOrder.findIndex(text =>
            text.includes("Opciones preventivas")
          ) <
            preventionOrder.findIndex(text =>
              text.includes("Prevención con información clara")
            )
        );
        assert.ok(
          preventionOrder.findIndex(text =>
            text.includes("Prevención con información clara")
          ) <
            preventionOrder.findIndex(text =>
              text.includes("Beneficios de orientarte")
            )
        );
        assert.equal(
          await page
            .locator(
              '[data-shared-scroll-background="prevencion"] img[src="/media/seidp-prevention-family.webp"]'
            )
            .count(),
          1,
          "Prevention: hero and clarity share one image element"
        );
        const preventionBackground = page.locator(
          '[data-shared-scroll-background="prevencion"]'
        );
        await page.locator("footer").scrollIntoViewIfNeeded();
        await page.waitForFunction(
          element => getComputedStyle(element).visibility === "hidden",
          await preventionBackground.elementHandle()
        );
        assert.equal(
          await page
            .locator("footer")
            .evaluate(
              element => Number(getComputedStyle(element).zIndex) >= 30
            ),
          true,
          "Prevention: footer stays above the shared image"
        );
      }
      if (route === "/contacto") {
        assert.equal(await page.locator("#preguntas-frecuentes").count(), 1);
        assert.equal(
          await page
            .locator("#preguntas-frecuentes button[aria-expanded]")
            .count(),
          5,
          "Contacto: five essential questions"
        );
        for (const action of [
          "Cómo llegar",
          "Llamar",
          "Consultar por WhatsApp",
        ]) {
          assert.ok(
            await page.getByRole("link", { name: action, exact: true }).count(),
            `Contacto: ${action}`
          );
        }
        assert.equal(
          await page.locator("[data-mapbox-tilt-map]").count(),
          1,
          "Contacto: Mapbox tilt map mount"
        );
      }
      if (route === "/nosotros") {
        assert.equal(
          await page
            .locator(
              '[data-shared-scroll-background="nosotros"] img[src="/media/seidp-consulta-medica.webp"]'
            )
            .count(),
          1,
          "Nosotros: hero and people section share one image element"
        );
        assert.equal(
          await page
            .locator('main img[src="/media/seidp-consulta-medica.webp"]')
            .count(),
          1,
          "Nosotros: shared image is not duplicated"
        );
        assert.equal(
          await page.getByText("Nuestro espacio", { exact: true }).count(),
          0,
          "Nosotros: gallery removed"
        );
        assert.equal(
          await page
            .getByText("Conversemos sobre lo que necesitas.", { exact: true })
            .count(),
          0,
          "Nosotros: nearby CTA removed"
        );
        assert.equal(
          await page
            .getByText("El compromiso que nos mueve", { exact: true })
            .count(),
          1,
          "Nosotros: commitment and cards share one section"
        );
        for (const value of ["Cercanía", "Confianza", "Prevención"]) {
          assert.equal(
            await page
              .getByRole("heading", { name: value, exact: true })
              .count(),
            1,
            `Nosotros: ${value}`
          );
        }
        const storyReveal = page
          .getByText("Nuestra historia", { exact: true })
          .locator("xpath=ancestor::*[contains(@class,'section-reveal')][1]");
        await storyReveal.waitFor({ state: "visible" });
        await storyReveal.evaluate(element =>
          element.scrollIntoView({ block: "center" })
        );
        await page.waitForFunction(
          element => getComputedStyle(element).opacity === "1",
          await storyReveal.elementHandle()
        );
        assert.equal(
          await storyReveal.evaluate(
            element => getComputedStyle(element).opacity
          ),
          "1",
          "Nosotros: story remains visible after entry"
        );
      }
      if (
        width === 1440 &&
        ["/nosotros", "/prevencion", "/contacto", "/servicios"].includes(route)
      ) {
        await page.waitForTimeout(800);
        assert.equal(
          await page.locator("main h1").isVisible(),
          true,
          `${route}: hero stays visible after entry`
        );
      }
      assert.equal(
        await page
          .getByRole("link", {
            name: "Llamar a Salud e Imagen del Puerto",
            exact: true,
          })
          .getAttribute("href"),
        "tel:+523224035071"
      );
      const floating = page.getByRole("link", {
        name: "Abrir WhatsApp de Salud e Imagen del Puerto",
        exact: true,
      });
      const floatingBounds = await floating.boundingBox();
      assert.ok(
        floatingBounds.width >= 44 && floatingBounds.height >= 44,
        `${route}: WhatsApp tap target`
      );
      assert.ok(
        (await floating.getAttribute("href")).startsWith("https://wa.me/"),
        `${route}: WhatsApp URL`
      );
      if (screenshots && (width === 360 || width === 1440))
        await page.screenshot({
          path: `${screenshots}/${route.split("/").pop() || "inicio"}-${width}.png`,
          fullPage: true,
          animations: "disabled",
        });
    }
  }

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${base}/`);
  await page
    .getByRole("button", { name: "Change to English", exact: true })
    .click();
  await page.waitForURL(`${base}/en/`);
  await page.getByRole("heading", {
    name: /Your health deserves to be seen clearly/i,
    level: 1,
  }).waitFor();
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  assert.equal(
    await page.evaluate(() => localStorage.getItem("seidp-language")),
    "en",
    "English preference persists"
  );
  await page.reload();
  const aboutLink = page
    .getByRole("navigation", { name: "Main navigation", exact: true })
    .getByRole("link", { name: "About us", exact: true });
  await aboutLink.waitFor();
  await aboutLink.click();
  await page.waitForURL(`${base}/en/nosotros`);
  await page.getByRole("heading", {
    name: /Approachable diagnosis, clearer decisions/i,
    level: 1,
  }).waitFor();
  await page
    .getByRole("button", { name: "Switch to Spanish", exact: true })
    .click();
  await page.waitForURL(`${base}/es/nosotros`);
  await page
    .getByRole("navigation", { name: "Navegación principal", exact: true })
    .getByRole("link", { name: "Nosotros", exact: true })
    .waitFor();
  assert.equal(await page.locator("html").getAttribute("lang"), "es");
  await page.goto(`${base}/en/contacto`);
  await page.getByRole("heading", { name: "Let's talk.", level: 1 }).waitFor();
  assert.equal(await page.locator("html").getAttribute("lang"), "en");
  assert.equal(
    await page.locator('link[rel="canonical"]').getAttribute("href"),
    `${base}/en/contacto`
  );
  assert.match(
    await page.locator('meta[name="description"]').getAttribute("content"),
    /diagnostic imaging/i,
    "English routes publish English metadata"
  );
  const englishWhatsAppMessages = await page
    .locator('a[href^="https://wa.me/"]')
    .evaluateAll(links =>
      links.map(link => new URL(link.href).searchParams.get("text"))
    );
  assert.ok(
    englishWhatsAppMessages.length > 0 &&
      englishWhatsAppMessages.every(
      message =>
        message ===
        "Hello, Salud e Imagen del Puerto. I would like to ask about a study."
      ),
    "Every English WhatsApp action uses the English preset"
  );

  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto(`${base}/es/contacto`);
  const spanishWhatsAppMessages = await page
    .locator('a[href^="https://wa.me/"]')
    .evaluateAll(links =>
      links.map(link => new URL(link.href).searchParams.get("text"))
    );
  assert.ok(
    spanishWhatsAppMessages.length > 0 &&
      spanishWhatsAppMessages.every(
      message =>
        message ===
        "Hola, Salud e Imagen del Puerto. Quiero consultar por un estudio."
      ),
    "Every Spanish WhatsApp action keeps the Spanish preset"
  );
  const question = page.getByRole("button", { name: /¿Cómo puedo agendar/ });
  await question.click();
  assert.equal(await question.getAttribute("aria-expanded"), "true");
  await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
  const mobile = page.getByRole("navigation", {
    name: "Navegación móvil",
    exact: true,
  });
  const mobileTrigger = mobile.getByRole("button", {
    name: "Servicios",
    exact: true,
  });
  await mobileTrigger.click();
  assert.equal(await mobileTrigger.getAttribute("aria-expanded"), "true");
  await mobile
    .getByRole("link", { name: "Consulta nutricional", exact: true })
    .click();
  await page.waitForURL("**/servicios/consulta-nutricional");
  await mobile.waitFor({ state: "hidden" });
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");
  assert.deepEqual(errors, []);
  console.log(
    "OK: 14 pages at 3 widths; responsive heroes, one FAQ, no horizontal overflow, accessible WhatsApp, keyboard and mobile navigation."
  );
} finally {
  await browser.close();
}

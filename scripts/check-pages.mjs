// Run with the dev server active: node scripts/check-pages.mjs
// PLAYWRIGHT_MODULE can point to an already-installed Playwright package.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { mkdir } from "node:fs/promises";

const { chromium } = createRequire(import.meta.url)(process.env.PLAYWRIGHT_MODULE || "playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage();
const errors = [];
page.on("pageerror", error => errors.push(error.message));
const base = process.env.BASE_URL || "http://localhost:3000";
const screenshots = process.env.QA_SCREENSHOTS;
if (screenshots) await mkdir(screenshots, { recursive: true });

try {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${base}/contacto`);
  const trigger = page.getByRole("navigation", { name: "Navegación principal", exact: true }).getByRole("button", { name: "Servicios" });
  await trigger.focus();
  await page.keyboard.press("Enter");
  const submenu = page.getByRole("navigation", { name: "Submenú de servicios", exact: true });
  await submenu.waitFor();
  const routes = await submenu.locator("a").evaluateAll(links => links.map(link => link.getAttribute("href")));
  const serviceTitles = await submenu.locator("a").evaluateAll(links => Object.fromEntries(links.map(link => [link.getAttribute("href"), link.textContent.trim()])));
  assert.equal(routes.length, 7);
  const popup = page.getByRole("dialog", { name: "Servicios del centro" });
  for (const scrollY of [0, 420, 0]) {
    await page.evaluate(y => window.scrollTo(0, y), scrollY);
    await page.waitForFunction(() => {
      const header = document.querySelector("header").getBoundingClientRect();
      const menu = document.querySelector('[data-slot="popover-content"]').getBoundingClientRect();
      return Math.abs(header.bottom - menu.top) < 1;
    });
    const bounds = await popup.boundingBox();
    assert.ok(bounds.width <= 520 && bounds.height < 320, "Submenu stays compact");
    await page.waitForFunction(scrolled => {
      const logo = document.querySelector('header a[aria-label="Salud e Imagen del Puerto, inicio"]');
      return getComputedStyle(logo.querySelector(":scope > img")).opacity === (scrolled ? "0" : "1") &&
        getComputedStyle(logo.querySelector(":scope > span")).opacity === (scrolled ? "1" : "0");
    }, scrollY > 24);
    for (const source of ["logo-simbolo.webp", "logo-letras.png"]) {
      assert.ok(await page.locator(`header img[src$="${source}"]`).evaluate(img => img.complete && img.naturalWidth > 0));
    }
  }
  if (screenshots) await page.screenshot({ path: `${screenshots}/header.png`, animations: "disabled" });
  await page.keyboard.press("Escape");
  await submenu.waitFor({ state: "hidden" });
  assert.equal(await trigger.evaluate(element => element === document.activeElement), true);
  await trigger.click();
  await submenu.getByRole("link", { name: "Radiografías", exact: true }).click();
  await page.waitForURL("**/servicios/radiografias");
  await submenu.waitFor({ state: "hidden" });

  for (const width of [360, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    for (const route of ["/", "/servicios", "/prevencion", "/contacto", "/nosotros", "/terminos-y-condiciones", "/aviso-de-privacidad", ...routes]) {
      await page.goto(`${base}${route}`);
      await page.locator("main h1").waitFor();
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("main h1").count(), 1, route);
      const hero = await page.locator("main > section").first().boundingBox();
      assert.ok(hero.height >= 999, `${route} must start with a 100vh hero`);
      if (route === "/contacto" || route.startsWith("/servicios/")) {
        assert.ok(Math.abs(hero.height - 1000) < 1, `${route}: fullscreen hero`);
        const photo = page.locator("main > section").first().locator("img");
        await photo.evaluate(img => img.decode());
        const bounds = await photo.boundingBox();
        assert.ok(Math.abs(bounds.width - hero.width) < 1 && Math.abs(bounds.height - hero.height) < 1, `${route}: background covers hero`);
      }
      for (const src of await page.locator("main img").evaluateAll(images => images.map(img => img.getAttribute("src")))) {
        assert.ok(src.startsWith("/media/"), `${route}: photo must use local assets`);
      }
      if (width === 1440) {
        const navigation = page.getByRole("navigation", { name: "Navegación principal", exact: true });
        await page.mouse.move(0, 0);
        assert.equal(
          await navigation.getByRole("button", { name: "Servicios" }).evaluate(element => getComputedStyle(element).color),
          await navigation.getByRole("link", { name: "Nosotros", exact: true }).evaluate(element => getComputedStyle(element).color),
          `${route}: Services matches the other header links`
        );
      }
      if (route === "/nosotros") {
        const story = page.locator("main > section").nth(1);
        assert.ok(await story.evaluate(element => parseFloat(getComputedStyle(element).paddingTop)) <= 24);
      }
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
      assert.equal(overflow, false, `${route} overflows at ${width}px`);
      if (route.startsWith("/servicios/")) {
        const title = serviceTitles[route];
        const href = await page.getByRole("link", { name: "Consultar este servicio", exact: true }).getAttribute("href");
        assert.ok(new URL(href).searchParams.get("text").includes(title.toLowerCase()), route);
        for (const id of ["estudios", "preparacion", "visita"]) assert.equal(await page.locator(`#${id}`).count(), 1);
      }
      if (screenshots && (width === 360 || width === 1440)) await page.screenshot({ path: `${screenshots}/${route.split("/").pop() || "inicio"}-${width}.png`, fullPage: true, animations: "disabled" });
    }
  }

  await page.setViewportSize({ width: 360, height: 640 });
  await page.goto(`${base}/contacto`);
  const question = page.getByRole("button", { name: /¿Cómo puedo agendar/ });
  await question.click();
  assert.equal(await question.getAttribute("aria-expanded"), "true");
  await page.getByRole("button", { name: "Abrir menú", exact: true }).click();
  const mobile = page.getByRole("navigation", { name: "Navegación móvil", exact: true });
  const mobileTrigger = mobile.getByRole("button", { name: "Servicios", exact: true });
  await mobileTrigger.click();
  assert.equal(await mobileTrigger.getAttribute("aria-expanded"), "true");
  await mobile.getByRole("link", { name: "Consulta nutricional", exact: true }).click();
  await page.waitForURL("**/servicios/consulta-nutricional");
  await mobile.waitFor({ state: "hidden" });
  assert.equal(await page.evaluate(() => document.body.style.overflow), "");
  assert.deepEqual(errors, []);
  console.log("OK: 14 pages at 3 widths; 100vh heroes, flush compact submenu, consistent header colors, spacing, keyboard and mobile navigation.");
} finally {
  await browser.close();
}

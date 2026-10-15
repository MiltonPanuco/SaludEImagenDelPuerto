import assert from "node:assert/strict";
import test from "node:test";
import worker, {indexedRoutes} from "./worker.js";

test("redirects public HTTP requests to HTTPS", async () => {
  const response = await worker.fetch(
    new Request("http://example.test/es/contacto")
  );

  assert.equal(response.status, 308);
  assert.equal(response.headers.get("location"), "https://example.test/es/contacto");
});

test("serves an origin-aware bilingual sitemap", async () => {
  const response = await worker.fetch(
    new Request("https://example.test/sitemap.xml")
  );
  const xml = await response.text();

  assert.equal(
    response.headers.get("content-type"),
    "application/xml; charset=utf-8"
  );
  for (const language of ["es", "en"]) {
    for (const route of indexedRoutes) {
      const url = new URL(`/${language}${route}`, "https://example.test").href;
      assert.match(xml, new RegExp(`<loc>${url}</loc>`));
    }
  }
  assert.equal(xml.match(/<url>/g)?.length, indexedRoutes.length * 2);
  assert.doesNotMatch(xml, /\/404/);
});

test("proxies Sanity content without exposing a token", async t => {
  const originalFetch = globalThis.fetch;
  t.after(() => {
    globalThis.fetch = originalFetch;
  });
  globalThis.fetch = async request => {
    assert.match(String(request), /^https:\/\/g21lyvbs\.api\.sanity\.io\//);
    return Response.json({ result: [{ _id: "page-home" }] });
  };

  const response = await worker.fetch(
    new Request("https://example.test/api/content")
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { result: [{ _id: "page-home" }] });
  assert.match(response.headers.get("cache-control"), /stale-while-revalidate/);
});

test("allows Sanity images in the security policy for rendered pages", async () => {
  const originalRewriter = globalThis.HTMLRewriter;
  globalThis.HTMLRewriter = class {
    on() {
      return this;
    }
    transform(response) {
      return response;
    }
  };
  try {
    const response = await worker.fetch(
      new Request("https://example.test/es/"),
      {ASSETS: {fetch: async () => new Response("<html></html>", {headers: {"content-type": "text/html"}})}}
    );
    assert.match(response.headers.get("content-security-policy"), /https:\/\/cdn\.sanity\.io/);
    assert.match(response.headers.get("strict-transport-security"), /max-age=63072000/);
    assert.equal(response.headers.get("x-frame-options"), "DENY");
  } finally {
    globalThis.HTMLRewriter = originalRewriter;
  }
});

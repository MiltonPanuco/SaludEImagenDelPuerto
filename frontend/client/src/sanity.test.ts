import {describe, expect, it} from "vitest";
import {localized, resolveSanityImageUrl} from "./sanity";

describe("Sanity content helpers", () => {
  it("builds the CDN URL used by imported image references", () => {
    expect(resolveSanityImageUrl("image-abc123-1200x800-webp")).toBe(
      "https://cdn.sanity.io/images/g21lyvbs/production/abc123-1200x800.webp"
    );
  });

  it("falls back to Spanish when the selected locale is unavailable", () => {
    expect(localized({es: "Hola"}, "en", "Fallback")).toBe("Hola");
  });
});

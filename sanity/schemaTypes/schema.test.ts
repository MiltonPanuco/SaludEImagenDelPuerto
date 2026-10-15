import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { pageDefinitions } from "./pages";
import { LANGUAGES } from "./shared";

describe("Sanity content model", () => {
  it("keeps singleton ids and section keys unique", () => {
    assert.equal(
      new Set(pageDefinitions.map(({ id }) => id)).size,
      pageDefinitions.length,
    );
    for (const page of pageDefinitions) {
      assert.equal(new Set(page.sections).size, page.sections.length);
    }
  });

  it("requires the two public site languages", () => {
    assert.deepEqual(LANGUAGES, ["es", "en"]);
  });
});

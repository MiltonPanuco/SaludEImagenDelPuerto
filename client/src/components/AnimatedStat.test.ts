import { describe, expect, it } from "vitest";
import { interpolateCount } from "./AnimatedStat";

describe("interpolateCount", () => {
  it("clamps progress and reaches the requested value", () => {
    expect(interpolateCount(-1, 7)).toBe(0);
    expect(interpolateCount(0.5, 8)).toBe(4);
    expect(interpolateCount(2, 7)).toBe(7);
  });
});

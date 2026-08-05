import { describe, expect, it } from "vitest";

import { formatE164Display } from "./offices";

describe("formatE164Display", () => {
  it("formats a UAE mobile E.164 with its dialing code", () => {
    expect(formatE164Display("+971543219003", "971")).toBe("+971 543 219 003");
  });

  it("groups a 10-digit national number as 3-3-4", () => {
    expect(formatE164Display("+919972011342", "91")).toBe("+91 997 201 1342");
  });

  it("keeps the known dialing code together", () => {
    expect(formatE164Display("+97431113692", "974")).toBe("+974 31 113 692");
    expect(formatE164Display("+96555154110", "965")).toBe("+965 55 154 110");
  });

  it("handles already-spaced input", () => {
    expect(formatE164Display("+971 54 321 9003", "971")).toBe("+971 543 219 003");
  });

  it("returns the input unchanged when the dialing code does not match", () => {
    expect(formatE164Display("+919036554740", "971")).toBe("+919036554740");
  });

  it("returns an empty string for an empty value", () => {
    expect(formatE164Display("", "971")).toBe("");
  });

  it("returns the input unchanged when it is not E.164", () => {
    expect(formatE164Display("not-a-number", "971")).toBe("not-a-number");
  });
});

import { describe, it, expect } from "vitest";
import validateAndFormatEmail from "../utils/contact-form/validateAndFormatEmail";

describe("validate and format text function", () => {
  it("Should fail with symbols but no text", () => {
    expect(validateAndFormatEmail("@.")).toBe("");
  });

  it("Should fail an empty input", () => {
    expect(validateAndFormatEmail("")).toBe("");
  });

  it("Should fail with illegal symbol", () => {
    expect(validateAndFormatEmail("ry!n@gmail")).toBe("");
  });

  it("Should pass valid email", () => {
    expect(validateAndFormatEmail("ryan@gmail.com")).toBe("ryan@gmail.com");
  });
});

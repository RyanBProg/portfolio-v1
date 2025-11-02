import { describe, it, expect } from "vitest";
import validateAndFormatText from "../utils/contact-form/validateAndFormatText";

describe("validate and format text function", () => {
  it("Should pass valid text", () => {
    expect(validateAndFormatText("Hi there!")).toBe("Hi there!");
  });

  it("Should fail an empty input", () => {
    expect(validateAndFormatText("")).toBe("");
  });

  it("Should pass and trim a valid input", () => {
    expect(validateAndFormatText(" thiodmd.  ")).toBe("thiodmd.");
  });

  it("Should pass allowed symbols", () => {
    expect(validateAndFormatText("!,.?&\"'")).toBe("!,.?&\"'");
  });

  it("Should remove HTML chars", () => {
    expect(validateAndFormatText("<p>test</p>")).toBe("test");
  });
});

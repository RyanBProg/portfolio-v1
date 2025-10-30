import { describe, expect, it } from "vitest";
import sanitiseInput from "./sanitiseInput";

describe("Check valid email function", () => {
  it("Should pass a valid input", () => {
    expect(sanitiseInput("testing")).toBe("testing");
  });

  it("Should pass an empty input", () => {
    expect(sanitiseInput("")).toBe("");
  });

  it("Should pass and trim a valid input", () => {
    expect(sanitiseInput(" thiodmd.  ")).toBe("thiodmd.");
  });

  it("Should reject an input with HTML chars", () => {
    expect(sanitiseInput("<p>test</p>")).toBe("&lt;p&gt;test&lt;/p&gt;");
  });

  it("Should reject an script tag", () => {
    expect(sanitiseInput("<script>alert('x')</script>")).toBe(
      "&lt;script&gt;alert(&#39;x&#39;)&lt;/script&gt;",
    );
  });
});

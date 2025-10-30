import { describe, expect, it } from "vitest";
import validEmail from "./validEmail";

describe("Check valid email function", () => {
  it("Should pass a valid email", () => {
    expect(validEmail("testing123@gmail.com")).toBeTruthy();
  });

  it("Should reject an empty email", () => {
    expect(validEmail("")).toBeFalsy();
  });

  it("Should pass a sub domain", () => {
    expect(validEmail("abc@gmail.staff.com.au")).toBeTruthy();
  });

  it("Should reject an invalid email", () => {
    expect(validEmail("s@gmaicom")).toBeFalsy();
  });
});

import { describe, it, expect } from "vitest";
import validateContactFormInputs from "../utils/contact-form/validateContactFormInputs";

describe("validate and format text function", () => {
  it("Should pass correct contact data", () => {
    expect(
      validateContactFormInputs(
        "Ryan",
        "ryan@gmail.com",
        "This is just a test!",
      ),
    ).toMatchObject({
      success: true,
      data: {
        name: "Ryan",
        email: "ryan@gmail.com",
        message: "This is just a test!",
      },
    });
  });

  it("Should fail a bad email", () => {
    expect(
      validateContactFormInputs("Ryan", "ryan@g.", "This is just a test!"),
    ).toMatchObject({
      success: false,
      status: 422,
    });
  });

  it("Should fail when message is too short", () => {
    expect(
      validateContactFormInputs("Ryan", "ryan@gmail.com", "Hi"),
    ).toMatchObject({
      success: false,
      status: 422,
    });
  });

  it("Should fail when name is invalid", () => {
    expect(
      validateContactFormInputs(
        ">",
        "ryan@gmail.com",
        "Hi there, nice website",
      ),
    ).toMatchObject({
      success: false,
      status: 422,
    });
  });
});

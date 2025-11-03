import { beforeEach, describe, expect, it, vi } from "vitest";
import initContactForm from "../utils/contact-form/initContactForm";

const buildDom = () => {
  document.body.innerHTML = "";

  const form = document.createElement("form");
  form.id = "form";

  const nameInput = document.createElement("input");
  nameInput.id = "name";

  const emailInput = document.createElement("input");
  emailInput.id = "email";

  const messageInput = document.createElement("textarea");
  messageInput.id = "message";

  const formButton = document.createElement("button");
  formButton.type = "submit";
  formButton.id = "form-button";

  const errorMessage = document.createElement("p");
  errorMessage.id = "error-message";
  errorMessage.classList.add("hidden");

  form.append(nameInput, emailInput, messageInput, formButton, errorMessage);
  document.body.append(form);

  const successDialog = document.createElement("dialog");
  successDialog.id = "form-dialog-success";
  successDialog.showModal = vi.fn();
  document.body.append(successDialog);

  return {
    form,
    formButton,
    nameInput,
    emailInput,
    messageInput,
    errorMessage,
    successDialog,
  };
};

const submitForm = async (form: HTMLFormElement) => {
  const event = new Event("submit", { bubbles: true, cancelable: true });
  form.dispatchEvent(event);
  await Promise.resolve();
  await Promise.resolve();
};

describe("ContactForm integration", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("shows validation error and re-enables form when inputs are invalid", async () => {
    const dom = buildDom();

    const validateFn = vi.fn().mockReturnValue({
      success: false,
      message: "Name invalid",
      status: 422,
    });
    const recaptchaFn = vi.fn();
    const postFormFn = vi.fn();

    initContactForm({
      ...dom,
      validateFn,
      recaptchaFn,
      postFormFn,
    });

    await submitForm(dom.form);
    expect(dom.errorMessage.classList.contains("hidden")).toBe(false);
    expect(dom.errorMessage.textContent).toBe("Name invalid");
    expect(dom.formButton.disabled).toBe(false);
  });

  it("shows recaptcha error without calling post", async () => {
    const dom = buildDom();

    const validateFn = vi.fn().mockReturnValue({
      success: true,
      data: {
        name: "Ryan",
        email: "ryan@example.com",
        message: "Hello there message",
      },
    });
    const recaptchaFn = vi.fn().mockResolvedValue({
      success: false,
      token: null,
      message: "reCAPTCHA failed",
    });
    const postFormFn = vi.fn();

    initContactForm({
      ...dom,
      validateFn,
      recaptchaFn,
      postFormFn,
    });

    await submitForm(dom.form);

    expect(dom.errorMessage.classList.contains("hidden")).toBe(false);
    expect(dom.errorMessage.textContent).toBe("reCAPTCHA failed");
    expect(dom.formButton.disabled).toBe(false);
  });

  it("submits successfully and shows confirmation dialog", async () => {
    const dom = buildDom();

    const validateFn = vi.fn().mockReturnValue({
      success: true,
      data: {
        name: "Ryan",
        email: "ryan@example.com",
        message: "Hello message",
      },
    });
    const recaptchaFn = vi.fn().mockResolvedValue({
      success: true,
      token: "test-token",
      message: "",
    });
    const postFormFn = vi.fn().mockResolvedValue({ message: "ok" });

    initContactForm({
      ...dom,
      validateFn,
      recaptchaFn,
      postFormFn,
    });

    await submitForm(dom.form);

    expect(dom.successDialog.showModal).toHaveBeenCalled();
    expect(dom.formButton.innerText).toBe("Submitted");
    expect(dom.formButton.disabled).toBe(true);
    expect(dom.form.getAttribute("inert")).toBe("true");
    expect(dom.errorMessage.classList.contains("hidden")).toBe(true);
  });
});

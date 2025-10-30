import { beforeEach, describe, expect, it, vi } from "vitest";
import handleContactSubmit from "./handleContactSubmit";

const renderForm = () => {
  const form = document.createElement("form");

  const nameInput = document.createElement("input");
  nameInput.id = "name";

  const emailInput = document.createElement("input");
  emailInput.id = "email";

  const messageInput = document.createElement("textarea");
  messageInput.id = "message";

  const formButton = document.createElement("button");
  formButton.id = "form-button";

  const successDialog = document.createElement("dialog");
  const successMessage = document.createElement("p");
  successDialog.append(successMessage);

  const errorDialog = document.createElement("dialog");
  const errorMessage = document.createElement("p");
  errorDialog.append(errorMessage);

  successDialog.showModal = vi.fn();
  errorDialog.showModal = vi.fn();

  return {
    form,
    nameInput,
    emailInput,
    messageInput,
    formButton,
    successDialog,
    errorDialog,
    successMessage,
    errorMessage,
  };
};

const buildDeps = () => {
  const {
    form,
    nameInput,
    emailInput,
    messageInput,
    formButton,
    successDialog,
    errorDialog,
  } = renderForm();

  const fetchMock = vi.fn();

  const event = {
    preventDefault: vi.fn(),
  } as unknown as SubmitEvent;

  return {
    event,
    form,
    nameInput,
    emailInput,
    messageInput,
    formButton,
    formDisabled: false,
    successDialog,
    errorDialog,
    fetchMock,
  };
};

describe("handleContactSubmit", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("blocks submission when the name is empty", async () => {
    const deps = buildDeps();
    deps.nameInput.value = "   ";
    deps.emailInput.value = "user@example.com";
    deps.messageInput.value = "Hello!";
    await handleContactSubmit({ ...deps, fetchImpl: deps.fetchMock });
    expect(deps.event.preventDefault).toHaveBeenCalled();
    expect(deps.errorDialog.showModal).toHaveBeenCalledTimes(1);
    expect(deps.errorDialog.querySelector("p")!.textContent).toBe(
      "Please enter a name",
    );
    expect(deps.fetchMock).not.toHaveBeenCalled();
  });

  it("blocks submission when the email is invalid", async () => {
    const deps = buildDeps();
    deps.nameInput.value = "Ryan";
    deps.emailInput.value = "not-an-email";
    deps.messageInput.value = "Hello!";
    await handleContactSubmit({ ...deps, fetchImpl: deps.fetchMock });
    expect(deps.errorDialog.showModal).toHaveBeenCalledTimes(1);
    expect(deps.errorDialog.querySelector("p")!.textContent).toBe(
      "Please enter a valid email address",
    );
    expect(deps.fetchMock).not.toHaveBeenCalled();
  });

  it("blocks submission when the message is empty", async () => {
    const deps = buildDeps();
    deps.nameInput.value = "Ryan";
    deps.emailInput.value = "user@example.com";
    deps.messageInput.value = "     ";
    await handleContactSubmit({ ...deps, fetchImpl: deps.fetchMock });
    expect(deps.errorDialog.showModal).toHaveBeenCalledTimes(1);
    expect(deps.errorDialog.querySelector("p")!.textContent).toBe(
      "Please enter a message",
    );
    expect(deps.fetchMock).not.toHaveBeenCalled();
  });

  it("submits successfully with sanitised payload", async () => {
    const deps = buildDeps();
    deps.nameInput.value = "  Ryan  ";
    deps.emailInput.value = "user@example.com";
    deps.messageInput.value = "<b>Hello</b>";

    deps.fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Email sent successfully" }),
    });

    await handleContactSubmit({ ...deps, fetchImpl: deps.fetchMock });

    expect(deps.fetchMock).toHaveBeenCalledWith("/api/sendEmail.json", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Ryan",
        email: "user@example.com",
        message: "&lt;b&gt;Hello&lt;/b&gt;",
      }),
    });

    expect(deps.successDialog.showModal).toHaveBeenCalledTimes(1);
    expect(deps.nameInput.value).toBe("");
    expect(deps.emailInput.value).toBe("");
    expect(deps.messageInput.value).toBe("");
    expect(deps.nameInput.disabled).toBe(true);
    expect(deps.emailInput.disabled).toBe(true);
    expect(deps.messageInput.disabled).toBe(true);
    expect(deps.formButton.disabled).toBe(true);
    expect(deps.form.getAttribute("inert")).toBe("true");
    expect(deps.formButton.innerText).toBe("Submitted");
  });

  it("surfaces backend errors", async () => {
    const deps = buildDeps();
    deps.nameInput.value = "Ryan";
    deps.emailInput.value = "user@example.com";
    deps.messageInput.value = "Hello!";
    deps.fetchMock.mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Failed to send email" }),
    });

    await handleContactSubmit({ ...deps, fetchImpl: deps.fetchMock });

    expect(deps.fetchMock).toHaveBeenCalledTimes(1);
    expect(deps.errorDialog.showModal).toHaveBeenCalledTimes(1);
    expect(deps.errorDialog.querySelector("p")!.textContent).toBe(
      "Failed to send email",
    );
  });

  it("handles network failures gracefully", async () => {
    const deps = buildDeps();
    deps.nameInput.value = "Ryan";
    deps.emailInput.value = "user@example.com";
    deps.messageInput.value = "Hello!";

    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => undefined);

    deps.fetchMock.mockRejectedValue(new Error("boom"));

    await handleContactSubmit({ ...deps, fetchImpl: deps.fetchMock });

    expect(deps.errorDialog.showModal).toHaveBeenCalledTimes(1);
    expect(deps.errorDialog.querySelector("p")!.textContent).toBe(
      "An error occurred. Please try again.",
    );
    expect(consoleSpy).toHaveBeenCalled();
  });
});

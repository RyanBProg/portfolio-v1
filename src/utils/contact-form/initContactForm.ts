import validateContactFormInputs from "./validateContactFormInputs";
import handleRecaptchaClient from "./handleRecaptchaClient";
import postContactForm from "./postContactForm";

type ContactFormDeps = {
  form: HTMLFormElement;
  formButton: HTMLButtonElement;
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  messageInput: HTMLTextAreaElement;
  errorMessage: HTMLParagraphElement;
  successDialog: HTMLDialogElement;
  validateFn?: typeof validateContactFormInputs;
  recaptchaFn?: typeof handleRecaptchaClient;
  postFormFn?: typeof postContactForm;
};

const hideError = (errorEl: HTMLParagraphElement) => {
  errorEl.classList.add("hidden");
  errorEl.textContent = "";
};

const showError = (
  errorEl: HTMLParagraphElement,
  message: string,
  formButton: HTMLButtonElement,
  setFormDisabled: (value: boolean) => void,
) => {
  setFormDisabled(false);
  formButton.disabled = false;
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
};

export default function initContactForm({
  form,
  formButton,
  nameInput,
  emailInput,
  messageInput,
  errorMessage,
  successDialog,
  validateFn = validateContactFormInputs,
  recaptchaFn = handleRecaptchaClient,
  postFormFn = postContactForm,
}: ContactFormDeps) {
  let formDisabled = false;

  const setFormDisabled = (value: boolean) => {
    formDisabled = value;
  };

  const submitHandler = async (event: SubmitEvent) => {
    event.preventDefault();
    formButton.innerText = "Submitting...";
    if (formDisabled) {
      formButton.innerText = "Submit";
      return;
    }

    hideError(errorMessage);
    formButton.disabled = true;
    setFormDisabled(true);

    const validated = validateFn(
      nameInput.value,
      emailInput.value,
      messageInput.value,
    );

    if (!validated.success) {
      formButton.innerText = "Submit";
      showError(errorMessage, validated.message, formButton, setFormDisabled);
      return;
    }

    const {
      name: sanitisedName,
      email: sanitisedEmail,
      message: sanitisedMessage,
    } = validated.data;

    const { success, token, message } = await recaptchaFn();
    if (!success || !token) {
      formButton.innerText = "Submit";
      showError(
        errorMessage,
        message ?? "Unable to verify reCAPTCHA. Please try again.",
        formButton,
        setFormDisabled,
      );
      return;
    }

    try {
      await postFormFn(sanitisedName, sanitisedEmail, sanitisedMessage, token);

      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
      nameInput.disabled = true;
      emailInput.disabled = true;
      messageInput.disabled = true;
      form.setAttribute("inert", "true");
      formButton.innerText = "Submitted";
      formButton.disabled = true;
      hideError(errorMessage);
      successDialog.showModal();
    } catch (error) {
      console.error("Form error:", error);
      formButton.innerText = "Submit";
      showError(
        errorMessage,
        "Internal server error, please try again",
        formButton,
        setFormDisabled,
      );
    }
  };

  form.addEventListener("submit", submitHandler);

  return {
    teardown: () => form.removeEventListener("submit", submitHandler),
  };
}

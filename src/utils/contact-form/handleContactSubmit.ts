import sanitiseInput from "./sanitiseInput";
import validEmail from "./validEmail";

type ContactFormDeps = {
  event: SubmitEvent;
  form: HTMLFormElement;
  nameInput: HTMLInputElement;
  emailInput: HTMLInputElement;
  messageInput: HTMLTextAreaElement;
  formButton: HTMLButtonElement;
  formDisabled: boolean;
  successDialog: HTMLDialogElement;
  errorDialog: HTMLDialogElement;
  fetchImpl?: typeof fetch;
};

export default async function handleContactSubmit({
  event,
  form,
  nameInput,
  emailInput,
  messageInput,
  formButton,
  formDisabled,
  successDialog,
  errorDialog,
  fetchImpl = fetch,
}: ContactFormDeps) {
  event.preventDefault();
  if (formDisabled) return;

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const message = messageInput.value.trim();

  if (!name) {
    errorDialog.querySelector("p")!.textContent = "Please enter a name";
    errorDialog.showModal();
    return;
  }

  if (!validEmail(email)) {
    errorDialog.querySelector("p")!.textContent =
      "Please enter a valid email address";
    errorDialog.showModal();
    return;
  }

  if (!message) {
    errorDialog.querySelector("p")!.textContent = "Please enter a message";
    errorDialog.showModal();
    return;
  }

  // sanitise inputs
  const sanitisedInputs = {
    name: sanitiseInput(name),
    email: sanitiseInput(email),
    message: sanitiseInput(message),
  };

  try {
    const res = await fetchImpl("/api/sendEmail.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sanitisedInputs),
    });

    const data = await res.json();

    if (res.ok) {
      nameInput.value = "";
      emailInput.value = "";
      messageInput.value = "";
      nameInput.disabled = true;
      emailInput.disabled = true;
      messageInput.disabled = true;
      formButton.disabled = true;
      formDisabled = true;
      form.setAttribute("inert", "true");
      formButton.innerText = "Submitted";
      successDialog.showModal();
    } else {
      // show error message from the backend
      errorDialog.querySelector("p")!.textContent = data.message;
      errorDialog.showModal();
    }
  } catch (e) {
    console.error(e);
    errorDialog.querySelector("p")!.textContent =
      "An error occurred. Please try again.";
    errorDialog.showModal();
  }
}

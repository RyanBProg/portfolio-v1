export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { contactEmail } from "../../emailTemplates/contactForm";
import handleRecaptchaServer from "../../utils/contact-form/handleRecaptchaServer";
import validateContactFormInputs from "../../utils/contact-form/validateContactFormInputs";

const jsonRes = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: { "Content-Type": "application/json" },
  });

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message, token } = body;
    const formInputs = validateContactFormInputs(name, email, message);
    if (!formInputs.success) {
      return jsonRes(formInputs.status, {
        message: formInputs.message,
      });
    }
    const {
      name: formName,
      email: formEmail,
      message: formMessage,
    } = formInputs.data;

    if (!token) {
      return jsonRes(422, { message: "Recaptcha not available" });
    }

    const recaptchaStatus = await handleRecaptchaServer(token);
    if (!recaptchaStatus.success) {
      console.log(recaptchaStatus.message);
      return jsonRes(422, { message: "reCAPTCHA verification failed." });
    }

    const resend = new Resend(import.meta.env.RESEND_API_KEY);

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["ryanbprog@gmail.com"],
      subject: "Contact Form Submission",
      html: contactEmail(formName, formEmail, formMessage),
    });

    if (error) {
      console.error("Resend API Error:", error);
      return jsonRes(500, { message: "Email Service Failed" });
    }

    return jsonRes(200, { message: "Email sent successfully" });
  } catch (error) {
    console.error("Unexpected Error:", error);
    return new Response(
      JSON.stringify({
        message: "Server error occurred",
        error: error instanceof Error ? error.message : "Unknown error",
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
};

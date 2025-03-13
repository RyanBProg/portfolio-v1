export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { contactEmail } from "../../emailTemplates/contactForm";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "A Form Input Field Is Missing",
      }),
      {
        status: 404, // correct code?
        statusText: "Did not provide the right data",
      },
    );
  }

  // check inputs
  // santise inputs

  const { data, error } = await resend.emails.send({
    from: "Portfolio <onboarding@resend.dev>",
    to: ["ryanbprog@gmail.com"],
    subject: "Contact Form Submission",
    html: contactEmail(name, email, message),
  });

  if (data) {
    return new Response(
      JSON.stringify({
        message: "Email Sent Successfully",
        data: data,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "Email Server Failed",
        error: error,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
};

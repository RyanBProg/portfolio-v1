export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { contactEmail } from "../../emailTemplates/contactForm";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, message } = body;

  if (!name || !email || !message) {
    return new Response(null, {
      status: 404,
      statusText: "Did not provide the right data",
    });
  }

  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: ["ryanbprog@gmail.com"],
    subject: "Portfolio - Contact Form Submission",
    html: contactEmail(name, email, message),
  });

  if (data) {
    return new Response(
      JSON.stringify({
        message: data,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
  } else {
    return new Response(
      JSON.stringify({
        message: error,
      }),
      {
        status: 500,
        statusText: "Internal Server Error",
      },
    );
  }
};

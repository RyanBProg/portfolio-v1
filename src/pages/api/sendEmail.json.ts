export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { contactEmail } from "../../emailTemplates/contactForm";
import sanitiseInput from "../../utils/contact-form/sanitiseInput";
import validEmail from "../../utils/contact-form/validEmail";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Check for missing fields
    if (!name.trim() || !email.trim() || !message.trim()) {
      return new Response(
        JSON.stringify({
          message: "All fields are required",
        }),
        {
          status: 400,
          statusText: "Missing Required Fields",
        },
      );
    }

    // Validate email
    if (!validEmail(email)) {
      return new Response(
        JSON.stringify({
          message: "Invalid email format",
        }),
        {
          status: 422,
          statusText: "Invalid Email Format",
        },
      );
    }

    // Validate input lengths
    if (name.length < 2 || name.length > 50) {
      return new Response(
        JSON.stringify({
          message: "Name must be between 2 and 50 characters",
        }),
        {
          status: 422,
          statusText: "Invalid Name Length",
        },
      );
    }

    if (message.length < 10 || message.length > 300) {
      return new Response(
        JSON.stringify({
          message: "Message must be between 10 and 300 characters",
        }),
        {
          status: 422,
          statusText: "Invalid Message Length",
        },
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["ryanbprog@gmail.com"],
      subject: "Contact Form Submission",
      html: contactEmail(
        sanitiseInput(name),
        sanitiseInput(email),
        sanitiseInput(message),
      ),
    });

    if (error) {
      console.error("Resend API Error:", error);
      return new Response(
        JSON.stringify({
          message: "Failed to send email",
          error: error,
        }),
        {
          status: 500,
          statusText: "Email Service Failed",
        },
      );
    }

    return new Response(
      JSON.stringify({
        message: "Email sent successfully",
        data: data,
      }),
      {
        status: 200,
        statusText: "OK",
      },
    );
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

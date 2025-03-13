export const prerender = false;
import type { APIRoute } from "astro";
import { Resend } from "resend";
import { contactEmail } from "../../emailTemplates/contactForm";

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// input sanitising function
const sanitiseInputs = (name: string, email: string, message: string) => {
  // remove HTML tags and trim whitespace
  const sanitizedName = name.replace(/<[^>]*>/g, "").trim();
  const sanitizedEmail = email.replace(/<[^>]*>/g, "").trim();
  const sanitizedMessage = message.replace(/<[^>]*>/g, "").trim();

  return {
    name: sanitizedName,
    email: sanitizedEmail,
    message: sanitizedMessage,
  };
};

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Check for missing fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({
          message: "All fields are required",
        }),
        {
          status: 400, // Bad Request - client error
          statusText: "Missing Required Fields",
        },
      );
    }

    // Validate email
    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({
          message: "Invalid email format",
        }),
        {
          status: 422, // Unprocessable Entity - validation failed
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

    // Sanitize inputs
    const sanitisedInputs = sanitiseInputs(name, email, message);

    const { data, error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: ["ryanbprog@gmail.com"],
      subject: "Contact Form Submission",
      html: contactEmail(
        sanitisedInputs.name,
        sanitisedInputs.email,
        sanitisedInputs.message,
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
          status: 500, // Internal Server Error
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

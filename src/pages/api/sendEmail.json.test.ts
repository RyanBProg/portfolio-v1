import { beforeEach, describe, expect, it, vi } from "vitest";

vi.stubEnv("RESEND_API_KEY", "test-key");
let sendMock!: ReturnType<typeof vi.fn>;
vi.mock("resend", () => {
  sendMock = vi.fn();
  class ResendMock {
    emails: { send: (...args: unknown[]) => unknown };
    constructor() {
      this.emails = {
        send: (...args) => sendMock(...args),
      };
    }
  }
  return { Resend: ResendMock };
});

// import after mocking so the handler uses the stubbed client
const { POST } = await import("./sendEmail.json");

const invokeRoute = (payload: Record<string, unknown>) => {
  const request = new Request("http://localhost/api/sendEmail.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return POST({ request } as any);
};

describe("POST /api/sendEmail.json", () => {
  beforeEach(() => {
    sendMock.mockReset();
  });

  it("returns 400 when a required field is missing", async () => {
    const response = await invokeRoute({
      name: "   ",
      email: "person@example.com",
      message: "Hello there!",
    });

    expect(response.status).toBe(400);
    const body = await response.json();
    expect(body.message).toBe("All fields are required");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 422 when email is invalid", async () => {
    const response = await invokeRoute({
      name: "Ryan",
      email: "invalid-email",
      message: "Hello there!",
    });

    expect(response.status).toBe(422);
    const body = await response.json();
    expect(body.message).toBe("Invalid email format");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 422 when name is too short", async () => {
    const response = await invokeRoute({
      name: "R",
      email: "person@example.com",
      message: "Hello there!",
    });

    expect(response.status).toBe(422);
    const body = await response.json();
    expect(body.message).toBe("Name must be between 2 and 50 characters");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 422 when message is too short", async () => {
    const response = await invokeRoute({
      name: "Ryan",
      email: "person@example.com",
      message: "Too short",
    });

    expect(response.status).toBe(422);
    const body = await response.json();
    expect(body.message).toBe("Message must be between 10 and 300 characters");
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("bubbles up Resend errors", async () => {
    sendMock.mockResolvedValue({
      data: null,
      error: { message: "Service unavailable" },
    });

    const response = await invokeRoute({
      name: "Ryan Bowler",
      email: "person@example.com",
      message: "Hello there, this is a longer message",
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.message).toBe("Failed to send email");
  });

  it("returns 200 when email is sent successfully", async () => {
    sendMock.mockResolvedValue({
      data: { id: "email-123" },
      error: null,
    });

    const response = await invokeRoute({
      name: "<b>Ryan</b>",
      email: "person@example.com",
      message: "<script>alert('xss')</script> This is a valid message.",
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    const [{ html }] = sendMock.mock.calls[0];
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;b&gt;Ryan&lt;/b&gt;");
    expect(html).toContain("alert(&#39;xss&#39;)");

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Email sent successfully");
    expect(body.data).toEqual({ id: "email-123" });
  });
});

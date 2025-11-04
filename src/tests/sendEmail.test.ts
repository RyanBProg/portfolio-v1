import { beforeEach, describe, expect, it, vi } from "vitest";

vi.stubEnv("RESEND_API_KEY", "test-key");
let sendMock!: ReturnType<typeof vi.fn>;
let handleRecaptchaServerMock!: ReturnType<typeof vi.fn>;
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

vi.mock("../utils/contact-form/handleRecaptchaServer", () => {
  handleRecaptchaServerMock = vi
    .fn()
    .mockResolvedValue({ success: true, message: "ok" });
  return { default: handleRecaptchaServerMock };
});

// import after mocking so the handler uses the stubbed client
const { POST } = await import("../pages/api/sendEmail.json");

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
    handleRecaptchaServerMock.mockClear();
    handleRecaptchaServerMock.mockResolvedValue({
      success: true,
      message: "ok",
    });
  });

  it("returns bad res when a required field is missing", async () => {
    const response = await invokeRoute({
      name: "   ",
      email: "person@example.com",
      message: "Hello there!",
    });

    expect(response.ok).toBeFalsy();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns bad res when email is invalid", async () => {
    const response = await invokeRoute({
      name: "Ryan",
      email: "invalid-email",
      message: "Hello there!",
    });

    expect(response.ok).toBeFalsy();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns bad res when name is too short", async () => {
    const response = await invokeRoute({
      name: "R",
      email: "person@example.com",
      message: "Hello there!",
    });

    expect(response.ok).toBeFalsy();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it("returns 422 when reCAPTCHA verification fails", async () => {
    handleRecaptchaServerMock.mockResolvedValueOnce({
      success: false,
      message: "bot detected",
    });

    const response = await invokeRoute({
      name: "Ryan Bowler",
      email: "person@example.com",
      message: "Hello there, this is a longer message",
      token: "bad-token",
    });

    expect(handleRecaptchaServerMock).toHaveBeenCalledTimes(1);
    expect(sendMock).not.toHaveBeenCalled();
    expect(response.status).toBe(422);
  });

  it("returns bad res when message is too short", async () => {
    const response = await invokeRoute({
      name: "Ryan",
      email: "person@example.com",
      message: "Too short",
    });

    expect(response.ok).toBeFalsy();
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
      token: "oienoivoeifoivemr",
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(response.status).toBe(500);
    const body = await response.json();
    expect(body.message).toBe("Email Service Failed");
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
      token: "owinerfoeirm",
    });

    expect(sendMock).toHaveBeenCalledTimes(1);
    const [{ html }] = sendMock.mock.calls[0];
    expect(html).not.toContain("<script>");

    expect(response.status).toBe(200);
    const body = await response.json();
    expect(body.message).toBe("Email sent successfully");
  });
});

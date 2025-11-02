export default async function handleRecaptchaServer(token: string) {
  const secretKey = import.meta.env.RECAPTCHA_SECRET_KEY;
  if (!secretKey) {
    return {
      success: false,
      message: "reCAPTCHA secret key is not configured.",
    };
  }
  if (!token) {
    return { success: false, message: "Missing reCAPTCHA token." };
  }

  const recaptchaURL = "https://www.google.com/recaptcha/api/siteverify";
  const requestBody = new URLSearchParams({
    secret: secretKey,
    response: token,
  });

  try {
    const response = await fetch(recaptchaURL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: requestBody.toString(),
    });

    const responseData = await response.json();
    const {
      success,
      score = 0,
      action,
      hostname,
      ["error-codes"]: errorCodes,
    } = responseData;
    if (Array.isArray(errorCodes) && errorCodes.length > 0) {
      console.error("reCAPTCHA error codes:", errorCodes.join(", "));
    }
    if (!success || score < 0.5) {
      console.warn("reCAPTCHA rejected", { score, action, hostname });
      return {
        success: false,
        message: "ReCAPTCHA verification failed, bot detected.",
      };
    }

    return { success: true, message: "ReCAPTCHA verification success" };
  } catch (error) {
    console.error("reCAPTCHA verification failed:", error);
    return { success: false, message: "reCAPTCHA verification failed." };
  }
}

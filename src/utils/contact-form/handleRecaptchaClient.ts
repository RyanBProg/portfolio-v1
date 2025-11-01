export default async function handleRecaptchaClient() {
  type Grecaptcha = {
    ready: (cb: () => void) => void;
    execute: (siteKey: string, options: { action: string }) => Promise<string>;
    reset?: () => void;
  };

  const grecaptcha = window.grecaptcha as Grecaptcha;
  const siteKey = import.meta.env.PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey || !grecaptcha) {
    return {
      success: false,
      token: null,
      message: "reCAPTCHA is unavailable. Please try again later.",
    };
  }

  let token: string;
  try {
    token = await new Promise<string>((resolve, reject) => {
      grecaptcha!.ready(async () => {
        try {
          const value = await grecaptcha!.execute(siteKey, {
            action: "CONTACT",
          });
          resolve(value);
        } catch (error) {
          reject(error);
        }
      });
    });
    return {
      success: true,
      token,
      message: "reCAPTCHA client token success",
    };
  } catch (error) {
    grecaptcha!.reset?.();
    return {
      success: false,
      token: null,
      message: "reCAPTCHA is unavailable. Please try again later.",
    };
  }
}

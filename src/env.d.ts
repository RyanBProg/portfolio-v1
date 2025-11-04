export type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (siteKey: string, options: { action: string }) => Promise<string>;
  reset?: () => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
  }
}

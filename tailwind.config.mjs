import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SpaceGrotesk", ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        "projects-banner": "url('/projects-banner.png')",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

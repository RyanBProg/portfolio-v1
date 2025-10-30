/// <reference types="vitest" />
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom", // switch to "node" for testing only backend code
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});

import { defineConfig } from "vitest/config";
import path from "node:path";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/integration/**/*.spec.ts"],
    env: { BASE_URL: process.env.BASE_URL ?? "" },
    testTimeout: 30_000,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
});

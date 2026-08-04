import path from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "server-only": path.resolve(__dirname, "src/test/server-only.ts"),
    },
  },
  test: {
    environment: "node",
    setupFiles: ["./src/test/vitest.setup.ts"],
    include: ["src/**/*.test.ts"],
    exclude: ["node_modules", ".next", "tests/e2e"],
  },
});

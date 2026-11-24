import {defineConfig} from "vite-plus";
import {playwright} from "vite-plus/test/browser-playwright";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The docs app consumes `@rixl/ui` through the workspace dependency
// (`"@rixl/ui": "workspace:*"` in package.json). Bun symlinks it into
// node_modules; Vite resolves the import through the package's
// `exports` map. In `vite dev` the `development` condition wins and
// resolves to `packages/ui/src/**` for hot module reloading; in
// `vite build` the `import` condition falls through to `dist/**`, so
// the built bundle imports the packaged output.
export default defineConfig({
  plugins: [react({compiler: true}), tailwindcss()],
  test: {
    projects: [
      {
        extends: true,
        test: {
          name: "unit",
          environment: "happy-dom",
          include: ["src/**/__tests__/**/*.test.{ts,tsx}"],
          exclude: ["**/*.browser.test.tsx"],
        },
      },
      {
        extends: true,
        test: {
          name: "browser",
          include: ["src/**/__tests__/**/*.browser.test.tsx"],
          browser: {enabled: true, headless: true, provider: playwright(), instances: [{browser: "chromium"}]},
        },
      },
    ],
  },
  server: {
    port: 5176,
  },
});

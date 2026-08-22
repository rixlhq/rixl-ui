import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// The playground consumes `@rixl/ui` through the workspace dependency
// (`"@rixl/ui": "workspace:*"` in package.json). Bun symlinks it into
// node_modules; Vite resolves the import through the package's
// `exports` map. In `vite dev` the `development` condition wins and
// resolves to `packages/ui/src/**` for hot module reloading; in
// `vite build` the `import` condition falls through to `dist/**`, so
// the built bundle imports the packaged output.
export default defineConfig({
  plugins: [react({ compiler: true }), tailwindcss()],
  server: {
    port: 5176,
  },
});

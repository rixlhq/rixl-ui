import {defineConfig} from "vite-plus";

// `@rixl/ui` ships one entry per component so consumers can import a single
// component and get only its code (tree-shaking friendly). The barrel at
// `src/index.ts` re-exports everything for convenience but is not the
// recommended way to consume the library at scale.
//
// Imports inside `src/` are relative (no path aliases). This keeps the
// package portable — downstream consumers reading our source in a stack
// trace see paths that resolve without knowing our tooling config.
export default defineConfig({
  pack: {
    entry: {
      index: "src/index.ts",
      button: "src/components/button/index.ts",
      label: "src/components/label/index.ts",
      separator: "src/components/separator/index.ts",
    },
    // Manage `package.json#exports` by hand — we ship both compiled JS
    // subpaths and a raw CSS subpath (preset.css) that vp's auto-exports
    // generator strips on every rebuild.
    exports: false,
    dts: true,
    format: "esm",
    minify: false,
    platform: "browser",
    sourcemap: true,
    target: "es2022",
  },
  lint: {
    ignorePatterns: ["dist/**", "examples/**"],
  },
  fmt: {
    ignorePatterns: ["dist/**", "examples/**", "CHANGELOG.md", ".release-please-manifest.json"],
    printWidth: 140,
    tabWidth: 2,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    arrowParens: "always",
    bracketSpacing: false,
    bracketSameLine: false,
    endOfLine: "lf",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    isolate: true,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary", "html", "lcov"],
      reportOnFailure: true,
      cleanOnRerun: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["node_modules/", "dist/", "**/*.config.{js,ts}", "**/types.ts", "**/*.d.ts", "**/index.ts", "**/__tests__/**"],
    },
  },
  staged: {
    "*.{js,ts,tsx}": "vp check --fix",
    "*.{json,md,yaml,yml,css}": "vp fmt --write",
  },
});

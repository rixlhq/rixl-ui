import {defineConfig} from "vite-plus";
import type {TestProjectInlineConfiguration} from "vite-plus/test/config";
import tailwindcss from "@tailwindcss/vite";
import {playwright} from "@vitest/browser-playwright";

// Exported for test/stryker.vitest.config.ts, which reruns only this project per mutant.
export const unitProject: TestProjectInlineConfiguration = {
  test: {
    name: "unit",
    globals: true,
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    isolate: true,
    pool: "vmThreads",
    restoreMocks: true,
    unstubGlobals: true,
    unstubEnvs: true,
    include: ["src/**/__tests__/**/*.test.{ts,tsx}"],
    exclude: ["src/**/*.browser.test.{ts,tsx}"],
  },
};

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
      badge: "src/components/badge/index.ts",
      avatar: "src/components/avatar/index.ts",
      skeleton: "src/components/skeleton/index.ts",
      progress: "src/components/progress/index.ts",
      alert: "src/components/alert/index.ts",
      input: "src/components/input/index.ts",
      textarea: "src/components/textarea/index.ts",
      checkbox: "src/components/checkbox/index.ts",
      "radio-group": "src/components/radio-group/index.ts",
      switch: "src/components/switch/index.ts",
      select: "src/components/select/index.ts",
      "input-otp": "src/components/input-otp/index.ts",
      tooltip: "src/components/tooltip/index.ts",
      popover: "src/components/popover/index.ts",
      dialog: "src/components/dialog/index.ts",
      "alert-dialog": "src/components/alert-dialog/index.ts",
      sheet: "src/components/sheet/index.ts",
      "dropdown-menu": "src/components/dropdown-menu/index.ts",
      collapsible: "src/components/collapsible/index.ts",
      tabs: "src/components/tabs/index.ts",
      breadcrumb: "src/components/breadcrumb/index.ts",
      sidebar: "src/components/sidebar/index.ts",
      card: "src/components/card/index.ts",
      table: "src/components/table/index.ts",
      calendar: "src/components/calendar/index.ts",
      "copy-block": "src/components/copy-block/index.ts",
      "empty-state": "src/components/empty-state/index.ts",
      toaster: "src/components/toaster/index.ts",
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
    plugins: ["react", "react-perf", "typescript", "jsx-a11y"],
    ignorePatterns: ["dist/**", "examples/**", "__tests__", "*.test.ts", "*.test.tsx"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "typescript/no-explicit-any": "error",
      // The caps .agents/rules/code-style.md lists (the anti-slop guide, layer 5).
      "eslint/complexity": ["error", {max: 10}],
      "eslint/max-lines-per-function": ["error", {max: 50, skipComments: true}],
      "eslint/max-lines": ["error", {max: 250, skipBlankLines: true, skipComments: true}],
      "eslint/max-params": ["error", 3],
      "eslint/max-depth": ["error", 3],
      "eslint/max-statements": ["error", 25],
      "eslint/max-classes-per-file": ["error", 1],
    },
    options: {
      typeAware: true,
      typeCheck: true,
      // A warning nobody fixes is noise: `vp check` (hook and CI) fails on any.
      denyWarnings: true,
      reportUnusedDisableDirectives: "error",
    },
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
    projects: [
      unitProject,
      {
        // Tailwind builds test/browser.css, so axe checks colour contrast against the real styles.
        plugins: [tailwindcss()],
        optimizeDeps: {include: ["react", "react-dom/client", "axe-core"]},
        test: {
          name: "browser",
          globals: true,
          setupFiles: ["./test/setup.browser.ts"],
          include: ["src/**/__tests__/**/*.browser.test.{ts,tsx}"],
          browser: {
            enabled: true,
            provider: playwright(),
            headless: true,
            instances: [{browser: "chromium"}],
          },
        },
      },
    ],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "json-summary", "html", "lcov"],
      reportOnFailure: true,
      cleanOnRerun: true,
      include: ["src/**/*.{ts,tsx}"],
      exclude: ["node_modules/", "dist/", "**/*.config.{js,ts}", "**/types.ts", "**/*.d.ts", "**/index.ts", "**/__tests__/**"],
      // Measured 86.62 / 79.78 / 85.49 / 87.73 (unit and browser projects) when set, rounded down with at
      // least half a point spare: the figure can move a little between runs. Raise it as tests land; never lower it.
      thresholds: {statements: 86, branches: 79, functions: 84, lines: 87},
    },
  },
});

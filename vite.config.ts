import {defineConfig} from "vite-plus";

export default defineConfig({
  lint: {
    plugins: ["react", "react-perf", "typescript", "jsx-a11y"],
    jsPlugins: [{name: "vite-plus", specifier: "vite-plus/oxlint-plugin"}],
    ignorePatterns: ["**/dist/**", "**/__tests__/**", "**/*.test.ts", "**/*.test.tsx"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "typescript/no-explicit-any": "error",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    options: {
      typeAware: true,
      typeCheck: true,
      denyWarnings: true,
      reportUnusedDisableDirectives: "error",
    },
    overrides: [
      {
        files: ["packages/ui/**/*.test.{ts,tsx}", "packages/ui/vitest.setup.ts", "packages/ui/test/forward-ref.ts"],
        rules: {"vite-plus/prefer-vite-plus-imports": "off"},
      },
      {
        files: ["packages/ui/src/**/*.{ts,tsx}"],
        rules: {
          "eslint/complexity": ["error", {max: 10}],
          "eslint/max-lines-per-function": ["error", {max: 50, skipComments: true}],
          "eslint/max-lines": ["error", {max: 250, skipBlankLines: true, skipComments: true}],
          "eslint/max-params": ["error", 3],
          "eslint/max-depth": ["error", 3],
          "eslint/max-statements": ["error", 25],
          "eslint/max-classes-per-file": ["error", 1],
        },
      },
    ],
  },
  fmt: {
    ignorePatterns: [
      "**/dist/**",
      "**/node_modules/**",
      "openapi.yaml",
      "packages/ui/CHANGELOG.md",
      "packages/ui/.release-please-manifest.json",
    ],
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
});

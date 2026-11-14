/** @type {import("@stryker-mutator/api/core").PartialStrykerOptions} */
export default {
  testRunner: "vitest",
  plugins: ["@stryker-mutator/vitest-runner"],
  vitest: {configFile: "test/stryker.vitest.config.ts"},
  coverageAnalysis: "perTest",
  incremental: true,
  incrementalFile: ".stryker-cache/incremental.json",
  // Everything the unit project tests. The browser project is too slow to rerun per mutant.
  mutate: ["src/**/*.{ts,tsx}", "!**/__tests__/**", "!**/index.ts", "!**/*.d.ts"],
  ignorePatterns: ["coverage", "reports", "dist", ".vitest", ".stryker-cache"],
  // Stryker rewrites tsconfig files through the TypeScript JS API, which TypeScript 7 no longer ships.
  // Our tsconfig only references files inside the sandbox, so the rewrite is skipped by pointing at no file.
  tsconfigFile: "",
  reporters: ["html", "json", "clear-text", "progress"],
  htmlReporter: {fileName: "reports/mutation/index.html"},
  jsonReporter: {fileName: "reports/mutation/mutation.json"},
  thresholds: {high: 90, low: 80, break: null},
  tempDirName: ".stryker-tmp",
  concurrency: 4,
};

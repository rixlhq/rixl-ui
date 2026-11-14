import baseConfig, {unitProject} from "../vite.config.ts";

// Stryker reruns the tests once per mutant, so it uses only the fast unit project, without coverage.
export default {
  ...baseConfig,
  test: {...baseConfig.test, coverage: {enabled: false}, projects: [unitProject]},
};

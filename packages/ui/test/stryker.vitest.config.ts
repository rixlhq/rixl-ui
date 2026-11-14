import type {UserConfig} from "vite-plus";
import baseConfig, {unitProject} from "../vite.config.ts";

// Stryker reruns the tests once per mutant, so it uses only the fast unit project, without coverage.
const strykerConfig: UserConfig = {
  ...baseConfig,
  test: {...baseConfig.test, coverage: {enabled: false}, projects: [unitProject]},
};

export default strykerConfig;

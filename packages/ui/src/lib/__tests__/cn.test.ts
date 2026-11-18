import {mkdtempSync, readFileSync} from "node:fs";
import {tmpdir} from "node:os";
import {join} from "node:path";
import {build} from "cn/build";
import {describe, expect, it} from "vitest";
import {cn} from "../cn";

const packageRoot = join(import.meta.dirname, "../../..");

describe("cn", () => {
  it.each([
    ["rounded-rixl-md", "rounded-full"],
    ["shadow-rixl-xs", "shadow-none"],
    ["duration-rixl-fast", "duration-500"],
    ["ease-rixl-out", "ease-linear"],
    ["duration-sidebar", "duration-0"],
    ["ease-curve-sidebar", "ease-in-out"],
  ])("lets a consumer class replace the %s token default", (token, override) => {
    expect(cn(token, override)).toBe(override);
  });

  it("treats a rixl shadow token as a shadow, not a shadow colour", () => {
    expect(cn("shadow-rixl-md", "shadow-black/10")).toBe("shadow-rixl-md shadow-black/10");
  });

  it("keeps a rixl text colour beside a font size", () => {
    expect(cn("text-sm", "text-rixl-fg")).toBe("text-sm text-rixl-fg");
  });

  it("ships merge tables generated from the current preset tokens", async () => {
    const {source} = await build({
      cwd: packageRoot,
      full: true,
      css: "src/styles/preset.css",
      config: "cn.config.mjs",
      out: join(mkdtempSync(join(tmpdir(), "cn-tables-")), "cn-tables.ts"),
    });
    expect(readFileSync(join(packageRoot, "src/lib/cn-tables.ts"), "utf8")).toBe(source);
  });
});

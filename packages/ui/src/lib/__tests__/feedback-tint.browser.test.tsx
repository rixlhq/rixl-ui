import {afterEach, describe, expect, it} from "vitest";
import {userEvent} from "vitest/browser";
import {render, cleanup} from "@testing-library/react";
import {Alert, AlertDescription, AlertTitle} from "../../components/alert";
import {Badge} from "../../components/badge";
import {Toaster, toast} from "../../components/toaster";
import {contrastRatio, paintedBackground} from "../../../test/contrast";

const THEMES = ["light", "dark"] as const;
const WCAG_AA_TEXT = 4.5;
// Rounding: Toaster mixes over an opaque surface, the others blend alpha at paint time.
const TINT_TOLERANCE = 1;

type Theme = (typeof THEMES)[number];

async function renderFeedback(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const view = render(
    <div data-testid="backdrop" className="bg-rixl-surface h-96 p-4">
      {(["destructive", "success", "warning"] as const).map((variant) => (
        <Alert key={variant} variant={variant} data-variant={variant}>
          <AlertTitle>Title</AlertTitle>
          <AlertDescription>Description</AlertDescription>
        </Alert>
      ))}
      <Badge variant="success">Live</Badge>
      <Badge variant="warning">Pending</Badge>
      <Toaster closeButton duration={Infinity} />
    </div>
  );
  toast.success("Saved", {description: "Your changes are live."});
  toast.error("Failed", {description: "The file is too large."});
  toast.warning("Careful", {description: "Storage is almost full."});
  await expect.poll(() => document.querySelectorAll("[data-sonner-toast]").length).toBe(3);
  return view.getByTestId("backdrop");
}

const alertFor = (backdrop: Element, variant: string) => backdrop.querySelector(`[data-slot=alert][data-variant=${variant}]`)!;
const toastFor = (type: string) => document.querySelector(`[data-sonner-toast][data-type=${type}]`)!;

describe("feedback tints", () => {
  afterEach(() => {
    toast.dismiss();
    cleanup();
    document.documentElement.removeAttribute("data-theme");
  });

  for (const theme of THEMES) {
    describe(`in the ${theme} theme`, () => {
      it("keeps Alert text at 4.5:1 on its tint", async () => {
        const backdrop = await renderFeedback(theme);
        for (const variant of ["destructive", "success", "warning"]) {
          const alert = alertFor(backdrop, variant);
          for (const slot of ["alert-title", "alert-description"]) {
            const text = alert.querySelector(`[data-slot=${slot}]`)!;
            expect(contrastRatio(text, alert, backdrop), `${variant} ${slot}`).toBeGreaterThanOrEqual(WCAG_AA_TEXT);
          }
        }
      });

      it("keeps Badge text at 4.5:1 on its tint", async () => {
        const backdrop = await renderFeedback(theme);
        for (const badge of backdrop.querySelectorAll("[data-slot=badge]")) {
          expect(contrastRatio(badge, badge, backdrop), badge.textContent ?? "").toBeGreaterThanOrEqual(WCAG_AA_TEXT);
        }
      });

      it("keeps a linked Badge's text at 4.5:1 while hovered", async () => {
        document.documentElement.setAttribute("data-theme", theme);
        const {getByTestId, getByText} = render(
          <div data-testid="backdrop" className="bg-rixl-surface p-4">
            <Badge variant="success" className="transition-none" render={<a href="#live">Live</a>} />
            <Badge variant="warning" className="transition-none" render={<a href="#pending">Pending</a>} />
          </div>
        );
        const backdrop = getByTestId("backdrop");
        for (const label of ["Live", "Pending"]) {
          const badge = getByText(label);
          await userEvent.hover(badge);
          expect(contrastRatio(badge, badge, backdrop), label).toBeGreaterThanOrEqual(WCAG_AA_TEXT);
        }
      });

      it("keeps Toaster title and description at 4.5:1 on their tint", async () => {
        const backdrop = await renderFeedback(theme);
        for (const type of ["success", "error", "warning"]) {
          const element = toastFor(type);
          for (const part of ["data-title", "data-description"]) {
            const text = element.querySelector(`[${part}]`)!;
            expect(contrastRatio(text, element, backdrop), `${type} ${part}`).toBeGreaterThanOrEqual(WCAG_AA_TEXT);
          }
        }
      });

      it("draws the same fill for a feedback colour in Alert, Badge and Toaster", async () => {
        const backdrop = await renderFeedback(theme);
        const badges = backdrop.querySelectorAll("[data-slot=badge]");
        const pairs = [
          {alert: alertFor(backdrop, "success"), badge: badges[0], toast: toastFor("success")},
          {alert: alertFor(backdrop, "warning"), badge: badges[1], toast: toastFor("warning")},
        ];
        for (const {alert, badge, toast: toastElement} of pairs) {
          const fill = paintedBackground(alert, backdrop);
          expect(paintedBackground(badge, backdrop)).toEqual(fill);
          paintedBackground(toastElement, backdrop).forEach((channel, index) => {
            expect(Math.abs(channel - fill[index]!)).toBeLessThanOrEqual(TINT_TOLERANCE);
          });
        }
        const danger = alertFor(backdrop, "destructive");
        paintedBackground(toastFor("error"), backdrop).forEach((channel, index) => {
          expect(Math.abs(channel - paintedBackground(danger, backdrop)[index]!)).toBeLessThanOrEqual(TINT_TOLERANCE);
        });
      });
    });
  }
});

import type {CSSProperties} from "react";
import type {ToasterProps, ToastT} from "sonner";
import {Toaster as SonnerToaster, toast, type ExternalToast} from "sonner";

import {cn} from "../../lib/cn";

const FEEDBACK_BACKGROUND_SHARE = "10%";
const FEEDBACK_BORDER_SHARE = "30%";
// Raw success and warning colours miss 4.5:1 as text on a light surface; mixing toward the foreground darkens them on light and lightens them on dark.
const FEEDBACK_TEXT_SHARE = "55%";

/** Background, border and text for one feedback colour, all derived from tokens so they follow `[data-theme]`. oklab, because oklch would interpolate the hue toward the surface's and shift the colour. */
function feedbackColors(name: "success" | "error" | "warning", token: string) {
  return {
    [`--${name}-bg`]: `color-mix(in oklab, var(${token}) ${FEEDBACK_BACKGROUND_SHARE}, var(--rixl-surface))`,
    [`--${name}-border`]: `color-mix(in oklab, var(${token}) ${FEEDBACK_BORDER_SHARE}, var(--rixl-surface))`,
    [`--${name}-text`]: `color-mix(in oklab, var(${token}) ${FEEDBACK_TEXT_SHARE}, var(--rixl-fg))`,
  };
}

/**
 * Sonner reads its palette from CSS variables set on the toaster element for its
 * own light and dark themes. Inline values beat those rules, so pointing the
 * variables at tokens re-themes toasts with the rixl theme, without React state.
 */
const toasterVariables = {
  "--normal-bg": "var(--rixl-surface)",
  "--normal-bg-hover": "var(--rixl-surface-muted)",
  "--normal-text": "var(--rixl-fg)",
  "--normal-border": "var(--rixl-border)",
  "--normal-border-hover": "var(--rixl-border-strong)",
  // There is no info token, so info toasts stay neutral.
  "--info-bg": "var(--rixl-surface)",
  "--info-border": "var(--rixl-border)",
  "--info-text": "var(--rixl-fg)",
  ...feedbackColors("success", "--rixl-success"),
  ...feedbackColors("error", "--rixl-danger"),
  ...feedbackColors("warning", "--rixl-warning"),
  // Sonner's close-button hover and loading spinner read its grey scale.
  "--gray2": "var(--rixl-surface-muted)",
  "--gray5": "var(--rixl-border-strong)",
  "--gray11": "var(--rixl-fg-muted)",
  "--border-radius": "var(--rixl-radius-lg)",
} as const;

/*
 * Sonner injects its stylesheet unlayered, which beats Tailwind's layered
 * utilities whatever their specificity, so only an `!important` utility can
 * override what a variable does not reach.
 */
const focusRing = "focus-visible:ring-[3px]! focus-visible:ring-rixl-ring/50!";
const buttonShape = "h-8! rounded-rixl-md! px-3! text-sm! font-medium!";

const defaultClassNames = {
  toast: cn("shadow-rixl-lg!", focusRing),
  description: "text-current/75!",
  actionButton: cn(buttonShape, "bg-rixl-primary! text-rixl-primary-fg! hover:bg-rixl-primary-hover!", focusRing),
  cancelButton: cn(buttonShape, "bg-rixl-secondary! text-rixl-secondary-fg! hover:bg-rixl-secondary-hover!", focusRing),
  closeButton: focusRing,
};

type ToastClassNames = NonNullable<NonNullable<ToasterProps["toastOptions"]>["classNames"]>;

/** Per part, so a consumer's class for one part keeps the defaults of the others. */
function mergeClassNames(consumer: ToastClassNames = {}): ToastClassNames {
  const merged: ToastClassNames = {...consumer};
  for (const part of Object.keys(defaultClassNames) as (keyof typeof defaultClassNames)[]) {
    merged[part] = cn(defaultClassNames[part], consumer[part]);
  }
  return merged;
}

/**
 * Rixl Toaster — sonner wrapper wired to `--rixl-*` design tokens.
 * Re-exports sonner's Toaster and toast; consumers use
 * `<Toaster />` once at app root and call `toast()` anywhere.
 *
 * Colours come from tokens, so toasts follow `[data-theme="dark"]` without a
 * `theme` prop. Rich colours are on; pass `richColors={false}` for neutral
 * success, error and warning toasts. Sonner's own enter, exit and stack motion
 * is left as it ships.
 */
function Toaster({className, style, toastOptions, richColors = true, ...props}: ToasterProps) {
  return (
    <SonnerToaster
      className={cn("toaster group", className)}
      richColors={richColors}
      style={{...toasterVariables, ...style} as CSSProperties}
      toastOptions={{...toastOptions, classNames: mergeClassNames(toastOptions?.classNames)}}
      {...props}
    />
  );
}

export {Toaster, toast};
export type {ToasterProps, ToastT, ExternalToast};

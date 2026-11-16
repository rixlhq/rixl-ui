import type {CSSProperties} from "react";
import type {ToasterProps, ToastT} from "sonner";
import {Toaster as SonnerToaster, toast, type ExternalToast} from "sonner";

import {cn} from "cn";

/**
 * Rixl Toaster — sonner wrapper wired to `--rixl-*` design tokens.
 * Re-exports sonner's Toaster and toast; consumers use
 * `<Toaster />` once at app root and call `toast()` anywhere.
 */
function Toaster({className, style, toastOptions, ...props}: ToasterProps) {
  return (
    <SonnerToaster
      className={cn("toaster group", className)}
      style={
        {
          "--normal-bg": "var(--rixl-surface)",
          "--normal-text": "var(--rixl-fg)",
          "--normal-border": "var(--rixl-border)",
          "--border-radius": "var(--rixl-radius-lg)",
          ...style,
        } as CSSProperties
      }
      toastOptions={{
        classNames: {
          toast: "group toast bg-rixl-surface text-rixl-fg border-rixl-border shadow-rixl-lg rounded-rixl-lg",
          description: "text-rixl-fg-muted",
          actionButton: "bg-rixl-primary text-rixl-primary-fg",
          cancelButton: "bg-rixl-secondary text-rixl-secondary-fg",
        },
        ...toastOptions,
      }}
      {...props}
    />
  );
}

export {Toaster, toast};
export type {ToasterProps, ToastT, ExternalToast};

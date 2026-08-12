import type {ToasterProps, ToastT} from "sonner";
import {Toaster as SonnerToaster, toast as sonnerToast, type ToastT as SonnerToastT, type ExternalToast} from "sonner";

import {cn} from "cnfast";

/**
 * Rixl Toaster — sonner wrapper with rixl defaults.
 * Re-exports sonner's Toaster and toast; consumers use
 * `<Toaster />` once at app root and call `toast()` anywhere.
 */
function Toaster({className, ...props}: ToasterProps) {
  return <SonnerToaster className={cn("toaster group", className)} {...props} />;
}

function toast(message: string | React.ReactNode, options?: ExternalToast): string | number {
  return sonnerToast(message, options);
}

export {Toaster, toast};
export type {ToasterProps, ToastT, ExternalToast};

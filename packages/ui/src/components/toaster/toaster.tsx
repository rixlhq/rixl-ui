import type {ToasterProps, ToastT} from "sonner";
import {Toaster as SonnerToaster, toast, type ExternalToast} from "sonner";

import {cn} from "cn";

/**
 * Rixl Toaster — sonner wrapper with rixl defaults.
 * Re-exports sonner's Toaster and toast; consumers use
 * `<Toaster />` once at app root and call `toast()` anywhere.
 */
function Toaster({className, ...props}: ToasterProps) {
  return <SonnerToaster className={cn("toaster group", className)} {...props} />;
}

export {Toaster, toast};
export type {ToasterProps, ToastT, ExternalToast};

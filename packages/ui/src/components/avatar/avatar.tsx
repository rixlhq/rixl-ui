import {forwardRef} from "react";
import {Avatar as AvatarPrimitive} from "@base-ui/react/avatar";
import {cn} from "../../lib/cn";

/**
 * Rixl Avatar — image with fallback initials/icon.
 *
 * Ported verbatim from dashboard's shadcn Avatar (Base UI Avatar
 * primitive). Composed of three subcomponents:
 *
 * - `Avatar` — the root (circular, fixed size-8).
 * - `AvatarImage` — the image; hides itself while loading or on error.
 * - `AvatarFallback` — shown while the image loads or when it fails.
 *   Wrap initials or an icon here.
 *
 * Class names swapped to `--rixl-*` tokens per the hybrid policy.
 */
const Avatar = forwardRef<HTMLSpanElement, AvatarPrimitive.Root.Props>(function Avatar({className, ...props}, ref) {
  return (
    <AvatarPrimitive.Root
      ref={ref}
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
});
Avatar.displayName = "Avatar";

const AvatarImage = forwardRef<HTMLImageElement, AvatarPrimitive.Image.Props>(function AvatarImage({className, ...props}, ref) {
  return (
    <AvatarPrimitive.Image
      ref={ref}
      data-slot="avatar-image"
      className={cn("aspect-square size-full object-cover", className)}
      {...props}
    />
  );
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = forwardRef<HTMLSpanElement, AvatarPrimitive.Fallback.Props>(function AvatarFallback({className, ...props}, ref) {
  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      data-slot="avatar-fallback"
      className={cn("bg-rixl-surface-muted flex size-full items-center justify-center rounded-full", className)}
      {...props}
    />
  );
});
AvatarFallback.displayName = "AvatarFallback";

export {Avatar, AvatarImage, AvatarFallback};
export type AvatarProps = AvatarPrimitive.Root.Props;
export type AvatarImageProps = AvatarPrimitive.Image.Props;
export type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;

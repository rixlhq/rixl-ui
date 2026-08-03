import {Avatar as AvatarPrimitive} from "@base-ui-components/react/avatar";
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
function Avatar({className, ...props}: AvatarPrimitive.Root.Props) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
}

function AvatarImage({className, ...props}: AvatarPrimitive.Image.Props) {
  return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full", className)} {...props} />;
}

function AvatarFallback({className, ...props}: AvatarPrimitive.Fallback.Props) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn("bg-rixl-surface-muted flex size-full items-center justify-center rounded-full", className)}
      {...props}
    />
  );
}

export {Avatar, AvatarImage, AvatarFallback};
export type AvatarProps = AvatarPrimitive.Root.Props;
export type AvatarImageProps = AvatarPrimitive.Image.Props;
export type AvatarFallbackProps = AvatarPrimitive.Fallback.Props;

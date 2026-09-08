import {forwardRef, isValidElement} from "react";
import {Button as ButtonPrimitive} from "@base-ui/react/button";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

/**
 * Rixl Button — the primary action primitive.
 *
 * Serves dashboard (shadcn-shaped call sites) and docs/landing (fumadocs-shaped
 * ones) from one component, so it answers to both naming conventions:
 *
 *   variant="default"  ≡  color="primary"     (dashboard ≡ fumadocs)
 *   size="icon-sm" / "icon-xs"                (fumadocs-only sizes)
 *
 * `color` exists because fumadocs' own components forward a `color` prop; it is
 * an alias for `variant`, and `variant` wins when both are passed.
 *
 * Base UI's polymorphism (`render`, `nativeButton`) is preserved: pass
 * `render={<Link/>}` to render a styled anchor while keeping keyboard
 * semantics correct.
 */

/**
 * Press feedback, shared by every pressable component via `--rixl-press-scale`.
 *
 * Scale rather than translate: dashboard buttons are fixed-height and
 * docs/landing buttons are padding-sized, and a scale reads identically on
 * both. A translate would need its offset retuned per size and per geometry.
 *
 * `motion-reduce` drops the transform only — the colour and shadow changes stay,
 * so the press is still legible without movement.
 */
const press =
  "active:scale-[var(--rixl-press-scale)] motion-reduce:active:scale-100 " +
  "transition-[transform,background-color,box-shadow,border-color,color] " +
  "duration-rixl-fast ease-rixl-out";

/** Shadow collapses as the surface depresses, so it reads as pushed in rather than merely smaller. */
const pressShadow = "shadow-rixl-xs active:shadow-none";

const variantClasses = {
  default: `bg-rixl-primary text-rixl-primary-fg hover:bg-rixl-primary-hover active:bg-rixl-primary-active ${pressShadow}`,
  destructive: `bg-rixl-danger text-rixl-danger-fg hover:bg-rixl-danger-hover active:bg-rixl-danger-active focus-visible:ring-rixl-danger/20 ${pressShadow}`,
  outline: `border border-rixl-border bg-rixl-bg hover:bg-rixl-surface-muted hover:text-rixl-fg hover:border-rixl-border-strong active:bg-rixl-secondary-active ${pressShadow}`,
  secondary: `bg-rixl-secondary text-rixl-secondary-fg hover:bg-rixl-secondary-hover active:bg-rixl-secondary-active ${pressShadow}`,
  ghost: "hover:bg-rixl-surface-muted hover:text-rixl-fg active:bg-rixl-secondary-active",
  // Inline text: scaling it against surrounding copy looks broken, so `link`
  // opts out of the press transform and signals with colour alone.
  link: "text-rixl-primary underline underline-offset-4 active:scale-100 active:text-rixl-primary-active",
} as const;

/** fumadocs calls the brand action `primary`; dashboard calls it `default`. */
const colorClasses = {
  ...variantClasses,
  primary: variantClasses.default,
} as const;

const buttonVariants = cva(
  "inline-flex items-center cursor-pointer justify-center gap-2 whitespace-nowrap rounded-rixl-md text-sm font-medium " +
    "disabled:pointer-events-none disabled:opacity-50 " +
    "[&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 " +
    "outline-none focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px] " +
    "aria-invalid:ring-rixl-danger/20 aria-invalid:border-rixl-danger " +
    press,
  {
    variants: {
      variant: variantClasses,
      color: colorClasses,
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-rixl-md gap-1.5 px-3 has-[>svg]:px-2.5",
        // Wider surface, shallower press: same ratio reads as more travel.
        lg: "h-10 rounded-rixl-md px-6 has-[>svg]:px-4 active:scale-[var(--rixl-press-scale-lg)]",
        icon: "size-9",
        "icon-sm": "size-8 [&_svg:not([class*='size-'])]:size-4",
        "icon-xs": "size-7 [&_svg:not([class*='size-'])]:size-3.5",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

type ButtonVariant = keyof typeof variantClasses;
type ButtonColor = keyof typeof colorClasses;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

const isButtonColor = (value: unknown): value is ButtonColor => typeof value === "string" && value in colorClasses;

/**
 * `color` is deliberately widened past the union. `<button>` carries a
 * deprecated HTML `color` attribute, so components that spread native button
 * props onto us (Calendar's day button does) would otherwise fail to typecheck.
 * Unknown values are ignored rather than applied.
 */
export type ButtonProps = Omit<ButtonPrimitive.Props, "color"> & {
  variant?: ButtonVariant | null;
  color?: ButtonColor | (string & {});
  size?: ButtonSize | null;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({className, variant, color, size, nativeButton, render, ...props}, ref) => {
  // When rendered as a non-<button> element (e.g. render={<Link/>}), tell Base UI so it drops native button semantics.
  const isNativeButton = nativeButton ?? (isValidElement(render) ? render.type === "button" : true);
  // `variant` wins over `color`; falling back to `default` keeps a bare
  // <Button> styled when neither is passed.
  const resolved: ButtonColor = variant ?? (isButtonColor(color) ? color : "default");
  return (
    <ButtonPrimitive
      ref={ref}
      data-slot="button"
      nativeButton={isNativeButton}
      render={render}
      className={cn(buttonVariants({color: resolved, size, className}))}
      {...props}
    />
  );
});
Button.displayName = "Button";

export {Button, buttonVariants};

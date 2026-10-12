import {forwardRef, type ComponentProps, type ReactNode} from "react";
import {Input as InputPrimitive} from "@base-ui/react/input";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "cn";

/**
 * Rixl Input — the single-line text input primitive.
 *
 * Base UI Input styled on `--rixl-*` tokens. A bare `<Input/>` is unchanged
 * from the original port; everything below is additive and backwards-compatible:
 *
 * - `inputSize` → `sm | default | lg` (default matches the old fixed h-9).
 *   Named `inputSize`, not `size`, so it never collides with the native
 *   `<input size>` character-width attribute.
 * - `startIcon` / `endIcon` → the icon-in-field pattern the dashboard hand-rolls
 *   everywhere (search glyph, password toggle). When either is set the input is
 *   wrapped in a `relative` group and auto-padded to clear the icon; without
 *   them a lone `<input>` is rendered exactly as before, so existing call sites
 *   that bring their own `relative`/`pl-9` wrapper are untouched.
 *
 * States covered: hover (border strengthens), focus-visible (3px primary ring),
 * disabled (dimmed, no pointer), read-only (muted surface, no hover shift),
 * and `aria-invalid` (3px danger ring + faint danger tint, held on hover).
 * Icons pick up focus via `group-focus-within`.
 *
 * Motion follows the shared language — `duration-rixl-fast ease-rixl-out` on the
 * token-driven properties only, so nothing moves under reduced motion.
 */
const inputVariants = cva(
  cn(
    "file:text-rixl-fg placeholder:text-rixl-fg-muted selection:bg-rixl-primary selection:text-rixl-primary-fg",
    "border-rixl-border flex w-full min-w-0 rounded-rixl-md border bg-transparent py-1 shadow-rixl-xs outline-none",
    "file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "transition-[color,box-shadow,border-color] duration-rixl-fast ease-rixl-out",
    "hover:border-rixl-border-strong",
    "read-only:bg-rixl-surface-muted read-only:cursor-default read-only:hover:border-rixl-border",
    "disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
    "focus-visible:border-rixl-ring focus-visible:ring-rixl-ring/50 focus-visible:ring-[3px]",
    "aria-invalid:border-rixl-danger aria-invalid:ring-rixl-danger/20 aria-invalid:ring-[3px]",
    "aria-invalid:bg-rixl-danger/10 aria-invalid:hover:border-rixl-danger"
  ),
  {
    variants: {
      inputSize: {
        sm: "h-8 px-2.5 text-sm",
        default: "h-9 px-3 text-base md:text-sm",
        lg: "h-10 px-3.5 text-base",
      },
    },
    defaultVariants: {inputSize: "default"},
  }
);

type InputSize = NonNullable<VariantProps<typeof inputVariants>["inputSize"]>;

/** Extra padding so text clears an icon, and the icon inset, kept in step per size. */
const startPad: Record<InputSize, string> = {sm: "pl-8", default: "pl-9", lg: "pl-10"};
const endPad: Record<InputSize, string> = {sm: "pr-8", default: "pr-9", lg: "pr-10"};
const startInset: Record<InputSize, string> = {sm: "left-2.5", default: "left-3", lg: "left-3.5"};
const endInset: Record<InputSize, string> = {sm: "right-2.5", default: "right-3", lg: "right-3.5"};

const iconBase = cn(
  "absolute top-1/2 flex -translate-y-1/2 items-center text-rixl-fg-muted",
  "transition-colors duration-rixl-fast ease-rixl-out group-focus-within:text-rixl-fg",
  "[&_svg]:size-4 [&_svg]:shrink-0"
);

export type InputProps = ComponentProps<"input"> &
  VariantProps<typeof inputVariants> & {
    /** Decorative or interactive node pinned to the leading edge (e.g. a search glyph). */
    startIcon?: ReactNode;
    /** Node pinned to the trailing edge (e.g. a password-visibility toggle). */
    endIcon?: ReactNode;
    /** className for the wrapper rendered when `startIcon`/`endIcon` are present. */
    wrapperClassName?: string;
  };

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({className, type, inputSize, startIcon, endIcon, wrapperClassName, ...props}, ref) => {
    const size: InputSize = inputSize ?? "default";
    const inputEl = (
      <InputPrimitive
        ref={ref}
        type={type}
        data-slot="input"
        className={cn(inputVariants({inputSize}), startIcon && startPad[size], endIcon && endPad[size], className)}
        {...props}
      />
    );

    if (!startIcon && !endIcon) return inputEl;

    return (
      <div data-slot="input-wrapper" className={cn("group relative w-full", wrapperClassName)}>
        {/* Decorative by default: clicks fall through to the field. */}
        {startIcon ? (
          <span data-slot="input-start-icon" className={cn(iconBase, "pointer-events-none", startInset[size])}>
            {startIcon}
          </span>
        ) : null}
        {inputEl}
        {/* Interactive by default so a toggle/clear button inside it works. */}
        {endIcon ? (
          <span data-slot="input-end-icon" className={cn(iconBase, endInset[size])}>
            {endIcon}
          </span>
        ) : null}
      </div>
    );
  }
);
Input.displayName = "Input";

export {Input, inputVariants};

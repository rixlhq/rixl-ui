import {forwardRef, type ForwardedRef, type ReactElement, type Ref} from "react";
import {Slider as SliderPrimitive} from "@base-ui/react/slider";
import {cn} from "../../lib/cn";

/**
 * Rixl Slider — a draggable value control on `--rixl-*` tokens.
 *
 * Base UI Slider owns focus, keyboard (arrows/Home/End/PageUp/PageDown) and
 * pointer dragging. Composition:
 * - `<Slider>` — the root; single value or range (`defaultValue={[20, 80]}`).
 * - `<SliderControl>` — the pressable/draggable area.
 * - `<SliderTrack>` — the full-length rail.
 * - `<SliderIndicator>` — the filled range from min (or between thumbs).
 * - `<SliderThumb>` — one per value; give each an `aria-label`.
 *
 * Motion: the thumb and indicator are repositioned by Base UI on every
 * pointer move, so they carry **no transform transition** — the thumb tracks
 * the pointer 1:1 with no lag or spring overshoot. Only colour/shadow
 * transitions (`duration-rixl-fast ease-rixl-out`) remain, plus the thumb's
 * press-in `scale` while dragging, which is off under reduced motion.
 */

export type SliderProps<Value extends number | readonly number[] = number | readonly number[]> = SliderPrimitive.Root.Props<Value>;

function SliderBase<Value extends number | readonly number[]>(
  {className, orientation = "horizontal", ...props}: SliderProps<Value>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      orientation={orientation}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

// `forwardRef` erases the generic, so the cast restores it: the runtime passes props through untouched.
export const Slider = forwardRef(SliderBase) as <Value extends number | readonly number[] = number | readonly number[]>(
  props: SliderProps<Value> & {ref?: Ref<HTMLDivElement>}
) => ReactElement;

export type SliderControlProps = SliderPrimitive.Control.Props;

export const SliderControl = forwardRef<HTMLDivElement, SliderControlProps>(function SliderControl(
  {className, ...props}: SliderControlProps,
  ref
) {
  return (
    <SliderPrimitive.Control
      ref={ref}
      data-slot="slider-control"
      className={cn(
        "relative flex grow touch-none items-center select-none",
        "data-[orientation=horizontal]:h-5 data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-5 data-[orientation=vertical]:flex-col",
        className
      )}
      {...props}
    />
  );
});
SliderControl.displayName = "SliderControl";

export type SliderTrackProps = SliderPrimitive.Track.Props;

export const SliderTrack = forwardRef<HTMLDivElement, SliderTrackProps>(function SliderTrack({className, ...props}: SliderTrackProps, ref) {
  return (
    <SliderPrimitive.Track
      ref={ref}
      data-slot="slider-track"
      className={cn(
        "bg-rixl-secondary relative grow overflow-hidden rounded-full",
        "data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5",
        className
      )}
      {...props}
    />
  );
});
SliderTrack.displayName = "SliderTrack";

export type SliderIndicatorProps = SliderPrimitive.Indicator.Props;

export const SliderIndicator = forwardRef<HTMLDivElement, SliderIndicatorProps>(function SliderIndicator(
  {className, ...props}: SliderIndicatorProps,
  ref
) {
  return (
    <SliderPrimitive.Indicator
      ref={ref}
      data-slot="slider-indicator"
      className={cn(
        // No transform transition: Base UI repositions this every pointer move.
        "bg-rixl-primary absolute",
        "data-[orientation=horizontal]:h-full",
        "data-[orientation=vertical]:w-full",
        className
      )}
      {...props}
    />
  );
});
SliderIndicator.displayName = "SliderIndicator";

export type SliderThumbProps = SliderPrimitive.Thumb.Props;

export const SliderThumb = forwardRef<HTMLDivElement, SliderThumbProps>(function SliderThumb({className, ...props}: SliderThumbProps, ref) {
  return (
    <SliderPrimitive.Thumb
      ref={ref}
      data-slot="slider-thumb"
      className={cn(
        // No transform transition: the thumb must track the pointer 1:1 while
        // dragging. Base UI positions it with inset and the `translate` property, so
        // the separate `scale` property can ease on press without lagging it.
        // The nested range input takes focus, so ring on focus-within.
        "border-rixl-border bg-rixl-surface block size-4 shrink-0 rounded-full border shadow-rixl-xs",
        "transition-[border-color,box-shadow,scale] duration-rixl-fast ease-rixl-out",
        "hover:border-rixl-border-strong",
        "focus-visible:outline-none focus-within:border-rixl-ring focus-within:ring-rixl-ring/50 focus-within:ring-[3px]",
        "data-dragging:border-rixl-ring data-dragging:scale-[var(--rixl-press-scale)] motion-reduce:data-dragging:scale-100 data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
});
SliderThumb.displayName = "SliderThumb";

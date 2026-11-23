import {forwardRef, type ForwardedRef, type ReactElement, type ReactNode, type Ref} from "react";
import {Slider as SliderPrimitive} from "@base-ui/react/slider";
import {cn} from "../../lib/cn";
import {useWarnMissingName} from "../../lib/warn-missing-name";

type SliderValue = number | readonly number[];

export type SliderSize = "sm" | "base";

export type SliderProps<Value extends SliderValue = SliderValue> = Omit<SliderPrimitive.Root.Props<Value>, "children"> & {
  /** Shows above the track and names every thumb that `getAriaLabel` does not. */
  label?: ReactNode;
  /** @default "base" */
  size?: SliderSize;
  /** Names each thumb. Use it with no visible `label`, or to tell the thumbs of a range apart. */
  getAriaLabel?: (index: number) => string;
};

const SIZE_CLASSES: Record<SliderSize, {control: string; track: string; thumb: string}> = {
  base: {
    control: "data-[orientation=horizontal]:h-5 data-[orientation=vertical]:w-5",
    track: "data-[orientation=horizontal]:h-1.5 data-[orientation=vertical]:w-1.5",
    thumb: "size-4",
  },
  sm: {
    control: "data-[orientation=horizontal]:h-4 data-[orientation=vertical]:w-4",
    track: "data-[orientation=horizontal]:h-1 data-[orientation=vertical]:w-1",
    thumb: "size-3",
  },
};

function countThumbs(value: SliderValue | undefined) {
  return Array.isArray(value) ? value.length : 1;
}

type SliderThumbsProps = {count: number; getAriaLabel: SliderProps["getAriaLabel"]; className: string};

function SliderThumbs({count, getAriaLabel, className}: SliderThumbsProps) {
  return Array.from({length: count}, (_, index) => (
    <SliderPrimitive.Thumb
      key={index}
      index={count > 1 ? index : undefined}
      getAriaLabel={getAriaLabel}
      data-slot="slider-thumb"
      className={cn(
        // No transform transition: the thumb must track the pointer 1:1 while
        // dragging. Base UI positions it with inset and the `translate` property, so
        // the separate `scale` property can ease on press without lagging it.
        // The nested range input takes focus, so ring on focus-within.
        "border-rixl-border bg-rixl-surface block shrink-0 rounded-full border shadow-xs",
        "transition-[border-color,box-shadow,scale] duration-(--rixl-motion-fast) ease-out",
        "hover:border-rixl-border-strong",
        "focus-within:border-rixl-ring focus-within:ring-rixl-ring/50 focus-within:ring-[3px] focus-visible:outline-none",
        "data-dragging:border-rixl-ring data-dragging:scale-[var(--rixl-press-scale)] motion-reduce:data-dragging:scale-100 data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
    />
  ));
}

type SliderBodyProps = Pick<SliderProps, "getAriaLabel"> & {size: SliderSize; thumbCount: number};

/** The control with its track, indicator and thumbs. */
function SliderBody({size, thumbCount, getAriaLabel}: SliderBodyProps) {
  const sizeClasses = SIZE_CLASSES[size];
  return (
    <SliderPrimitive.Control
      data-slot="slider-control"
      className={cn(
        "relative flex grow touch-none items-center select-none",
        "data-[orientation=horizontal]:w-full",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:flex-col",
        sizeClasses.control
      )}
    >
      <SliderPrimitive.Track
        data-slot="slider-track"
        className={cn(
          "bg-rixl-secondary relative grow overflow-hidden rounded-full",
          "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
          sizeClasses.track
        )}
      >
        <SliderPrimitive.Indicator
          data-slot="slider-indicator"
          // No transform transition: Base UI repositions this every pointer move.
          className="bg-rixl-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
        />
      </SliderPrimitive.Track>
      <SliderThumbs count={thumbCount} getAriaLabel={getAriaLabel} className={sizeClasses.thumb} />
    </SliderPrimitive.Control>
  );
}

/**
 * Rixl Slider — a draggable value control on `--rixl-*` tokens, shaped like Kumo's.
 *
 * Base UI Slider owns focus, keyboard (arrows/Home/End/PageUp/PageDown) and
 * pointer dragging. One component renders the label, control, track,
 * indicator and a thumb for each value: pass an array to `value` or
 * `defaultValue` for a range. Name the thumbs with `label` or `getAriaLabel`.
 *
 * Motion: the thumb and indicator are repositioned by Base UI on every
 * pointer move, so they carry **no transform transition** — the thumb tracks
 * the pointer 1:1 with no lag or spring overshoot. Only colour/shadow
 * transitions (`duration-(--rixl-motion-fast) ease-out`) remain, plus the thumb's
 * press-in `scale` while dragging, which is off under reduced motion.
 */
function SliderBase<Value extends SliderValue>(
  {label, size = "base", getAriaLabel, className, orientation = "horizontal", ...props}: SliderProps<Value>,
  ref: ForwardedRef<HTMLDivElement>
) {
  useWarnMissingName(!label && !getAriaLabel && !props["aria-labelledby"], {
    component: "Slider",
    subject: "The slider thumb",
    fix: "Set label, getAriaLabel or aria-labelledby: <Slider label='Volume' />.",
  });
  return (
    <SliderPrimitive.Root
      ref={ref}
      data-slot="slider"
      orientation={orientation}
      className={cn(
        "relative flex w-full touch-none flex-col gap-2 select-none",
        "data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:items-center",
        "data-disabled:pointer-events-none data-disabled:opacity-50",
        className
      )}
      {...props}
    >
      {label ? (
        <SliderPrimitive.Label data-slot="slider-label" className="text-rixl-fg text-sm font-medium">
          {label}
        </SliderPrimitive.Label>
      ) : null}
      <SliderBody size={size} thumbCount={countThumbs(props.value ?? props.defaultValue)} getAriaLabel={getAriaLabel} />
    </SliderPrimitive.Root>
  );
}

const SliderRoot = forwardRef(SliderBase);
SliderRoot.displayName = "Slider";

// `forwardRef` erases the generic, so the cast restores it: the runtime passes props through untouched.
export const Slider = SliderRoot as <Value extends SliderValue = SliderValue>(
  props: SliderProps<Value> & {ref?: Ref<HTMLDivElement>}
) => ReactElement;

import type {ReactNode} from "react";
import {describeForwardRefs} from "../../../../test/forward-ref";
import {Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack} from "../slider";

function Parts({children}: {children: ReactNode}) {
  return (
    <Slider defaultValue={[50]}>
      <SliderControl>
        <SliderTrack>{children}</SliderTrack>
        <SliderThumb aria-label="Value" />
      </SliderControl>
    </Slider>
  );
}

describeForwardRefs([
  {name: "Slider", component: Slider, element: (ref) => <Slider ref={ref} defaultValue={[50]} />, slot: "slider"},
  {
    name: "SliderControl",
    component: SliderControl,
    element: (ref) => (
      <Slider defaultValue={[50]}>
        <SliderControl ref={ref} />
      </Slider>
    ),
    slot: "slider-control",
  },
  {
    name: "SliderTrack",
    component: SliderTrack,
    element: (ref) => (
      <Slider defaultValue={[50]}>
        <SliderControl>
          <SliderTrack ref={ref} />
        </SliderControl>
      </Slider>
    ),
    slot: "slider-track",
  },
  {
    name: "SliderIndicator",
    component: SliderIndicator,
    element: (ref) => (
      <Parts>
        <SliderIndicator ref={ref} />
      </Parts>
    ),
    slot: "slider-indicator",
  },
  {
    name: "SliderThumb",
    component: SliderThumb,
    element: (ref) => (
      <Slider defaultValue={[50]}>
        <SliderControl>
          <SliderTrack />
          <SliderThumb ref={ref} aria-label="Value" />
        </SliderControl>
      </Slider>
    ),
    slot: "slider-thumb",
  },
]);

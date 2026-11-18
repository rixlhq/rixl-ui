import {beforeEach, vi} from "vitest";
import {describeForwardRefs} from "../../../../test/forward-ref";
import {Avatar, AvatarFallback, AvatarImage} from "../avatar";

// Base UI renders the image only once it has loaded, and jsdom never loads one.
class LoadedImage {
  onload: (() => void) | null = null;
  onerror: (() => void) | null = null;
  referrerPolicy = "";
  crossOrigin: string | null = null;
  set src(_value: string) {
    this.onload?.();
  }
}

// `unstubGlobals` in vite.config.ts removes the stub after each test, so it is set before each one.
beforeEach(() => {
  vi.stubGlobal("Image", LoadedImage);
});

describeForwardRefs([
  {name: "Avatar", component: Avatar, element: (ref) => <Avatar ref={ref} />, slot: "avatar"},
  {
    name: "AvatarImage",
    component: AvatarImage,
    element: (ref) => (
      <Avatar>
        <AvatarImage ref={ref} src="/me.png" alt="Me" />
      </Avatar>
    ),
    slot: "avatar-image",
  },
  {
    name: "AvatarFallback",
    component: AvatarFallback,
    element: (ref) => (
      <Avatar>
        <AvatarFallback ref={ref}>AA</AvatarFallback>
      </Avatar>
    ),
    slot: "avatar-fallback",
  },
]);

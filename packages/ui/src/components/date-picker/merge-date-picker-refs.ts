import type {Ref} from "react";

export function mergeDatePickerRefs<T>(...refs: Ref<T>[]) {
  return (element: T | null) => {
    for (const ref of refs) {
      if (typeof ref === "function") ref(element);
      else if (ref) ref.current = element;
    }
  };
}

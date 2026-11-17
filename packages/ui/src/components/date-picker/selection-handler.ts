export function selectionHandler<T>(primary: ((value: T) => void) | undefined, alias: ((value: T) => void) | undefined) {
  if (primary === undefined && alias === undefined) return undefined;
  return (value: T) => {
    primary?.(value);
    alias?.(value);
  };
}

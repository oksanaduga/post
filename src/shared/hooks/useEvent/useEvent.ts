import { useCallback, useLayoutEffect, useRef } from "react";

export function useEvent<T extends (...args: unknown[]) => unknown>(fn: T) {
  const fnRef = useRef(fn);

  useLayoutEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  const fnHandler = useCallback(
    (...args: Parameters<T>) => {
      fnRef.current.apply(null, args);
    },
    [fnRef]
  );

  return fnHandler;
}

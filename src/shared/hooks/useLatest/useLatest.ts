import { useLayoutEffect, useRef } from "react";

export function useLatest1<Value>(value: Value) {
  const ref = useRef(value);

  ref.current = value;

  return ref;
}

// но если будет перерендер cuncurent mode то лучше второй вариант

export function useLatest<Value>(value: Value) {
  const ref = useRef(value);

  useLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}

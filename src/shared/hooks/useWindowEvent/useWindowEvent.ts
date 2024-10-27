import { useEffect } from "react";

import { useEvent } from "../useEvent/useEvent";

//type Type<T extends string> = T;

type GetWindowEvent<T extends string> = T extends keyof WindowEventMap
  ? WindowEventMap[T]
  : Event;

export function useWindowEvent<T extends string>(
  type: T,
  cb: (e: GetWindowEvent<T>) => void
): void;

export function useWindowEvent(type: string, cb: (e: Event) => void) {
  const eventCb = useEvent(cb);

  useEffect(() => {
    window.addEventListener(type, eventCb);

    return () => {
      window.removeEventListener(type, eventCb);
    };
  }, [type]);
}

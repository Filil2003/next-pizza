"use client";

import { type RefObject, useEffect, useEffectEvent } from "react";

/**
 * Triggers a callback when clicks outside the target element.
 */
export function useClickAway<T extends Element>(
  ref: RefObject<T | null>,
  callback: (event: MouseEvent | TouchEvent) => void
) {
  const handleEvent = useEffectEvent((event: MouseEvent | TouchEvent) => {
    const element = ref.current;
    const target = event.target;

    if (!element || !(target instanceof Node)) return;

    const isOutside = !element.contains(target);
    if (isOutside) callback(event);
  });

  useEffect(() => {
    document.addEventListener("mousedown", handleEvent);
    document.addEventListener("touchstart", handleEvent);

    return () => {
      document.removeEventListener("mousedown", handleEvent);
      document.removeEventListener("touchstart", handleEvent);
    };
  }, []);
}

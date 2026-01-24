"use client";

import { startTransition, useEffect, useState } from "react";

interface Options {
  defaultValue?: boolean;
  appearanceDelay?: number;
  minDisplayTime?: number;
}

export function useAppearanceDelay(show: boolean, options: Options = {}) {
  const {
    defaultValue = false,
    appearanceDelay = 500,
    minDisplayTime = 500
  } = options;

  const [delayedShow, setDelayedShow] = useState(defaultValue);

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    if (show) {
      timeoutId = setTimeout(() => {
        startTransition(() => setDelayedShow(true));
      }, appearanceDelay);
    } else if (delayedShow) {
      timeoutId = setTimeout(() => {
        startTransition(() => setDelayedShow(false));
      }, minDisplayTime);
    }

    return () => clearTimeout(timeoutId);
  }, [show, delayedShow, appearanceDelay, minDisplayTime]);

  return delayedShow;
}

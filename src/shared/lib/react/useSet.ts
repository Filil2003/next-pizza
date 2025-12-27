"use client";

import { useCallback, useState } from "react";

interface Actions<T> {
  add: (value: T) => void;
  remove: (value: T) => void;
  toggle: (value: T) => void;
  reset: () => void;
  clear: () => void;
}

export function useSet<T>(values?: T[] | Set<T>) {
  const [set, setSet] = useState<Set<T>>(() =>
    values ? new Set(values) : new Set<T>([])
  );

  const add = useCallback(
    (value: T) =>
      setSet((prevState) => {
        if (prevState.has(value)) return prevState;
        return new Set(prevState).add(value);
      }),
    []
  );

  const remove = useCallback(
    (value: T) =>
      setSet((prevState) => {
        if (!prevState.has(value)) return prevState;
        const newSet = new Set(prevState);
        newSet.delete(value);
        return newSet;
      }),
    []
  );

  const toggle = useCallback((value: T) => {
    setSet((prevState) => {
      const newSet = new Set(prevState);
      if (newSet.has(value)) newSet.delete(value);
      else newSet.add(value);
      return newSet;
    });
  }, []);

  const reset = useCallback(() => setSet(new Set<T>(values ?? [])), [values]);

  const clear = useCallback(
    () => setSet((prevState) => (prevState.size ? new Set() : prevState)),
    []
  );

  const actions: Actions<T> = {
    add,
    remove,
    toggle,
    reset,
    clear
  };

  return [set, actions] as const;
}

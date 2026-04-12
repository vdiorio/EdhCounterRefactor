import { useRef } from "react";

import { ANIMATIONS } from "@/constants/ui";

export const INCREMENT_HOLD_INTERVAL = ANIMATIONS.HOLD_INTERVAL; // milliseconds

export const useIncrementAction = (onIncrement: (value: number) => void) => {
  const interval = useRef<NodeJS.Timeout | null>(null);

  const startAction = (value: number) => {
    interval.current = setInterval(() => onIncrement(value), INCREMENT_HOLD_INTERVAL);
  };

  const stopAction = () => {
    if (interval.current) clearInterval(interval.current);
  };

  return { startAction, stopAction };
};
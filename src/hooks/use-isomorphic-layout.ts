// hooks/useIsomorphicLayoutEffect.ts
import { useEffect, useLayoutEffect } from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

export { useIsomorphicLayoutEffect };

"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

// Central switch: "user" makes every Motion animation resolve to end-state
// (no transforms/opacity motion) when prefers-reduced-motion is set.
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
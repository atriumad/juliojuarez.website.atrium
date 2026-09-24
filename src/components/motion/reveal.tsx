"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds to wait after the element enters view before animating. */
  delay?: number;
  /** Vertical travel in px. Pass 0 for a fade-only reveal. */
  y?: number;
  /** Whether to play the reveal once (true) or on every re-entry (false). */
  once?: boolean;
  /** Reduce motion respected centrally via MotionConfig. */
};

export function Reveal({
  children,
  className,
  delay = 0,
  y = 20,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-10% 0px -10% 0px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}
"use client";

import * as React from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
}

export function Counter({ value, suffix = "", prefix = "" }: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = React.useState(0);

  React.useEffect(() => {
    if (!inView) return;
    const controls = animate(count, value, { duration: 1.2, ease: "easeOut" });
    const unsubscribe = rounded.on("change", (v) => setDisplay(v));
    return () => {
      controls.stop();
      unsubscribe();
    };
  }, [inView, value, count, rounded]);

  return (
    <motion.span ref={ref} className="font-mono">
      {prefix}
      {display}
      {suffix}
    </motion.span>
  );
}

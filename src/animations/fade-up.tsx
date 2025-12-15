"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
};

export default function FadeUp({ children, delay = 0 }: FadeUpProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay,
        ease: "power3.out",
      }
    );
  }, [delay]);

  return <div ref={ref}>{children}</div>;
}

"use client";
import { useEffect, useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

function wrap(min, max, value) {
  const range = max - min;
  return ((((value - min) % range) + range) % range) + min;
}

/**
 * An infinite horizontal row of `items` that scrolls at a constant
 * `baseVelocity` (px/s, sign controls direction) and speeds up - without
 * changing direction - the faster the page is scrolled in either direction.
 */
export default function IconMarqueeRow({ items, renderItem, baseVelocity = 30, gap = 24 }) {
  const firstCopyRef = useRef(null);
  const loopWidthRef = useRef(0);
  const baseX = useMotionValue(0);

  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  // Symmetric "V" mapping: any fast scroll (up or down) boosts speed the same way.
  const speedBoost = useTransform(smoothVelocity, [-2500, 0, 2500], [6, 0, 6], {
    clamp: true,
  });

  useEffect(() => {
    const el = firstCopyRef.current;
    if (!el || typeof ResizeObserver === "undefined") return;

    const measure = () => {
      loopWidthRef.current = el.getBoundingClientRect().width + gap;
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [gap]);

  const x = useTransform(baseX, (v) => {
    const width = loopWidthRef.current;
    return width ? `${wrap(-width, 0, v)}px` : "0px";
  });

  useAnimationFrame((_, delta) => {
    const factor = 1 + speedBoost.get();
    baseX.set(baseX.get() + baseVelocity * (delta / 1000) * factor);
  });

  return (
    <div style={{ overflow: "hidden", width: "100%" }}>
      <motion.div style={{ x, display: "flex", width: "max-content" }}>
        {[0, 1, 2, 3].map((copyIndex) => (
          <div
            key={copyIndex}
            ref={copyIndex === 0 ? firstCopyRef : undefined}
            aria-hidden={copyIndex !== 0}
            style={{ display: "flex", gap: `${gap}px`, marginRight: `${gap}px` }}
          >
            {items.map((item, index) => (
              <div key={index}>{renderItem(item)}</div>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

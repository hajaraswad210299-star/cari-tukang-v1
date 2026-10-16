'use client';

import { useState, useEffect, useRef } from 'react';

export function useCountUp(target: number, { duration = 900 } = {}) {
  const [value, setValue] = useState(0);
  const from = useRef(0);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const initial = from.current;
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(initial + (target - initial) * eased));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        from.current = target;
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

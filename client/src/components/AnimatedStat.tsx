import { useEffect, useRef, useState } from "react";

export function interpolateCount(progress: number, value: number) {
  return Math.round(value * Math.min(1, Math.max(0, progress)));
}

export function AnimatedStat({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let animationFrame = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();

        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
          setCount(value);
          return;
        }

        const startedAt = performance.now();
        const animate = (now: number) => {
          const progress = (now - startedAt) / 1200;
          setCount(interpolateCount(progress, value));
          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  return (
    <div ref={ref} className="border-t border-white/20 pt-5 text-center">
      <strong className="block font-display text-4xl font-semibold tracking-[-.065em] text-white tabular-nums sm:text-5xl lg:text-6xl">
        {count.toLocaleString("es-MX")}
        {suffix}
      </strong>
      <span className="mx-auto mt-2 block max-w-[14rem] text-[9px] font-bold uppercase tracking-[.14em] text-white/60">
        {label}
      </span>
    </div>
  );
}

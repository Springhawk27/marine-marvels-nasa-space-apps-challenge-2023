import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import oceanStats from "@/data/oceanStats";

function AnimatedNumber({ value, suffix }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let frame;
    const duration = 2000;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <span ref={ref} className="stat-number gradient-text">
      {count}
      {suffix}
    </span>
  );
}

const StatsCounter = () => {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-primary/5 to-transparent" />
      <div className="max-w-5xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {oceanStats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="stat-card"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              <p className="text-white font-semibold text-sm mt-2">
                {stat.label}
              </p>
              <p className="stat-label text-xs mt-1">{stat.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;

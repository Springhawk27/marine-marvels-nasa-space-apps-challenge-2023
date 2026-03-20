import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const fishPool = [
  { color: "#4a90d9", accent: "#3070b0", size: 22 },
  { color: "#45b7a0", accent: "#2d8a75", size: 18 },
  { color: "#f5d76e", accent: "#c4a840", size: 16 },
  { color: "#c4a4e8", accent: "#9a7ac0", size: 20 },
  { color: "#e85d9a", accent: "#b84078", size: 17 },
  { color: "#6e8ba8", accent: "#506880", size: 24 },
  { color: "#ff8c42", accent: "#cc6620", size: 15 },
];

function SmallFish({ fish, goRight, yPos, speed, delay }) {
  const h = fish.size * 0.6;

  return (
    <motion.div
      className="absolute pointer-events-none"
      style={{ top: `${yPos}%` }}
      initial={{ x: goRight ? "-5vw" : "105vw" }}
      animate={{ x: goRight ? ["-5vw", "105vw"] : ["105vw", "-5vw"] }}
      transition={{ x: { duration: speed, repeat: Infinity, ease: "linear", delay } }}
    >
      <motion.div
        animate={{ y: [0, -(2 + Math.random() * 3), 0, (1 + Math.random() * 2), 0] }}
        transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg
          width={fish.size}
          height={h}
          viewBox="0 0 80 48"
          style={{ transform: goRight ? "scaleX(1)" : "scaleX(-1)", opacity: 0.5 }}
        >
          <ellipse cx="38" cy="24" rx="26" ry="14" fill={fish.color} />
          <motion.path
            d="M12 24 L2 12 L5 24 L2 36Z"
            fill={fish.accent}
            animate={{ d: ["M12 24 L2 12 L5 24 L2 36Z", "M12 24 L4 16 L6 24 L4 32Z", "M12 24 L2 12 L5 24 L2 36Z"] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          />
          <circle cx="54" cy="20" r="3.5" fill="white" opacity="0.8" />
          <circle cx="55" cy="19.5" r="1.8" fill="#1a1a2e" />
        </svg>
      </motion.div>
    </motion.div>
  );
}

export default function AmbientFish({ count = 3, yRange = [10, 90] }) {
  const [fishes, setFishes] = useState([]);

  useEffect(() => {
    const arr = [];
    for (let i = 0; i < count; i++) {
      const fish = fishPool[i % fishPool.length];
      arr.push({
        ...fish,
        id: i,
        goRight: i % 2 === 0,
        yPos: yRange[0] + Math.random() * (yRange[1] - yRange[0]),
        speed: 18 + Math.random() * 20,
        delay: i * 3 + Math.random() * 5,
      });
    }
    setFishes(arr);
  }, [count, yRange[0], yRange[1]]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {fishes.map((f) => (
        <SmallFish key={f.id} fish={f} goRight={f.goRight} yPos={f.yPos} speed={f.speed} delay={f.delay} />
      ))}
    </div>
  );
}

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export default function UnderwaterCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [bubbles, setBubbles] = useState([]);
  const bubbleId = useRef(0);
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 18 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 18 });

  useEffect(() => {
    let lastBubbleTime = 0;

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible(true);

      const now = Date.now();
      if (now - lastBubbleTime > 80) {
        lastBubbleTime = now;
        const id = bubbleId.current++;
        const offsetX = (Math.random() - 0.5) * 16;
        setBubbles((prev) => [
          ...prev.slice(-12),
          {
            id,
            x: e.clientX - 20 + offsetX,
            y: e.clientY + 5,
            size: 3 + Math.random() * 6,
            drift: (Math.random() - 0.5) * 30,
          },
        ]);
        setTimeout(() => {
          setBubbles((prev) => prev.filter((b) => b.id !== id));
        }, 1400);
      }
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [mouseX, mouseY]);

  if (typeof window === "undefined") return null;
  if (typeof window !== "undefined" && "ontouchstart" in window) return null;

  return (
    <>
      <style jsx global>{`
        .explore-cursor-area,
        .explore-cursor-area * {
          cursor: none !important;
        }
      `}</style>

      {/* Submarine */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <div className="relative -translate-x-1/2 -translate-y-1/2">
          <svg
            width="56"
            height="38"
            viewBox="0 0 56 38"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ filter: "drop-shadow(0 3px 12px rgba(14,155,191,0.5))" }}
          >
            {/* Light beam */}
            <ellipse cx="50" cy="22" rx="6" ry="10" fill="url(#lightBeam)" fillOpacity="0.15" />
            {/* Hull */}
            <ellipse cx="28" cy="22" rx="22" ry="12" fill="#0a8faf" />
            <ellipse cx="28" cy="22" rx="22" ry="12" stroke="#BAE0E3" strokeWidth="1.2" strokeOpacity="0.35" />
            {/* Hull highlight */}
            <ellipse cx="28" cy="18" rx="18" ry="6" fill="#0eb5d5" fillOpacity="0.15" />
            {/* Conning tower */}
            <rect x="20" y="5" width="14" height="13" rx="5" fill="#087a96" />
            <rect x="20" y="5" width="14" height="13" rx="5" stroke="#BAE0E3" strokeWidth="0.8" strokeOpacity="0.25" />
            {/* Periscope */}
            <rect x="25.5" y="0" width="3" height="7" rx="1.5" fill="#087a96" />
            <circle cx="27" cy="1" r="1.5" fill="#4ECDC4" fillOpacity="0.6" />
            {/* Main window */}
            <circle cx="34" cy="22" r="5" fill="#043a4d" stroke="#BAE0E3" strokeWidth="1" strokeOpacity="0.5" />
            <circle cx="34" cy="22" r="2.5" fill="#4ECDC4" fillOpacity="0.35" />
            {/* Small window */}
            <circle cx="24" cy="22" r="3" fill="#043a4d" stroke="#BAE0E3" strokeWidth="0.8" strokeOpacity="0.4" />
            <circle cx="24" cy="22" r="1.5" fill="#4ECDC4" fillOpacity="0.25" />
            {/* Propeller shaft */}
            <rect x="3" y="20.5" width="6" height="3" rx="1" fill="#076a82" />
            {/* Animated propeller blades */}
            <g>
              <motion.g
                style={{ originX: "5px", originY: "22px" }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 0.5, repeat: Infinity, ease: "linear" }}
              >
                <rect x="2" y="15" width="2.5" height="5" rx="1" fill="#BAE0E3" fillOpacity="0.5" transform="translate(1.5, 7) rotate(-20, 1.25, -2)" />
                <rect x="2" y="24" width="2.5" height="5" rx="1" fill="#BAE0E3" fillOpacity="0.5" transform="translate(1.5, -7) rotate(20, 1.25, 2)" />
                <rect x="-1" y="20" width="5" height="2.5" rx="1" fill="#BAE0E3" fillOpacity="0.5" transform="translate(3, 0.5)" />
              </motion.g>
            </g>
            {/* Rudder fins */}
            <path d="M6 14 L9 18 L6 18Z" fill="#076a82" fillOpacity="0.8" />
            <path d="M6 26 L9 26 L6 30Z" fill="#076a82" fillOpacity="0.8" />
            <defs>
              <radialGradient id="lightBeam" cx="0.3" cy="0.5" r="0.7">
                <stop offset="0%" stopColor="#F5FCCD" />
                <stop offset="100%" stopColor="#F5FCCD" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </motion.div>

      {/* Propeller bubbles */}
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="fixed pointer-events-none z-[9998] rounded-full"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
          }}
          initial={{ opacity: 0.7, scale: 0.4 }}
          animate={{
            opacity: 0,
            y: -50 - Math.random() * 40,
            x: bubble.drift,
            scale: 1 + Math.random() * 0.5,
          }}
          transition={{ duration: 1.2 + Math.random() * 0.4, ease: "easeOut" }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(186,224,227,0.6), rgba(186,224,227,0.15))",
              border: "1px solid rgba(186,224,227,0.25)",
            }}
          />
        </motion.div>
      ))}
    </>
  );
}

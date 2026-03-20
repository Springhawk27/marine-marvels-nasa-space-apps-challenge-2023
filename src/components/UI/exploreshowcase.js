import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Head from "next/head";
import UnderwaterCursor from "./UnderwaterCursor";

const zones = [
  {
    name: "Euphotic Zone",
    subtitle: "The Sunlit Zone",
    depth: "Sea Level — 200m",
    depthRange: [0, 200],
    color: "#4ECDC4",
    bgFrom: "#095693",
    bgTo: "#053566",
    description:
      "The sunlit zone where photosynthesis thrives. Home to phytoplankton that produce over 50% of Earth's oxygen, colorful coral reefs, and the majority of ocean life. Sunlight floods this zone, fueling a rich ecosystem that supports the entire marine food web.",
    details: [
      { label: "Temperature", value: "15–30°C" },
      { label: "Marine Life", value: "90% of all species" },
      { label: "Light", value: "Full sunlight penetration" },
      { label: "Key Feature", value: "All photosynthesis occurs here" },
    ],
    creatures: [
      {
        src: "/images/explore/phytoplankton.png",
        alt: "Phytoplankton",
        name: "Phytoplankton",
        fact: "Produce 50% of Earth's oxygen through photosynthesis",
        size: "small",
      },
      {
        src: "/images/explore/jelly_fish.png",
        alt: "Jellyfish",
        name: "Jellyfish",
        fact: "Existed for over 500 million years — older than dinosaurs",
        size: "large",
      },
    ],
  },
  {
    name: "Dysphotic Zone",
    subtitle: "The Twilight Zone",
    depth: "200m — 1,000m",
    depthRange: [200, 1000],
    color: "#6C5CE7",
    bgFrom: "#053566",
    bgTo: "#021a3a",
    description:
      "The twilight zone where sunlight fades rapidly. Home to bioluminescent species that create their own light — over 90% of creatures here can glow in the dark. The largest daily animal migration on Earth happens here as creatures rise to feed at night.",
    details: [
      { label: "Temperature", value: "4–15°C" },
      { label: "Bioluminescence", value: "90% of animals glow" },
      { label: "Migration", value: "Largest on Earth (daily)" },
      { label: "Pressure", value: "Up to 100 atm" },
    ],
    creatures: [
      {
        src: "/images/explore/shrimp.png",
        alt: "Deep Sea Shrimp",
        name: "Deep Sea Shrimp",
        fact: "Some species shoot bioluminescent fluid to confuse predators",
        size: "medium",
      },
      {
        src: "/images/explore/sword_fish.png",
        alt: "Swordfish",
        name: "Swordfish",
        fact: "Can swim up to 97 km/h — one of the fastest fish alive",
        size: "large",
      },
    ],
  },
  {
    name: "Aphotic Zone",
    subtitle: "The Midnight Zone",
    depth: "1,000m — 11,000m",
    depthRange: [1000, 11000],
    color: "#FD79A8",
    bgFrom: "#021a3a",
    bgTo: "#010812",
    description:
      "The midnight zone — complete darkness, crushing pressure, near-freezing temperatures. Organisms here rely on bioluminescence and chemosynthesis around hydrothermal vents. Less than 0.01% has been explored. This is Earth's final frontier.",
    details: [
      { label: "Temperature", value: "1–4°C" },
      { label: "Pressure", value: "Up to 1,100 atm" },
      { label: "Explored", value: "Less than 0.01%" },
      { label: "Key Feature", value: "Hydrothermal vent ecosystems" },
    ],
    creatures: [
      {
        src: "/images/explore/angler_fish.png",
        alt: "Angler Fish",
        name: "Angler Fish",
        fact: "Uses a bioluminescent lure to attract prey in total darkness",
        size: "medium",
      },
      {
        src: "/images/explore/octopus.png",
        alt: "Deep Sea Octopus",
        name: "Deep Sea Octopus",
        fact: "Has three hearts, blue blood, and can change color instantly",
        size: "large",
      },
    ],
  },
];

function DepthMeter({ containerRef }) {
  const { scrollYProgress } = useScroll({ target: containerRef });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 50, damping: 20 });
  const depth = useTransform(smoothProgress, [0, 1], [0, 11000]);
  const [depthValue, setDepthValue] = useState(0);

  useEffect(() => {
    const unsubscribe = depth.on("change", (v) => {
      setDepthValue(Math.round(v));
    });
    return unsubscribe;
  }, [depth]);

  const getZoneLabel = () => {
    if (depthValue < 200) return "Euphotic";
    if (depthValue < 1000) return "Dysphotic";
    return "Aphotic";
  };

  return (
    <div className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-3">
      <div className="glass px-3 py-2 rounded-xl text-center min-w-[80px]">
        <span className="text-seafoam-300 text-xs font-mono font-bold block">
          {depthValue.toLocaleString()}m
        </span>
        <span className="text-white/30 text-[9px] uppercase tracking-wider">
          {getZoneLabel()}
        </span>
      </div>
      <div className="w-1 h-40 bg-white/10 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full rounded-full"
          style={{
            height: smoothProgress.get() * 100 + "%",
            background: "linear-gradient(to bottom, #4ECDC4, #6C5CE7, #FD79A8)",
          }}
        />
        {/* Use a separate component to animate */}
        <DepthBar progress={smoothProgress} />
      </div>
      <div className="flex flex-col items-center gap-1">
        <span className="text-white/20 text-[9px] font-mono">0m</span>
        <span className="text-white/10 text-[9px]">|</span>
        <span className="text-white/20 text-[9px] font-mono">11km</span>
      </div>
    </div>
  );
}

function DepthBar({ progress }) {
  return (
    <motion.div
      className="absolute top-0 left-0 w-full rounded-full"
      style={{
        height: useTransform(progress, [0, 1], ["0%", "100%"]),
        background: "linear-gradient(to bottom, #4ECDC4, #6C5CE7, #FD79A8)",
      }}
    />
  );
}

function AnimatedCreature({ creature, index, zoneIndex }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-10%" });

  const sizeClass =
    creature.size === "small"
      ? "w-1/4 md:w-1/3"
      : creature.size === "medium"
        ? "w-2/5 md:w-1/2"
        : "w-3/5 md:w-3/4";

  return (
    <div
      ref={ref}
      className={`group relative ${index === 1 ? "self-end" : "self-start"}`}
    >
      <motion.img
        src={creature.src}
        alt={creature.alt}
        className={`${sizeClass} cursor-pointer`}
        style={{
          filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.4))",
        }}
        initial={{ opacity: 0, x: index === 0 ? -60 : 60 }}
        animate={
          isInView
            ? { opacity: 1, x: 0, y: [0, -15, 0] }
            : { opacity: 0, x: index === 0 ? -60 : 60 }
        }
        transition={{
          opacity: { duration: 0.8 },
          x: { duration: 0.8 },
          y: {
            duration: 3 + index * 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.5,
          },
        }}
        whileHover={{
          scale: 1.2,
          rotate: index === 0 ? 8 : -8,
          filter:
            "drop-shadow(0 10px 30px rgba(0,0,0,0.4)) drop-shadow(0 0 25px rgba(14, 155, 191, 0.5)) brightness(1.15)",
          transition: { type: "spring", stiffness: 200, damping: 12 },
        }}
        whileTap={{ scale: 0.9 }}
      />
      {/* Tooltip */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-2 pointer-events-none z-20">
        <div className="glass px-5 py-4 rounded-xl text-center min-w-[220px]">
          <p className="text-white font-semibold text-sm mb-1">
            {creature.name}
          </p>
          <p className="text-white/60 text-xs leading-relaxed">
            {creature.fact}
          </p>
        </div>
        <div className="w-3 h-3 glass rotate-45 mx-auto -mt-1.5" />
      </div>
    </div>
  );
}

function BubbleField({ count = 12, intensity = 1 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${5 + ((i * 97) % 90)}%`,
            bottom: `-${20 + ((i * 13) % 40)}px`,
            width: `${2 + (i % 5) * 2}px`,
            height: `${2 + (i % 5) * 2}px`,
            background: `radial-gradient(circle, rgba(186, 224, 227, ${(0.2 + (i % 3) * 0.1) * intensity}), transparent)`,
          }}
          animate={{
            y: [0, -(600 + ((i * 200) % 600))],
            x: [0, Math.sin(i * 0.7) * 40, 0],
            opacity: [0, 0.7 * intensity, 0],
            scale: [0.3, 1, 0.2],
          }}
          transition={{
            duration: 5 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 0.8,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  );
}

function ZoneDetails({ details, color }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-6">
      {details.map((detail, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 + i * 0.1 }}
          className="p-3 rounded-lg border border-white/5 bg-white/[0.02]"
        >
          <span className="text-white/30 text-[10px] uppercase tracking-wider block mb-1">
            {detail.label}
          </span>
          <span className="text-white/80 text-sm font-semibold" style={{ color }}>
            {detail.value}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

function WaterSurface() {
  return (
    <div className="relative h-16 overflow-hidden">
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        style={{ height: "60px" }}
      >
        <motion.path
          d="M0,30 C120,50 240,10 360,30 C480,50 600,10 720,30 C840,50 960,10 1080,30 C1200,50 1320,10 1440,30 L1440,60 L0,60Z"
          fill="#095693"
          fillOpacity="0.3"
          animate={{
            d: [
              "M0,30 C120,50 240,10 360,30 C480,50 600,10 720,30 C840,50 960,10 1080,30 C1200,50 1320,10 1440,30 L1440,60 L0,60Z",
              "M0,25 C120,10 240,45 360,25 C480,10 600,45 720,25 C840,10 960,45 1080,25 C1200,10 1320,45 1440,25 L1440,60 L0,60Z",
              "M0,30 C120,50 240,10 360,30 C480,50 600,10 720,30 C840,50 960,10 1080,30 C1200,50 1320,10 1440,30 L1440,60 L0,60Z",
            ],
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M0,35 C180,15 360,55 540,35 C720,15 900,55 1080,35 C1260,15 1440,35 1440,35 L1440,60 L0,60Z"
          fill="#095693"
          fillOpacity="0.5"
          animate={{
            d: [
              "M0,35 C180,15 360,55 540,35 C720,15 900,55 1080,35 C1260,15 1440,35 1440,35 L1440,60 L0,60Z",
              "M0,40 C180,55 360,20 540,40 C720,55 900,20 1080,40 C1260,55 1440,40 1440,40 L1440,60 L0,60Z",
              "M0,35 C180,15 360,55 540,35 C720,15 900,55 1080,35 C1260,15 1440,35 1440,35 L1440,60 L0,60Z",
            ],
          }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </svg>
    </div>
  );
}

export default function ExploreShowcase() {
  const containerRef = useRef(null);

  return (
    <>
      <Head>
        <title>Explore the Ocean | Marine Marvels</title>
        <meta
          name="description"
          content="Dive deep into the ocean's three main zones and discover the incredible marine life that calls each layer home."
        />
      </Head>

      <div ref={containerRef} className="min-h-screen relative explore-cursor-area">
        <UnderwaterCursor />
        <DepthMeter containerRef={containerRef} />

        {/* Hero */}
        <section
          className="relative pt-28 pb-10 px-4 md:px-12 overflow-hidden"
          style={{
            backgroundImage: "url('/images/explore.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "soft-light",
            backgroundColor: "#0a6aad",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-deep-900/30 via-transparent to-[#095693]" />
          <BubbleField count={20} intensity={0.8} />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <motion.span
                className="text-ocean-primary text-sm font-semibold uppercase tracking-widest inline-block"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                Interactive Journey
              </motion.span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mt-3 mb-6">
                <motion.span
                  className="gradient-text block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3, duration: 0.8 }}
                >
                  Explore
                </motion.span>
                <motion.span
                  className="text-white block"
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                >
                  the Ocean
                </motion.span>
              </h1>
              <motion.p
                className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Scroll to descend through three ocean zones — from sunlit
                shallows to the crushing darkness of the abyss. Hover over
                creatures to discover them.
              </motion.p>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="mt-14 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-white/30 text-xs uppercase tracking-widest mb-3">
                Scroll to dive deeper
              </span>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2"
              >
                <motion.div
                  className="w-1.5 h-2.5 bg-ocean-primary rounded-full"
                  animate={{ opacity: [1, 0.2, 1], y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Water surface animation */}
          <div className="absolute bottom-0 left-0 right-0">
            <WaterSurface />
          </div>
        </section>

        {/* Ocean Zones */}
        {zones.map((zone, zoneIndex) => (
          <section
            key={zone.name}
            className="relative overflow-hidden"
            style={{
              background: `linear-gradient(180deg, ${zone.bgFrom} 0%, ${zone.bgTo} 100%)`,
            }}
          >
            <BubbleField count={4 + zoneIndex * 3} intensity={1 - zoneIndex * 0.25} />

            {/* Light rays for euphotic zone */}
            {zoneIndex === 0 && (
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute top-0 bg-gradient-to-b from-white/[0.03] to-transparent"
                    style={{
                      left: `${15 + i * 18}%`,
                      width: "2px",
                      height: "60%",
                      transformOrigin: "top",
                    }}
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                      scaleY: [0.8, 1.1, 0.8],
                      rotate: [-2 + i, 2 + i, -2 + i],
                    }}
                    transition={{
                      duration: 4 + i,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.6,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Depth Label */}
            <div
              className={`flex ${zoneIndex % 2 === 0 ? "justify-start" : "justify-end"} px-4 md:px-12 py-8`}
            >
              <motion.div
                initial={{ opacity: 0, x: zoneIndex % 2 === 0 ? -40 : 40, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className="depth-label"
              >
                <motion.span
                  className="w-2.5 h-2.5 rounded-full mr-3"
                  style={{ backgroundColor: zone.color }}
                  animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                {zone.depth}
              </motion.div>
            </div>

            {/* Zone Content */}
            <div
              className={`max-w-6xl mx-auto px-4 md:px-12 py-12 flex flex-col ${
                zoneIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12 md:gap-20`}
            >
              {/* Creatures */}
              <div className="w-full md:w-1/2 flex flex-col gap-10 relative min-h-[300px]">
                {zone.creatures.map((creature, i) => (
                  <AnimatedCreature
                    key={creature.alt}
                    creature={creature}
                    index={i}
                    zoneIndex={zoneIndex}
                  />
                ))}
              </div>

              {/* Zone Info */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2"
              >
                <motion.span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: zone.color, opacity: 0.6 }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 0.6 }}
                  viewport={{ once: true }}
                >
                  {zone.subtitle}
                </motion.span>
                <h2
                  className="text-3xl md:text-5xl font-display font-bold mt-1 mb-3"
                  style={{ color: zone.color }}
                >
                  {zone.name}
                </h2>
                <motion.div
                  className="h-1 rounded-full mb-6"
                  style={{ backgroundColor: zone.color }}
                  initial={{ width: 0, opacity: 0.4 }}
                  whileInView={{ width: 64, opacity: 0.4 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                />
                <p className="text-white/70 text-base leading-relaxed">
                  {zone.description}
                </p>
                <ZoneDetails details={zone.details} color={zone.color} />
              </motion.div>
            </div>

            {/* Sea grass at bottom of euphotic zone */}
            {zoneIndex === 0 && (
              <motion.div
                className="relative h-24 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.25 }}
                viewport={{ once: true }}
              >
                <img
                  src="/images/sea_grass.png"
                  alt=""
                  className="absolute bottom-0 w-full object-cover object-bottom h-36"
                />
              </motion.div>
            )}
          </section>
        ))}

        {/* Deep Sea Landmarks - neal.fun style */}
        <section
          className="relative py-8 overflow-hidden"
          style={{
            background: "linear-gradient(180deg, #010812 0%, #000510 50%, #010812 100%)",
          }}
        >
          <BubbleField count={3} intensity={0.15} />
          <div className="max-w-3xl mx-auto px-4 md:px-12 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-white/20 text-xs uppercase tracking-widest">
                Notable Depths
              </span>
              <h2 className="text-2xl md:text-3xl font-display font-bold text-white/60 mt-2">
                How Deep Does It Go?
              </h2>
            </motion.div>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-ocean-primary/20 via-biolum-400/10 to-coral-500/20 -translate-x-1/2" />

              {[
                { depth: "40m", label: "Recreational Scuba Limit", icon: "person", color: "#4ECDC4", desc: "Maximum safe depth for recreational divers" },
                { depth: "100m", label: "Blue Whale Dive Depth", icon: "whale", color: "#4ECDC4", desc: "How deep the largest animal on Earth dives to feed" },
                { depth: "214m", label: "Deepest Freedive", icon: "trophy", color: "#4ECDC4", desc: "Herbert Nitsch's no-limit freediving record (2012)" },
                { depth: "332m", label: "Deepest Scuba Dive", icon: "record", color: "#6C5CE7", desc: "Ahmed Gabr's world record scuba dive (2014)" },
                { depth: "500m", label: "Giant Squid Territory", icon: "squid", color: "#6C5CE7", desc: "Where the mysterious giant squid hunts in darkness" },
                { depth: "1,000m", label: "Midnight Zone Begins", icon: "moon", color: "#6C5CE7", desc: "Zero sunlight. Total darkness from here on" },
                { depth: "2,250m", label: "Black Smokers", icon: "volcano", color: "#FD79A8", desc: "Hydrothermal vents reaching 400°C support unique life" },
                { depth: "3,800m", label: "RMS Titanic", icon: "ship", color: "#FD79A8", desc: "Wreck of the famous ship, discovered in 1985" },
                { depth: "8,376m", label: "Deepest Fish", icon: "fish", color: "#FD79A8", desc: "Pseudoliparis snailfish, filmed in 2022" },
                { depth: "10,935m", label: "Challenger Deep", icon: "flag", color: "#FD79A8", desc: "The absolute deepest point in the ocean" },
              ].map((landmark, i) => (
                <motion.div
                  key={landmark.depth}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className={`relative flex items-center gap-6 mb-8 ${
                    i % 2 === 0 ? "flex-row" : "flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <span
                      className="text-xs font-mono font-bold"
                      style={{ color: landmark.color }}
                    >
                      {landmark.depth}
                    </span>
                    <h4 className="text-white/80 text-sm font-semibold mt-0.5">
                      {landmark.label}
                    </h4>
                    <p className="text-white/30 text-xs mt-0.5 leading-relaxed">
                      {landmark.desc}
                    </p>
                  </div>

                  {/* Center dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <motion.div
                      className="w-3 h-3 rounded-full border-2"
                      style={{
                        borderColor: landmark.color,
                        backgroundColor: `${landmark.color}30`,
                      }}
                      whileInView={{
                        scale: [1, 1.4, 1],
                        boxShadow: [
                          `0 0 0 0 ${landmark.color}00`,
                          `0 0 0 6px ${landmark.color}20`,
                          `0 0 0 0 ${landmark.color}00`,
                        ],
                      }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.5, delay: i * 0.08 }}
                    />
                  </div>

                  {/* Spacer */}
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Deep sea reference */}
        <section
          className="py-16 px-4 md:px-12 relative"
          style={{ backgroundColor: "#010812" }}
        >
          <BubbleField count={4} intensity={0.3} />
          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-card p-8 flex flex-col md:flex-row gap-8 items-center"
            >
              <div className="flex-1">
                <span className="text-white/30 text-xs uppercase tracking-widest">
                  Inspired By
                </span>
                <h3 className="text-white font-display text-xl font-bold mt-1 mb-2">
                  The Deep Sea
                </h3>
                <p className="text-white/50 text-sm leading-relaxed mb-4">
                  Explore an incredible interactive visualization of ocean depth
                  that inspired our project — scroll through the entire ocean
                  from surface to the Mariana Trench.
                </p>
                <a
                  href="https://neal.fun/deep-sea/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ocean-btn ocean-btn-outline text-sm no-underline"
                >
                  Visit neal.fun/deep-sea
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </div>
              <div className="grid grid-cols-3 gap-2 w-32">
                {[...Array(9)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="aspect-square rounded bg-white/[0.03] border border-white/5"
                    animate={{
                      opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      delay: i * 0.2,
                      repeat: Infinity,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA */}
        <section
          className="py-24 px-4 md:px-12 relative"
          style={{ backgroundColor: "#020641" }}
        >
          <BubbleField count={8} intensity={0.4} />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">Continue</span>
              <span className="text-white"> Your Journey</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Dive into our educational articles, view real-time NASA satellite
              data, or test what you&apos;ve learned with interactive games.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/learn" className="ocean-btn ocean-btn-secondary no-underline">
                Read Articles
              </Link>
              <Link href="/game" className="ocean-btn ocean-btn-primary no-underline">
                Play Games
              </Link>
              <Link href="/liveobservation" className="ocean-btn ocean-btn-outline no-underline">
                Live Observation
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Head from "next/head";

const zones = [
  {
    name: "Euphotic Zone",
    subtitle: "The Sunlit Zone",
    depth: "Sea Level - 200m",
    color: "#4ECDC4",
    bgGradient: "linear-gradient(180deg, #095693 0%, #064578 50%, #053566 100%)",
    description:
      "The sunlit zone where photosynthesis thrives. Home to phytoplankton that produce over 50% of Earth's oxygen, colorful coral reefs, and the majority of ocean life. Sunlight floods this zone, fueling a rich ecosystem that supports the entire marine food web.",
    details: [
      "Temperature: 15-30°C depending on latitude",
      "Contains 90% of all marine life",
      "Where all oceanic photosynthesis occurs",
      "Home to all coral reef ecosystems",
    ],
    creatures: [
      {
        src: "/images/explore/phytoplankton.png",
        alt: "Phytoplankton",
        name: "Phytoplankton",
        fact: "Produce 50% of Earth's oxygen through photosynthesis",
      },
      {
        src: "/images/explore/jelly_fish.png",
        alt: "Jellyfish",
        name: "Jellyfish",
        fact: "Existed for over 500 million years — older than dinosaurs",
      },
    ],
  },
  {
    name: "Dysphotic Zone",
    subtitle: "The Twilight Zone",
    depth: "200m - 1,000m",
    color: "#6C5CE7",
    bgGradient: "linear-gradient(180deg, #053566 0%, #03244d 50%, #021a3a 100%)",
    description:
      "The twilight zone where sunlight fades rapidly. Characterized by dim, residual light where photosynthesis cannot occur. Home to bioluminescent species that create their own light — over 90% of creatures here can glow in the dark.",
    details: [
      "Temperature: 4-15°C, rapidly decreasing",
      "Over 90% of animals here are bioluminescent",
      "Largest animal migration on Earth happens here daily",
      "Pressure up to 100x surface atmosphere",
    ],
    creatures: [
      {
        src: "/images/explore/shrimp.png",
        alt: "Deep Sea Shrimp",
        name: "Deep Sea Shrimp",
        fact: "Some species shoot bioluminescent fluid to confuse predators",
      },
      {
        src: "/images/explore/sword_fish.png",
        alt: "Swordfish",
        name: "Swordfish",
        fact: "Can swim up to 97 km/h — one of the fastest fish alive",
      },
    ],
  },
  {
    name: "Aphotic Zone",
    subtitle: "The Midnight Zone",
    depth: "1,000m+",
    color: "#FD79A8",
    bgGradient: "linear-gradient(180deg, #021a3a 0%, #010e24 50%, #020641 100%)",
    description:
      "The midnight zone, far below the reach of sunlight. A world of complete darkness where organisms rely on bioluminescence and chemosynthesis. Crushing pressures and near-freezing temperatures create one of Earth's most extreme — and least explored — environments.",
    details: [
      "Temperature: 1-4°C, near freezing",
      "Pressure exceeds 600x surface atmosphere",
      "Less than 0.01% has been explored by humans",
      "Home to hydrothermal vent ecosystems",
    ],
    creatures: [
      {
        src: "/images/explore/angler_fish.png",
        alt: "Angler Fish",
        name: "Angler Fish",
        fact: "Uses a bioluminescent lure on its head to attract prey in total darkness",
      },
      {
        src: "/images/explore/octopus.png",
        alt: "Deep Sea Octopus",
        name: "Deep Sea Octopus",
        fact: "Has three hearts, blue blood, and can change color in milliseconds",
      },
    ],
  },
];

function DepthMeter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });
  const depthValue = useTransform(scrollYProgress, [0, 1], [0, 11000]);

  return (
    <div ref={ref} className="fixed right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col items-center gap-2">
      <div className="glass px-3 py-2 rounded-full">
        <motion.span className="text-seafoam-300 text-xs font-mono font-bold">
          {/* Depth readout animated via scroll */}
        </motion.span>
      </div>
      <div className="w-0.5 h-32 bg-white/10 rounded-full relative overflow-hidden">
        <motion.div
          className="absolute top-0 left-0 w-full bg-gradient-to-b from-ocean-primary to-biolum-400 rounded-full"
          style={{ height: scrollYProgress }}
        />
      </div>
      <span className="text-white/20 text-[10px] font-mono">DEPTH</span>
    </div>
  );
}

function BubbleField({ count = 12 }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${5 + (i * 97) % 90}%`,
            bottom: `-${20 + (i * 13) % 40}px`,
            width: `${3 + (i % 5) * 2}px`,
            height: `${3 + (i % 5) * 2}px`,
            background: `radial-gradient(circle, rgba(186, 224, 227, ${0.3 + (i % 3) * 0.15}), transparent)`,
          }}
          animate={{
            y: [0, -(800 + (i * 200) % 600)],
            x: [0, Math.sin(i) * 30, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.3],
          }}
          transition={{
            duration: 6 + (i % 4) * 2,
            repeat: Infinity,
            delay: i * 0.7,
            ease: "easeOut",
          }}
        />
      ))}
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

      <div ref={containerRef} className="min-h-screen relative">
        <DepthMeter />

        {/* Hero */}
        <section
          className="relative pt-28 pb-24 px-4 md:px-12 overflow-hidden"
          style={{
            backgroundImage: "url('/images/explore.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundBlendMode: "soft-light",
            backgroundColor: "#095693",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-deep-900/40 via-transparent to-deep-900/80" />
          <BubbleField count={15} />

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                Interactive Journey
              </span>
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
                transition={{ delay: 0.7, duration: 0.8 }}
              >
                Dive through three ocean zones and discover the incredible
                marine life that calls each layer home. Hover over creatures to
                interact with them.
              </motion.p>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              className="mt-16 flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <span className="text-white/30 text-xs uppercase tracking-widest mb-3">
                Scroll to dive
              </span>
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-5 h-8 border-2 border-white/20 rounded-full flex justify-center pt-1"
              >
                <motion.div
                  className="w-1 h-2 bg-ocean-primary rounded-full"
                  animate={{ opacity: [1, 0.3, 1], y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Ocean Zones */}
        {zones.map((zone, zoneIndex) => (
          <section
            key={zone.name}
            className="relative"
            style={{ background: zone.bgGradient }}
          >
            <BubbleField count={6 + zoneIndex * 2} />

            {/* Depth Label */}
            <div
              className={`flex ${zoneIndex % 2 === 0 ? "justify-start" : "justify-end"} px-4 md:px-12 py-6`}
            >
              <motion.div
                initial={{ opacity: 0, x: zoneIndex % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="depth-label"
              >
                <span
                  className="w-2 h-2 rounded-full mr-3 animate-pulse-slow"
                  style={{ backgroundColor: zone.color }}
                />
                {zone.depth}
              </motion.div>
            </div>

            {/* Zone Content */}
            <div
              className={`max-w-6xl mx-auto px-4 md:px-12 py-12 flex flex-col ${
                zoneIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12 md:gap-16`}
            >
              {/* Creatures */}
              <motion.div
                initial={{ opacity: 0, x: zoneIndex % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="w-full md:w-1/2 flex flex-col gap-8 relative"
              >
                {zone.creatures.map((creature, i) => (
                  <div
                    key={creature.alt}
                    className={`group relative ${i === 1 ? "self-end" : "self-start"}`}
                  >
                    <motion.img
                      src={creature.src}
                      alt={creature.alt}
                      className={`${i === 0 ? "w-1/3 md:w-2/5" : "w-2/3 md:w-3/4"} cursor-pointer drop-shadow-2xl`}
                      whileHover={{
                        scale: 1.15,
                        rotate: i === 0 ? 8 : -8,
                        filter: "brightness(1.2) drop-shadow(0 0 20px rgba(14, 155, 191, 0.4))",
                        transition: { type: "spring", stiffness: 200, damping: 15 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ y: [0, -12, 0] }}
                      transition={{
                        y: {
                          duration: 3 + i * 1.5,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 pointer-events-none z-20">
                      <div className="glass px-5 py-4 rounded-xl text-center min-w-[200px]">
                        <p className="text-white font-semibold text-sm mb-1">
                          {creature.name}
                        </p>
                        <p className="text-white/60 text-xs leading-relaxed">
                          {creature.fact}
                        </p>
                      </div>
                      <div
                        className="w-3 h-3 glass rotate-45 mx-auto -mt-1.5"
                        style={{ borderTop: "none", borderLeft: "none" }}
                      />
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Zone Info */}
              <motion.div
                initial={{ opacity: 0, x: zoneIndex % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="w-full md:w-1/2"
              >
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ color: zone.color, opacity: 0.7 }}
                >
                  {zone.subtitle}
                </span>
                <h2
                  className="text-3xl md:text-5xl font-display font-bold mt-1 mb-3"
                  style={{ color: zone.color }}
                >
                  {zone.name}
                </h2>
                <div
                  className="w-16 h-1 rounded-full mb-6"
                  style={{ backgroundColor: zone.color, opacity: 0.4 }}
                />
                <p className="text-white/70 text-base leading-relaxed mb-6">
                  {zone.description}
                </p>

                {/* Zone details */}
                <div className="space-y-3">
                  {zone.details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: zone.color, opacity: 0.6 }}
                      />
                      <span className="text-white/50 text-sm">{detail}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Decorative sea grass at bottom of Euphotic zone */}
            {zoneIndex === 0 && (
              <div className="relative h-20 overflow-hidden opacity-30">
                <img
                  src="/images/sea_grass.png"
                  alt=""
                  className="absolute bottom-0 w-full object-cover object-bottom h-32"
                />
              </div>
            )}
          </section>
        ))}

        {/* CTA */}
        <section
          className="py-24 px-4 md:px-12 relative"
          style={{ backgroundColor: "#020641" }}
        >
          <BubbleField count={8} />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
              <span className="gradient-text">Explore</span>
              <span className="text-white"> More Ocean Life</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Don&apos;t stop here &mdash; there&apos;s a whole ocean full of
              amazing creatures waiting to be discovered. Dive into our
              educational articles or test what you&apos;ve learned.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/learn"
                className="ocean-btn ocean-btn-secondary no-underline"
              >
                Read Articles
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/game"
                className="ocean-btn ocean-btn-outline no-underline"
              >
                Play Games
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

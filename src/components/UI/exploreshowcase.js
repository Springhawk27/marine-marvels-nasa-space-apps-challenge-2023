import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";

const zones = [
  {
    name: "Euphotic Zone",
    depth: "Sea Level - 200m",
    color: "#4ECDC4",
    description:
      "The sunlit zone where photosynthesis thrives. Home to phytoplankton that produce over 50% of Earth's oxygen, colorful coral reefs, and the majority of ocean life. Sunlight floods this zone, fueling a rich ecosystem.",
    creatures: [
      {
        src: "/images/explore/phytoplankton.png",
        alt: "Phytoplankton",
        name: "Phytoplankton",
        fact: "Produce 50% of Earth's oxygen",
      },
      {
        src: "/images/explore/jelly_fish.png",
        alt: "Jellyfish",
        name: "Jellyfish",
        fact: "Existed for over 500 million years",
      },
    ],
    gradient: "from-ocean-600/20 to-ocean-700/40",
  },
  {
    name: "Dysphotic Zone",
    depth: "200m - 1,000m",
    color: "#6C5CE7",
    description:
      "The twilight zone where sunlight fades rapidly. Characterized by dim, residual light where photosynthesis cannot occur. Home to unique, adapted organisms including bioluminescent species that create their own light in the darkness.",
    creatures: [
      {
        src: "/images/explore/shrimp.png",
        alt: "Deep Sea Shrimp",
        name: "Deep Sea Shrimp",
        fact: "Some species glow in the dark",
      },
      {
        src: "/images/explore/sword_fish.png",
        alt: "Swordfish",
        name: "Swordfish",
        fact: "Can swim up to 97 km/h",
      },
    ],
    gradient: "from-deep-600/20 to-deep-800/40",
  },
  {
    name: "Aphotic Zone",
    depth: "1,000m+",
    color: "#FD79A8",
    description:
      "The midnight zone, far below the reach of sunlight. A world of complete darkness where organisms rely on bioluminescence and chemosynthesis. Crushing pressures and near-freezing temperatures create one of Earth's most extreme environments.",
    creatures: [
      {
        src: "/images/explore/angler_fish.png",
        alt: "Angler Fish",
        name: "Angler Fish",
        fact: "Uses a bioluminescent lure to attract prey",
      },
      {
        src: "/images/explore/octopus.png",
        alt: "Deep Sea Octopus",
        name: "Deep Sea Octopus",
        fact: "Has three hearts and blue blood",
      },
    ],
    gradient: "from-deep-800/20 to-deep-950/40",
  },
];

export default function ExploreShowcase() {
  return (
    <>
      <Head>
        <title>Explore the Ocean | Marine Marvels</title>
        <meta
          name="description"
          content="Dive deep into the ocean's three main zones and discover the incredible marine life that calls each layer home."
        />
      </Head>

      <div className="min-h-screen bg-gradient-deep">
        {/* Hero */}
        <section className="relative pt-28 pb-20 px-4 md:px-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="bubble-particle animate-bubble"
                style={{
                  left: `${10 + i * 12}%`,
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: `${3 + i * 0.6}s`,
                  width: `${3 + i * 1.5}px`,
                  height: `${3 + i * 1.5}px`,
                  bottom: 0,
                }}
              />
            ))}
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                Interactive Journey
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mt-3 mb-6">
                <span className="gradient-text">Explore</span>
                <br />
                <span className="text-white">the Ocean</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed">
                Dive through three ocean zones and discover the incredible
                marine life that calls each layer home. Hover over creatures to
                interact with them.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Ocean Zones */}
        {zones.map((zone, zoneIndex) => (
          <section key={zone.name} className="relative">
            {/* Depth Label */}
            <div
              className={`flex ${zoneIndex % 2 === 0 ? "justify-start" : "justify-end"} px-4 md:px-12 py-4`}
            >
              <motion.div
                initial={{ opacity: 0, x: zoneIndex % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="depth-label"
              >
                <span
                  className="w-2 h-2 rounded-full mr-3"
                  style={{ backgroundColor: zone.color }}
                />
                {zone.depth}
              </motion.div>
            </div>

            {/* Zone Content */}
            <div
              className={`container mx-auto px-4 md:px-12 py-12 flex flex-col ${
                zoneIndex % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-12`}
            >
              {/* Creatures */}
              <motion.div
                initial={{ opacity: 0, x: zoneIndex % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="w-full md:w-1/2 flex flex-col gap-6"
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
                        rotate: i === 0 ? 10 : -10,
                        transition: { type: "spring", stiffness: 300 },
                      }}
                      whileTap={{ scale: 0.9 }}
                      animate={{ y: [0, -10, 0] }}
                      transition={{
                        y: {
                          duration: 3 + i,
                          repeat: Infinity,
                          ease: "easeInOut",
                        },
                      }}
                    />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                      <div className="glass px-4 py-3 rounded-xl text-center whitespace-nowrap">
                        <p className="text-white font-semibold text-sm">
                          {creature.name}
                        </p>
                        <p className="text-white/60 text-xs mt-1">
                          {creature.fact}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Zone Info */}
              <motion.div
                initial={{ opacity: 0, x: zoneIndex % 2 === 0 ? 40 : -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="w-full md:w-1/2"
              >
                <h2
                  className="text-3xl md:text-4xl font-display font-bold mb-3"
                  style={{ color: zone.color }}
                >
                  {zone.name}
                </h2>
                <div
                  className="w-16 h-1 rounded-full mb-6"
                  style={{ backgroundColor: zone.color, opacity: 0.5 }}
                />
                <p className="text-white/70 text-base leading-relaxed">
                  {zone.description}
                </p>
              </motion.div>
            </div>
          </section>
        ))}

        {/* CTA */}
        <section className="py-20 px-4 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
              <span className="gradient-text">Explore</span>
              <span className="text-white"> More Ocean Life</span>
            </h2>
            <p className="text-white/60 text-lg max-w-xl mx-auto mb-8 leading-relaxed">
              Don&apos;t stop here &mdash; there&apos;s a whole ocean full of
              amazing creatures waiting to be discovered! Dive deeper into our
              educational articles.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/learn"
                className="ocean-btn ocean-btn-secondary no-underline"
              >
                Read Articles
              </Link>
              <Link
                href="/quiz"
                className="ocean-btn ocean-btn-outline no-underline"
              >
                Take the Quiz
              </Link>
            </div>
          </motion.div>
        </section>
      </div>
    </>
  );
}

import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import { quizTopics } from "@/data/quizData";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const funFacts = [
  "The ocean produces over 50% of the world's oxygen",
  "Less than 5% of the ocean has been explored",
  "The ocean contains 97% of Earth's water",
  "Coral reefs support 25% of all marine species",
  "The deepest point is 36,000 feet below the surface",
  "Phytoplankton are responsible for every other breath you take",
];

export default function Game() {
  return (
    <>
      <Head>
        <title>Ocean Games | Marine Marvels</title>
        <meta name="description" content="Test your ocean knowledge with quizzes, memory games, and educational challenges." />
      </Head>

      <div className="min-h-screen bg-gradient-deep">
        <section className="relative pt-28 pb-20 px-4 md:px-12 overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "url('/images/game.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.08 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-900/50 via-transparent to-deep-900" />

          {/* Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${5 + ((i * 83) % 90)}%`,
                  bottom: `-10px`,
                  width: `${3 + (i % 4) * 2}px`,
                  height: `${3 + (i % 4) * 2}px`,
                  background: `radial-gradient(circle, rgba(255,191,137,${0.15 + (i % 3) * 0.1}), transparent)`,
                }}
                animate={{ y: [0, -(500 + (i * 120) % 400)], opacity: [0, 0.5, 0] }}
                transition={{ duration: 5 + (i % 3) * 2, repeat: Infinity, delay: i * 0.5, ease: "easeOut" }}
              />
            ))}
          </div>

          <div className="max-w-5xl mx-auto relative z-10">
            {/* Hero */}
            <motion.div variants={stagger} initial="hidden" animate="show" className="text-center mb-16">
              <motion.div variants={fadeUp}>
                <span className="inline-block text-sunset-400 text-xs font-semibold uppercase tracking-[0.2em] border border-sunset-400/20 rounded-full px-4 py-1.5 bg-sunset-400/5 backdrop-blur-sm mb-4">
                  Challenge Yourself
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-display font-bold mb-6">
                <span className="text-white">Learn By</span>
                <br />
                <span className="gradient-text-sunset">Playing</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed">
                Choose from quizzes, memory games, and more. Each game teaches
                you something new about our incredible ocean.
              </motion.p>
            </motion.div>

            {/* Quiz Topics */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-6 text-center">
                Choose a Quiz Topic
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {quizTopics.map((topic, index) => (
                  <motion.div
                    key={topic.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.12, duration: 0.5 }}
                  >
                    <Link href={`/quiz?topic=${topic.id}`} className="block no-underline">
                      <div className="glass-card p-6 text-center group h-full">
                        <motion.div
                          className="w-14 h-14 mx-auto mb-4 rounded-full flex items-center justify-center text-2xl font-display font-bold"
                          style={{ backgroundColor: `${topic.color}15`, color: topic.color }}
                          whileHover={{ scale: 1.15, rotate: 10 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          {topic.icon}
                        </motion.div>
                        <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-seafoam-300 transition-colors">
                          {topic.title}
                        </h3>
                        <p className="text-white/40 text-sm mb-3">{topic.description}</p>
                        <span
                          className="text-xs font-semibold px-3 py-1 rounded-full"
                          style={{ backgroundColor: `${topic.color}15`, color: topic.color }}
                        >
                          {topic.questionCount} Questions
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* More Games */}
            <div className="mb-16">
              <h2 className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-6 text-center">
                More Games
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Memory Game */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <Link href="/memory-game" className="block no-underline h-full">
                    <div className="glass-card p-6 group h-full">
                      <div className="grid grid-cols-3 gap-1.5 w-20 mb-4">
                        {[...Array(9)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="aspect-square rounded bg-deep-700/50 border border-white/5"
                            animate={{
                              borderColor: i % 3 === 0
                                ? ["rgba(255,255,255,0.05)", "rgba(14,155,191,0.3)", "rgba(255,255,255,0.05)"]
                                : "rgba(255,255,255,0.05)",
                            }}
                            transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                          />
                        ))}
                      </div>
                      <h3 className="text-white font-display text-xl font-bold mb-2 group-hover:text-seafoam-300 transition-colors">
                        Ocean Memory
                      </h3>
                      <p className="text-white/40 text-sm mb-4">
                        Match pairs of marine creatures and discover fun facts about each one.
                      </p>
                      <span className="ocean-btn ocean-btn-primary text-sm">Play</span>
                    </div>
                  </Link>
                </motion.div>

                {/* Word Scramble */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Link href="/word-scramble" className="block no-underline h-full">
                    <div className="glass-card p-6 group h-full">
                      <div className="flex gap-1.5 mb-4">
                        {["O", "C", "E", "A", "N"].map((letter, i) => (
                          <motion.span
                            key={i}
                            className="w-8 h-8 flex items-center justify-center text-sm font-display font-bold text-sunset-400 rounded border border-sunset-400/20 bg-sunset-400/5"
                            animate={{ y: [0, -5, 0] }}
                            transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                          >
                            {letter}
                          </motion.span>
                        ))}
                      </div>
                      <h3 className="text-white font-display text-xl font-bold mb-2 group-hover:text-seafoam-300 transition-colors">
                        Word Scramble
                      </h3>
                      <p className="text-white/40 text-sm mb-4">
                        Unscramble marine species names and ocean terms. Use hints wisely!
                      </p>
                      <span className="ocean-btn ocean-btn-secondary text-sm">Play</span>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-white/30 text-xs font-semibold uppercase tracking-widest mb-6 text-center">
                Did You Know?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (index % 3) * 0.08 }}
                    whileHover={{ scale: 1.02, borderColor: "rgba(255,255,255,0.1)" }}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] transition-colors"
                  >
                    <p className="text-white/50 text-sm leading-relaxed">{fact}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
}

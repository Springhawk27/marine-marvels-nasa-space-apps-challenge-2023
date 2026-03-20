import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";

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
        <title>Ocean Quiz Game | Marine Marvels</title>
        <meta
          name="description"
          content="Test your ocean knowledge with our interactive quiz game about phytoplankton and marine science."
        />
      </Head>

      <div className="min-h-screen bg-gradient-deep">
        <section className="relative pt-28 pb-20 px-4 md:px-12 overflow-hidden">
          {/* Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="bubble-particle animate-bubble"
                style={{
                  left: `${5 + i * 10}%`,
                  animationDelay: `${i * 0.6}s`,
                  animationDuration: `${3 + i * 0.5}s`,
                  width: `${3 + (i % 4) * 2}px`,
                  height: `${3 + (i % 4) * 2}px`,
                  bottom: 0,
                }}
              />
            ))}
          </div>

          <div className="max-w-4xl mx-auto relative z-10">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <span className="text-sunset-400 text-sm font-semibold uppercase tracking-widest">
                Challenge Yourself
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mt-3 mb-6">
                <span className="text-white">Learn By</span>
                <br />
                <span className="gradient-text-sunset">Playing</span>
              </h1>
              <p className="text-white/60 text-lg max-w-lg mx-auto mb-8 leading-relaxed">
                Test your knowledge about phytoplankton, ocean zones, and marine
                ecosystems with our interactive quiz. Can you get a perfect
                score?
              </p>
              <Link
                href="/quiz"
                className="ocean-btn ocean-btn-secondary no-underline"
              >
                Start Quiz
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
            </motion.div>

            {/* Quiz info cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
              {[
                { label: "Questions", value: "10", icon: "?" },
                { label: "Topic", value: "Phytoplankton", icon: "~" },
                { label: "Difficulty", value: "Medium", icon: "!" },
              ].map((info, index) => (
                <motion.div
                  key={info.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="glass-card p-6 text-center"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-sunset-400/10 flex items-center justify-center text-sunset-400 font-display text-xl font-bold">
                    {info.icon}
                  </div>
                  <p className="text-white font-semibold text-lg">
                    {info.value}
                  </p>
                  <p className="text-white/40 text-xs uppercase tracking-wider">
                    {info.label}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Fun Facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6 text-center">
                Did You Know?
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {funFacts.map((fact, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors"
                  >
                    <p className="text-white/60 text-sm leading-relaxed">
                      {fact}
                    </p>
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

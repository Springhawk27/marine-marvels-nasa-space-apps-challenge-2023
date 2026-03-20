import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import articles from "@/data/articles";

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const fadeUp = { hidden: { opacity: 0, y: 25 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

export default function LearnList() {
  return (
    <>
      <Head>
        <title>Learn About the Ocean | Marine Marvels</title>
        <meta name="description" content="Explore 12 educational articles about ocean ecosystems, marine life, climate change, and more." />
      </Head>

      <div className="min-h-screen bg-gradient-ocean">
        {/* Hero */}
        <section className="relative pt-28 pb-20 px-4 md:px-12 overflow-hidden">
          {/* Background */}
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "url('/images/learn.png')", backgroundSize: "cover", backgroundPosition: "center", opacity: 0.1 }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-900/40 via-transparent to-deep-900" />

          {/* Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${8 + ((i * 73) % 84)}%`,
                  bottom: `-10px`,
                  width: `${3 + (i % 4) * 2}px`,
                  height: `${3 + (i % 4) * 2}px`,
                  background: `radial-gradient(circle, rgba(205,167,255,${0.15 + (i % 3) * 0.1}), transparent)`,
                }}
                animate={{ y: [0, -(500 + (i * 100) % 400)], opacity: [0, 0.5, 0] }}
                transition={{ duration: 5 + (i % 3) * 2, repeat: Infinity, delay: i * 0.6, ease: "easeOut" }}
              />
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp}>
                <span className="inline-block text-biolum-300 text-xs font-semibold uppercase tracking-[0.2em] border border-biolum-300/20 rounded-full px-4 py-1.5 bg-biolum-300/5 backdrop-blur-sm mb-4">
                  Interactive Learning
                </span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-display font-bold mb-6">
                <span className="gradient-text-biolum">Ocean</span>
                <br />
                <span className="text-white">Contribution</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-white/50 text-lg max-w-lg mx-auto leading-relaxed">
                Learn how the ocean&apos;s ability to absorb and store carbon
                helps maintain a balanced carbon cycle, crucial for stabilizing
                Earth&apos;s climate.
              </motion.p>
              <motion.div variants={fadeUp} className="mt-2 text-white/30 text-sm">
                {articles.length} articles to explore
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="px-4 md:px-12 pb-24">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 40, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                >
                  <Link href={`/articles/${article.id}`} className="block no-underline">
                    <div className="glass-card overflow-hidden group h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/90 via-deep-900/20 to-transparent" />
                        <div className="absolute bottom-3 left-3">
                          <span className="text-xs font-semibold text-biolum-300 bg-deep-900/60 backdrop-blur-sm px-3 py-1 rounded-full">
                            Article {article.id}
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <h3 className="text-white font-semibold text-base mb-2 group-hover:text-seafoam-300 transition-colors duration-300">
                          {article.title}
                        </h3>
                        <p className="text-white/40 text-xs leading-relaxed line-clamp-3">
                          {article.description.substring(0, 120)}...
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-ocean-primary text-xs font-semibold translate-x-0 group-hover:translate-x-1 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          Read article
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

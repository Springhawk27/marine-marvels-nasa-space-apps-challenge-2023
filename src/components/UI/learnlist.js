import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import articles from "@/data/articles";

export default function LearnList() {
  return (
    <>
      <Head>
        <title>Learn About the Ocean | Marine Marvels</title>
        <meta
          name="description"
          content="Explore 12 educational articles about ocean ecosystems, marine life, climate change, and more."
        />
      </Head>

      <div className="min-h-screen bg-gradient-ocean">
        {/* Hero */}
        <section className="relative pt-28 pb-16 px-4 md:px-12 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="bubble-particle animate-bubble"
                style={{
                  left: `${20 + i * 15}%`,
                  animationDelay: `${i * 1.2}s`,
                  animationDuration: `${4 + i}s`,
                  width: `${4 + i}px`,
                  height: `${4 + i}px`,
                  bottom: 0,
                }}
              />
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-biolum-300 text-sm font-semibold uppercase tracking-widest">
                Interactive Learning
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mt-3 mb-6">
                <span className="gradient-text-biolum">Ocean</span>
                <br />
                <span className="text-white">Contribution</span>
              </h1>
              <p className="text-white/60 text-lg max-w-lg mx-auto leading-relaxed">
                Learn how the ocean&apos;s ability to absorb and store carbon
                helps maintain a balanced carbon cycle, crucial for stabilizing
                Earth&apos;s climate.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Articles Grid */}
        <section className="px-4 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={article.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <Link
                    href={`/articles/${article.id}`}
                    className="block no-underline"
                  >
                    <div className="glass-card overflow-hidden group h-full">
                      <div className="relative h-44 overflow-hidden">
                        <img
                          src={article.image_url}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 to-transparent" />
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
                        <div className="mt-4 flex items-center gap-2 text-ocean-primary text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          Read article
                          <svg
                            width="12"
                            height="12"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                          >
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

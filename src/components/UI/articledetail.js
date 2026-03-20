import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";
import articles from "@/data/articles";

export default function ArticleDetail({ article }) {
  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-ocean flex items-center justify-center">
        <div className="text-center">
          <div className="skeleton w-64 h-8 mx-auto mb-4" />
          <div className="skeleton w-48 h-4 mx-auto" />
        </div>
      </div>
    );
  }

  const nextArticle = articles.find((a) => a.id === article.id + 1);
  const prevArticle = articles.find((a) => a.id === article.id - 1);

  return (
    <>
      <Head>
        <title>{article.title} | Marine Marvels</title>
        <meta
          name="description"
          content={article.description.substring(0, 160)}
        />
      </Head>

      <div className="min-h-screen bg-gradient-ocean">
        {/* Hero with background image */}
        <section className="relative pt-20">
          <div
            className="relative h-[40vh] md:h-[50vh] bg-cover bg-center"
            style={{
              backgroundImage: `url(${article.background_image})`,
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-deep-900/60 via-deep-900/40 to-deep-900" />
            <div className="relative z-10 flex flex-col justify-end h-full pb-12 px-4 md:px-12">
              <div className="max-w-5xl mx-auto w-full">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Link
                    href="/learn"
                    className="inline-flex items-center gap-2 text-white/50 hover:text-white text-sm no-underline mb-4 transition-colors"
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    Back to Articles
                  </Link>
                  <span className="inline-block text-xs font-semibold text-biolum-300 bg-deep-900/60 backdrop-blur-sm px-3 py-1 rounded-full mb-3">
                    Article {article.id} of {articles.length}
                  </span>
                  <h1 className="text-3xl md:text-5xl font-display font-bold text-white text-shadow-lg">
                    {article.title}
                  </h1>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Facts Banner */}
        {article.keyFacts && (
          <section className="px-4 md:px-12 -mt-6 relative z-10">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="glass-card p-6"
              >
                <h3 className="text-ocean-primary text-xs font-semibold uppercase tracking-widest mb-4">
                  Key Facts
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {article.keyFacts.map((fact, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + i * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-ocean-primary/20 text-ocean-primary text-xs font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <p className="text-white/70 text-sm leading-snug">
                        {fact}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}

        {/* Content */}
        <section className="px-4 md:px-12 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Article text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="glass-card p-8">
                  {article.description.split("\n\n").map((paragraph, i) => (
                    <p
                      key={i}
                      className="text-white/80 text-base leading-[1.8] mb-5 last:mb-0"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Sidebar */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="lg:col-span-2 flex flex-col gap-6"
              >
                {/* Video */}
                {article.video_url && (
                  <div className="glass-card overflow-hidden">
                    <div className="aspect-video">
                      <iframe
                        className="w-full h-full"
                        src={article.video_url}
                        title={article.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-white/50 text-xs">
                        Watch the video to learn more about{" "}
                        {article.title.toLowerCase()}.
                      </p>
                    </div>
                  </div>
                )}

                {/* Quiz CTA */}
                <div className="glass-card p-6 text-center">
                  <h3 className="text-white font-semibold text-lg mb-2">
                    Test Your Knowledge
                  </h3>
                  <p className="text-white/50 text-sm mb-4">
                    Ready to see how much you learned? Take our quiz!
                  </p>
                  <Link
                    href="/game"
                    className="ocean-btn ocean-btn-primary no-underline w-full justify-center"
                  >
                    Play Games
                  </Link>
                </div>

                {/* Article image */}
                <div className="glass-card overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-48 object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Navigation */}
        <section className="px-4 md:px-12 pb-20">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {prevArticle ? (
                <Link
                  href={`/articles/${prevArticle.id}`}
                  className="glass-card p-5 no-underline group"
                >
                  <span className="text-white/30 text-xs uppercase tracking-wider">
                    Previous
                  </span>
                  <p className="text-white group-hover:text-seafoam-300 text-sm font-semibold mt-1 transition-colors flex items-center gap-2">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M19 12H5M12 19l-7-7 7-7" />
                    </svg>
                    {prevArticle.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}
              {nextArticle ? (
                <Link
                  href={`/articles/${nextArticle.id}`}
                  className="glass-card p-5 no-underline group text-right"
                >
                  <span className="text-white/30 text-xs uppercase tracking-wider">
                    Next
                  </span>
                  <p className="text-white group-hover:text-seafoam-300 text-sm font-semibold mt-1 transition-colors flex items-center gap-2 justify-end">
                    {nextArticle.title}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </p>
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

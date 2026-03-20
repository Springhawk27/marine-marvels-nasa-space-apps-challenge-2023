import Link from "next/link";
import { motion } from "framer-motion";
import Head from "next/head";

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

  return (
    <>
      <Head>
        <title>{article.title} | Marine Marvels</title>
        <meta name="description" content={article.description.substring(0, 160)} />
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
              <div className="max-w-4xl mx-auto w-full">
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
                    Article {article.id}
                  </span>
                  <h1
                    className="text-3xl md:text-5xl font-display font-bold text-white text-shadow-lg"
                  >
                    {article.title}
                  </h1>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="px-4 md:px-12 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
              {/* Article text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="lg:col-span-3"
              >
                <div className="glass-card p-8">
                  <p className="text-white/80 text-base leading-[1.8] whitespace-pre-line">
                    {article.description}
                  </p>
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
                        Watch the video to learn more about {article.title.toLowerCase()}.
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
                    href="/quiz"
                    className="ocean-btn ocean-btn-primary no-underline w-full justify-center"
                  >
                    Take the Quiz
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
          <div className="max-w-4xl mx-auto flex justify-between">
            {article.id > 1 && (
              <Link
                href={`/articles/${article.id - 1}`}
                className="ocean-btn ocean-btn-outline no-underline"
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
                Previous
              </Link>
            )}
            <div />
            {article.id < 12 && (
              <Link
                href={`/articles/${article.id + 1}`}
                className="ocean-btn ocean-btn-outline no-underline"
              >
                Next
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </div>
        </section>
      </div>
    </>
  );
}

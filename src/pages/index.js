import RootLayout from "@/components/Layouts/RootLayout";
import HeroCarousel from "@/components/UI/carousel";
import Team from "@/components/UI/team";
import StatsCounter from "@/components/UI/StatsCounter";
import features from "@/data/features";
import { motion } from "framer-motion";
import Link from "next/link";
import Head from "next/head";

const HomePage = () => {
  return (
    <>
      <Head>
        <title>Marine Marvels - Discover the Ocean&apos;s Garden</title>
        <meta
          name="description"
          content="An immersive educational platform unveiling the ocean's essential contributions to our environment. NASA Space Apps Challenge 2023."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="bg-gradient-abyss min-h-screen">
        {/* Hero Section */}
        <section className="relative pt-20 pb-8 px-4 md:px-12">
          {/* Animated background particles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bubble-particle animate-bubble"
                style={{
                  left: `${15 + i * 15}%`,
                  animationDelay: `${i * 1.5}s`,
                  animationDuration: `${4 + i * 0.8}s`,
                  width: `${4 + i * 2}px`,
                  height: `${4 + i * 2}px`,
                  bottom: 0,
                }}
              />
            ))}
          </div>

          {/* Hero text */}
          <div className="max-w-6xl mx-auto mb-10 pt-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h1 className="text-5xl md:text-7xl font-display font-bold text-white mb-6 text-shadow-lg">
                Dive into the
                <br />
                <span className="gradient-text">Ocean&apos;s Garden</span>
              </h1>
              <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed">
                Explore how marine photosynthesis, phytoplankton, and ocean
                ecosystems sustain our planet through an immersive 3D
                interactive experience.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  href="/explore"
                  className="ocean-btn ocean-btn-primary no-underline"
                >
                  Start Exploring
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
                  href="/learn"
                  className="ocean-btn ocean-btn-outline no-underline"
                >
                  Learn More
                </Link>
              </div>
            </motion.div>

            {/* Carousel */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <HeroCarousel />
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <StatsCounter />

        {/* Mission Section */}
        <section className="py-20 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
              >
                <div
                  className="relative rounded-2xl overflow-hidden h-[400px]"
                  style={{
                    backgroundImage: "url('/images/home_article.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-900/90 to-transparent" />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 }}
              >
                <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6">
                  Making Ocean Science
                  <br />
                  <span className="gradient-text">Accessible to All</span>
                </h2>
                <p className="text-white/60 leading-relaxed mb-6">
                  Our mission is to simplify complex science, making the
                  ocean&apos;s significance accessible to everyone. Through
                  interactive 3D visualizations, educational content, and
                  real-time NASA data, we foster a deeper appreciation for the
                  ocean&apos;s profound impact on our world.
                </p>
                <Link
                  href="/learn"
                  className="ocean-btn ocean-btn-secondary no-underline"
                >
                  Discover Articles
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Video Section */}
        <section className="py-20 px-4 md:px-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-deep-900/50 to-transparent" />
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                Watch & Learn
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">
                The Ocean&apos;s Story
              </h2>
              <div className="section-divider-center" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  src: "https://www.youtube.com/embed/cXmUvaGp4eI?si=uHoS3I0apA3NDBR8",
                  title: "The Carbon Cycle",
                },
                {
                  src: "https://www.youtube.com/embed/wYLBDVyVIqI?si=9CV822uNLitYq8eF",
                  title: "Phytoplankton & Oxygen",
                },
              ].map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="glass-card overflow-hidden"
                >
                  <div className="aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={video.src}
                      title={video.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-white text-base font-semibold">
                      {video.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">
                Key Features
              </h2>
              <div className="section-divider-center" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="glass-card overflow-hidden group cursor-default"
                >
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={feature.image_url}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-900/80 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-sm mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/50 text-xs leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 md:px-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-primary/5 to-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto glass-card p-12 md:p-16 text-center relative z-10"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
              Ready to Test Your Knowledge?
            </h2>
            <p className="text-white/60 text-base mb-8 max-w-lg mx-auto">
              Challenge yourself with our interactive quiz about phytoplankton,
              ocean zones, and marine ecosystems.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/quiz"
                className="ocean-btn ocean-btn-primary no-underline"
              >
                Take the Quiz
              </Link>
              <Link
                href="/liveobservation"
                className="ocean-btn ocean-btn-outline no-underline"
              >
                View Live Data
              </Link>
            </div>
          </motion.div>
        </section>

        {/* Team Section */}
        <Team />
      </main>
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

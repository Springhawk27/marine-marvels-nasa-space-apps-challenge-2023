import RootLayout from "@/components/Layouts/RootLayout";
import HeroCarousel from "@/components/UI/carousel";
import Team from "@/components/UI/team";
import StatsCounter from "@/components/UI/StatsCounter";
import features from "@/data/features";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import Head from "next/head";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const whyOcean = [
  {
    title: "Oxygen Producer",
    desc: "The ocean generates over 50% of the world's oxygen through phytoplankton photosynthesis.",
    color: "#4ECDC4",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
  {
    title: "Climate Regulator",
    desc: "Absorbs 30% of CO₂ and over 90% of excess heat from greenhouse gases.",
    color: "#6C5CE7",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" />
      </svg>
    ),
  },
  {
    title: "Food Source",
    desc: "3.3 billion people depend on the ocean as their primary source of protein.",
    color: "#FD79A8",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5l6.74-6.76z" />
        <path d="M16 8L2 22M17.5 15H9" />
      </svg>
    ),
  },
  {
    title: "Biodiversity Haven",
    desc: "Home to over 700,000 known species — 80% of all life on Earth lives in the ocean.",
    color: "#FFBF89",
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
  },
];

const pageLinks = [
  {
    title: "Explore the Deep",
    desc: "Dive through three ocean zones with interactive marine life",
    href: "/explore",
    gradient: "from-ocean-600/20 to-ocean-800/40",
    color: "#4ECDC4",
  },
  {
    title: "Learn & Discover",
    desc: "12 in-depth articles on ocean science backed by NASA data",
    href: "/learn",
    gradient: "from-biolum-400/20 to-deep-800/40",
    color: "#CDA7FF",
  },
  {
    title: "Play Games",
    desc: "Quizzes, memory games, and word scrambles",
    href: "/game",
    gradient: "from-sunset-400/20 to-deep-800/40",
    color: "#FFBF89",
  },
  {
    title: "Live Satellite Data",
    desc: "Real-time ocean imagery from NASA satellites",
    href: "/liveobservation",
    gradient: "from-coral-400/20 to-deep-800/40",
    color: "#FEB6C9",
  },
];

const HomePage = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

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

      <main className="min-h-screen" style={{ background: "linear-gradient(180deg, #010d13 0%, #020641 30%, #010d13 60%, #020641 100%)" }}>

        {/* ===== HERO ===== */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background layers */}
          <div className="absolute inset-0">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: "url('/images/home_background.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
                opacity: 0.18,
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-deep-950/50 via-transparent to-deep-950" />
          </div>

          {/* Floating bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${8 + ((i * 73) % 84)}%`,
                  bottom: `-${10 + (i * 7) % 30}px`,
                  width: `${3 + (i % 5) * 2}px`,
                  height: `${3 + (i % 5) * 2}px`,
                  background: `radial-gradient(circle, rgba(186,224,227,${0.2 + (i % 3) * 0.1}), transparent)`,
                }}
                animate={{
                  y: [0, -(700 + (i * 150) % 500)],
                  x: [0, Math.sin(i) * 25, 0],
                  opacity: [0, 0.6, 0],
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

          {/* Animated light rays */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-0 bg-gradient-to-b from-white/[0.015] to-transparent"
                style={{
                  left: `${20 + i * 20}%`,
                  width: "1.5px",
                  height: "50%",
                  transformOrigin: "top",
                }}
                animate={{
                  opacity: [0.2, 0.6, 0.2],
                  scaleY: [0.7, 1.1, 0.7],
                }}
                transition={{
                  duration: 5 + i,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 1.2,
                }}
              />
            ))}
          </div>

          {/* Hero content with parallax */}
          <motion.div
            style={{ y: heroY, opacity: heroOpacity }}
            className="relative z-10 text-center px-4 max-w-4xl mx-auto"
          >
            <motion.div variants={stagger} initial="hidden" animate="show">
              <motion.div variants={fadeUp} className="mb-6">
                <span className="inline-block text-ocean-primary text-xs font-semibold uppercase tracking-[0.25em] border border-ocean-primary/20 rounded-full px-5 py-2 bg-ocean-primary/5 backdrop-blur-sm">
                  NASA Space Apps Challenge 2023
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="text-5xl sm:text-6xl md:text-8xl font-display font-bold text-white mb-6 text-shadow-lg leading-[1.1]"
              >
                Dive into the
                <br />
                <span className="gradient-text">Ocean&apos;s Garden</span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
              >
                Explore how marine photosynthesis, phytoplankton, and ocean
                ecosystems sustain our planet through an immersive interactive
                experience powered by NASA data.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center">
                <Link href="/explore" className="ocean-btn ocean-btn-primary no-underline text-base">
                  Start Exploring
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
                <Link href="/learn" className="ocean-btn ocean-btn-outline no-underline text-base">
                  Learn More
                </Link>
              </motion.div>
            </motion.div>

            {/* Scroll hint */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
              className="mt-16"
            >
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-6 h-10 border-2 border-white/15 rounded-full mx-auto flex justify-center pt-2"
              >
                <motion.div
                  className="w-1.5 h-2.5 bg-ocean-primary/60 rounded-full"
                  animate={{ opacity: [1, 0.2, 1], y: [0, 6, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Water surface at bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="w-full h-16 md:h-20">
              <motion.path
                d="M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80Z"
                fill="#010d13"
                fillOpacity="0.8"
                animate={{
                  d: [
                    "M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80Z",
                    "M0,35 C240,10 480,60 720,35 C960,10 1200,60 1440,35 L1440,80 L0,80Z",
                    "M0,40 C240,70 480,10 720,40 C960,70 1200,10 1440,40 L1440,80 L0,80Z",
                  ],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>
        </section>

        {/* ===== STATS ===== */}
        <StatsCounter />

        {/* ===== WHY THE OCEAN MATTERS ===== */}
        <section className="py-24 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                Understanding Our Planet
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white mt-3">
                Why the Ocean Matters
              </h2>
              <div className="section-divider-center mt-4" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyOcean.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="glass-card p-6 text-center group"
                >
                  <div
                    className="w-14 h-14 mx-auto mb-4 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.icon}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">{item.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CAROUSEL SHOWCASE ===== */}
        <section className="py-16 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-10"
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                Highlights
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">
                Discover What Awaits
              </h2>
              <div className="section-divider-center mt-3" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <HeroCarousel />
            </motion.div>
          </div>
        </section>

        {/* ===== MISSION ===== */}
        <section className="py-24 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative"
              >
                <div
                  className="relative rounded-2xl overflow-hidden h-[420px]"
                  style={{
                    backgroundImage: "url('/images/home_article.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-950/90 via-deep-950/30 to-transparent" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <span className="text-xs font-semibold text-ocean-primary bg-ocean-primary/10 backdrop-blur-sm px-3 py-1 rounded-full">
                      Our Vision
                    </span>
                  </div>
                </div>
                {/* Decorative blur circle */}
                <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-ocean-primary/10 rounded-full blur-3xl pointer-events-none" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                  Our Mission
                </span>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2 mb-6 leading-tight">
                  Making Ocean Science
                  <br />
                  <span className="gradient-text">Accessible to All</span>
                </h2>
                <p className="text-white/60 leading-[1.8] mb-4">
                  We simplify complex science, making the ocean&apos;s
                  significance accessible to everyone. Through interactive 3D
                  visualizations, educational content, and real-time NASA data,
                  we foster a deeper appreciation for the ocean&apos;s profound
                  impact on our world.
                </p>
                <p className="text-white/40 text-sm leading-relaxed mb-8">
                  From microscopic phytoplankton that produce every other breath
                  you take, to the deep-sea hydrothermal vents that challenge
                  our understanding of life itself — the ocean holds answers to
                  our biggest questions.
                </p>
                <div className="flex gap-4">
                  <Link href="/learn" className="ocean-btn ocean-btn-secondary no-underline">
                    Read Articles
                  </Link>
                  <Link href="/ocean-data" className="ocean-btn ocean-btn-outline no-underline">
                    View Data
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ===== QUICK NAVIGATION ===== */}
        <section className="py-20 px-4 md:px-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-primary/[0.03] to-transparent" />
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                Start Your Journey
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">
                Choose Your Path
              </h2>
              <div className="section-divider-center mt-3" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {pageLinks.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link href={item.href} className="block no-underline h-full">
                    <div className={`glass-card p-6 h-full group bg-gradient-to-br ${item.gradient}`}>
                      <div
                        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 text-lg font-display font-bold transition-transform duration-300 group-hover:scale-110"
                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                      >
                        {i === 0 ? "~" : i === 1 ? "?" : i === 2 ? "*" : "!"}
                      </div>
                      <h3 className="text-white font-semibold text-base mb-2 group-hover:text-seafoam-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">{item.desc}</p>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: item.color }}>
                        Go
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M5 12h14M12 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== VIDEOS ===== */}
        <section className="py-24 px-4 md:px-12 relative">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "url('/images/video_section.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.12,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-deep-950 via-deep-950/85 to-deep-950" />
          <div className="max-w-5xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                Watch & Learn
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">
                The Ocean&apos;s Story
              </h2>
              <div className="section-divider-center mt-3" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { src: "https://www.youtube.com/embed/cXmUvaGp4eI?si=uHoS3I0apA3NDBR8", title: "The Carbon Cycle", desc: "How the ocean absorbs and stores carbon dioxide" },
                { src: "https://www.youtube.com/embed/wYLBDVyVIqI?si=9CV822uNLitYq8eF", title: "Phytoplankton & Oxygen", desc: "The microscopic organisms producing half our oxygen" },
              ].map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.15 }}
                  className="glass-card overflow-hidden group"
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
                  <div className="p-5">
                    <h3 className="text-white text-base font-semibold mb-1">{video.title}</h3>
                    <p className="text-white/40 text-sm">{video.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== FEATURES ===== */}
        <section className="py-24 px-4 md:px-12">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-14"
            >
              <span className="text-ocean-primary text-sm font-semibold uppercase tracking-widest">
                What We Offer
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mt-2">
                Key Features
              </h2>
              <div className="section-divider-center mt-3" />
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.06 }}
                  className="glass-card overflow-hidden group cursor-default"
                >
                  <div className="relative h-36 overflow-hidden">
                    <img
                      src={feature.image_url}
                      alt={feature.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-deep-950/90 via-deep-950/30 to-transparent" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-white font-semibold text-sm mb-2">{feature.title}</h3>
                    <p className="text-white/45 text-xs leading-relaxed">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-24 px-4 md:px-12 relative">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ocean-primary/[0.04] to-transparent" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto relative z-10 text-center"
          >
            <div className="glass-card p-12 md:p-20 relative overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-ocean-primary/10 rounded-full blur-[100px] pointer-events-none" />

              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">
                  Ready to Test Your
                  <br />
                  <span className="gradient-text">Knowledge?</span>
                </h2>
                <p className="text-white/50 text-base md:text-lg mb-10 max-w-lg mx-auto leading-relaxed">
                  Challenge yourself with quizzes, memory games, and word
                  scrambles about phytoplankton, ocean zones, and marine
                  ecosystems.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Link href="/game" className="ocean-btn ocean-btn-primary no-underline text-base">
                    Play Games
                  </Link>
                  <Link href="/liveobservation" className="ocean-btn ocean-btn-outline no-underline text-base">
                    View Live Data
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ===== TEAM ===== */}
        <Team />
      </main>
    </>
  );
};

export default HomePage;

HomePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

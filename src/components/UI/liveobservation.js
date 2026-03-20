import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";
import Link from "next/link";

const nasaLinks = [
  { label: "NASA Worldview", url: "https://worldview.earthdata.nasa.gov/", desc: "Real-time satellite imagery" },
  { label: "NASA Sea Level", url: "https://sealevel.nasa.gov/", desc: "Sea level change data" },
  { label: "PACE Ocean Color", url: "https://pace.gsfc.nasa.gov/", desc: "Ocean biology monitoring" },
  { label: "NOAA Coral Watch", url: "https://coralreefwatch.noaa.gov/", desc: "Coral reef conditions" },
];

const quickFacts = [
  "NASA satellites observe 100% of the ocean surface every 2 days",
  "The Argo network has 4,000 floating sensors monitoring ocean conditions",
  "Ocean color from space tells scientists about phytoplankton health",
  "Satellite altimetry measures sea level changes to within millimeters",
];

export default function LiveObservation({ nasaData, isLoading }) {
  const [selectedCard, setSelectedCard] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const items = nasaData?.collection?.items || [];

  if (!selectedCard && items.length > 0) {
    setSelectedCard(items[0]);
  }

  const filteredItems = searchTerm
    ? items.filter((item) =>
        item.data?.[0]?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : items;

  return (
    <>
      <Head>
        <title>Live Observation | Marine Marvels</title>
        <meta
          name="description"
          content="View live ocean imagery from NASA satellites providing real-time insights into marine environments."
        />
      </Head>

      <div className="min-h-screen bg-gradient-ocean">
        {/* Hero */}
        <section className="relative pt-28 pb-12 px-4 md:px-12">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-biolum-300 text-sm font-semibold uppercase tracking-widest">
                NASA Satellite Imagery
              </span>
              <h1 className="text-5xl md:text-7xl font-display font-bold mt-3 mb-6">
                <span className="gradient-text-biolum">Live</span>{" "}
                <span className="text-white">Observation</span>
              </h1>
              <p className="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
                Real-time ocean imagery from NASA&apos;s Image and Video Library,
                providing insights into the health and dynamics of the marine
                environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* NASA Quick Links */}
        <section className="px-4 md:px-12 pb-8">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {nasaLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="p-3 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-biolum-400/20 transition-all no-underline group text-center"
                >
                  <p className="text-white/70 text-xs font-semibold group-hover:text-biolum-300 transition-colors">
                    {link.label}
                  </p>
                  <p className="text-white/30 text-[10px] mt-0.5">{link.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Main Viewer */}
        <section className="px-4 md:px-12 pb-8">
          <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Image Viewer */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                {selectedCard ? (
                  <motion.div
                    key={selectedCard?.data?.[0]?.nasa_id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="glass-card overflow-hidden"
                  >
                    <div
                      className="relative cursor-pointer"
                      onClick={() => setShowModal(true)}
                    >
                      <img
                        className="w-full max-h-[500px] object-cover"
                        src={selectedCard?.links?.[0]?.href}
                        alt={selectedCard?.data?.[0]?.title}
                      />
                      <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center">
                        <span className="opacity-0 hover:opacity-100 text-white text-sm bg-black/50 px-4 py-2 rounded-full transition-opacity">
                          Click to enlarge
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h2 className="text-white font-semibold text-lg mb-2">
                        {selectedCard?.data?.[0]?.title}
                      </h2>
                      <p className="text-white/50 text-sm leading-relaxed">
                        {selectedCard?.data?.[0]?.description_508 ||
                          (selectedCard?.data?.[0]?.description?.includes("---")
                            ? selectedCard.data[0].description.split("---")[1]
                            : selectedCard?.data?.[0]?.description
                          )?.substring(0, 400)}
                      </p>
                      {selectedCard?.data?.[0]?.date_created && (
                        <p className="text-white/30 text-xs mt-3">
                          Date: {new Date(selectedCard.data[0].date_created).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <div className="glass-card overflow-hidden">
                    <div className="skeleton w-full h-[400px]" />
                    <div className="p-6">
                      <div className="skeleton w-3/4 h-6 mb-3" />
                      <div className="skeleton w-full h-4 mb-2" />
                      <div className="skeleton w-2/3 h-4" />
                    </div>
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar */}
            <div className="flex flex-col gap-4">
              {/* Quick facts */}
              <div className="glass-card p-5">
                <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3">
                  Satellite Facts
                </h3>
                <div className="space-y-3">
                  {quickFacts.map((fact, i) => (
                    <p key={i} className="text-white/50 text-xs leading-relaxed flex items-start gap-2">
                      <span className="text-biolum-300 mt-0.5 flex-shrink-0">&#8226;</span>
                      {fact}
                    </p>
                  ))}
                </div>
              </div>

              {/* Dashboard link */}
              <Link href="/ocean-data" className="glass-card p-5 no-underline group block">
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-seafoam-300 transition-colors">
                  Ocean Dashboard
                </h3>
                <p className="text-white/40 text-xs">
                  View data charts, depth comparisons, and NASA resources
                </p>
                <span className="text-ocean-primary text-xs mt-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Explore
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* Search */}
        <section className="px-4 md:px-12 pb-4">
          <div className="max-w-5xl mx-auto">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search images by title..."
              className="w-full md:w-80 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none focus:border-biolum-400/30 transition-colors"
            />
          </div>
        </section>

        {/* Image Grid */}
        <section className="px-4 md:px-12 pb-20">
          <div className="max-w-5xl mx-auto">
            {isLoading || items.length === 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="glass-card overflow-hidden">
                    <div className="skeleton w-full h-32" />
                    <div className="p-3"><div className="skeleton w-3/4 h-3" /></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {filteredItems.map((item, index) => {
                  const isSelected = selectedCard === item;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: Math.min(index * 0.02, 0.3) }}
                      onClick={() => {
                        setSelectedCard(item);
                        window.scrollTo({ top: 300, behavior: "smooth" });
                      }}
                      className={`glass-card overflow-hidden cursor-pointer group relative ${
                        isSelected ? "ring-2 ring-biolum-300/50" : ""
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-2 right-2 z-10">
                          <span className="text-[10px] font-semibold text-biolum-300 bg-deep-900/80 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            Viewing
                          </span>
                        </div>
                      )}
                      {item.data?.[0]?.media_type === "image" && item.links?.[0] && (
                        <img
                          src={item.links[0].href}
                          alt={item.data[0].title}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      <div className="p-2.5">
                        <h4 className="text-white/50 text-[11px] line-clamp-2 group-hover:text-white/80 transition-colors leading-snug">
                          {item.data?.[0]?.title}
                        </h4>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {showModal && selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-4xl w-full max-h-[90vh] overflow-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedCard?.links?.[0]?.href}
                  alt={selectedCard?.data?.[0]?.title}
                  className="w-full rounded-xl"
                />
                <div className="flex justify-between items-start mt-4">
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {selectedCard?.data?.[0]?.title}
                    </h3>
                    <p className="text-white/50 text-sm mt-1">
                      {selectedCard?.data?.[0]?.center} &mdash; NASA Image Library
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white/50 hover:text-white text-sm bg-white/10 rounded-full px-4 py-2 border-none cursor-pointer transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

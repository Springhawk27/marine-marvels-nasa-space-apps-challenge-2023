import { useState, useRef, useEffect } from "react";
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
  const sidebarRef = useRef(null);

  const items = nasaData?.collection?.items;

  useEffect(() => {
    if (!selectedCard && items && items.length > 0) {
      setSelectedCard(items[0]);
    }
  }, [items, selectedCard]);

  const filteredList = items || [];

  const filteredItems = searchTerm
    ? filteredList.filter((item) =>
        item.data?.[0]?.title?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredList;

  const handleSelect = (item) => {
    setSelectedCard(item);
  };

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
        <section className="relative pt-28 pb-10 px-4 md:px-12 overflow-hidden">
          {/* Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${10 + ((i * 71) % 80)}%`,
                  bottom: `-10px`,
                  width: `${2 + (i % 4) * 1.5}px`,
                  height: `${2 + (i % 4) * 1.5}px`,
                  background: `radial-gradient(circle, rgba(205,167,255,${0.12 + (i % 3) * 0.08}), transparent)`,
                }}
                animate={{ y: [0, -(400 + (i * 100) % 300)], opacity: [0, 0.4, 0] }}
                transition={{ duration: 6 + (i % 3) * 2, repeat: Infinity, delay: i * 0.8, ease: "easeOut" }}
              />
            ))}
          </div>

          <div className="max-w-3xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block text-biolum-300 text-xs font-semibold uppercase tracking-[0.2em] border border-biolum-300/20 rounded-full px-4 py-1.5 bg-biolum-300/5 backdrop-blur-sm mb-4">
                NASA Satellite Imagery
              </span>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-5xl md:text-7xl font-display font-bold mb-4"
            >
              <span className="gradient-text-biolum">Live</span>{" "}
              <span className="text-white">Observation</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-white/60 text-base max-w-lg mx-auto leading-relaxed"
            >
              Real-time ocean imagery from NASA&apos;s Image and Video Library.
            </motion.p>
          </div>
        </section>

        {/* NASA Quick Links */}
        <section className="px-4 md:px-12 pb-6">
          <div className="max-w-6xl mx-auto">
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
                  className="p-3 rounded-xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-biolum-400/20 transition-all no-underline group text-center"
                >
                  <p className="text-white text-xs font-semibold group-hover:text-biolum-300 transition-colors">
                    {link.label}
                  </p>
                  <p className="text-white/40 text-[10px] mt-0.5">{link.desc}</p>
                </motion.a>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content: Viewer + Sidebar */}
        <section className="px-4 md:px-12 pb-10">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-6">
              {/* Main Viewer */}
              <div className="flex-1 min-w-0">
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
                          className="w-full max-h-[520px] object-cover"
                          src={selectedCard?.links?.[0]?.href}
                          alt={selectedCard?.data?.[0]?.title}
                        />
                        <div className="absolute bottom-3 right-3">
                          <span className="text-white/80 text-xs bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                            Click to enlarge
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <h2 className="text-white font-semibold text-xl mb-3">
                          {selectedCard?.data?.[0]?.title}
                        </h2>
                        <p className="text-white/70 text-sm leading-relaxed">
                          {selectedCard?.data?.[0]?.description_508 ||
                            (selectedCard?.data?.[0]?.description?.includes("---")
                              ? selectedCard.data[0].description.split("---")[1]
                              : selectedCard?.data?.[0]?.description
                            )?.substring(0, 500)}
                        </p>
                        {selectedCard?.data?.[0]?.date_created && (
                          <p className="text-white/40 text-xs mt-4">
                            Published: {new Date(selectedCard.data[0].date_created).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                          </p>
                        )}
                        {selectedCard?.data?.[0]?.center && (
                          <p className="text-white/40 text-xs mt-1">
                            Source: {selectedCard.data[0].center}
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

              {/* Right Sidebar: Search + Scrollable Cards */}
              <div className="lg:w-[360px] flex-shrink-0 flex flex-col">
                {/* Search above the cards */}
                <div className="mb-3">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search images..."
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm placeholder-white/30 outline-none focus:border-biolum-400/40 transition-colors"
                  />
                </div>

                {/* Scrollable card list */}
                <div
                  ref={sidebarRef}
                  className="flex-1 lg:max-h-[580px] lg:overflow-y-auto lg:overflow-x-hidden rounded-xl"
                  style={{
                    scrollbarWidth: "thin",
                    scrollbarColor: "rgba(14,155,191,0.3) transparent",
                  }}
                >
                  <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-3 sticky top-0 bg-deep-900/95 backdrop-blur-sm pb-2 pt-1 z-10 px-1">
                    {filteredItems.length} Images
                  </h3>

                  {isLoading || filteredList.length === 0 ? (
                    <div className="space-y-3">
                      {[...Array(6)].map((_, i) => (
                        <div key={i} className="flex gap-3">
                          <div className="skeleton w-40 h-24 flex-shrink-0 rounded-lg" />
                          <div className="flex-1 py-1">
                            <div className="skeleton w-full h-3 mb-2" />
                            <div className="skeleton w-2/3 h-3" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {filteredItems.map((item, index) => {
                        const isSelected = selectedCard === item;
                        return (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: Math.min(index * 0.02, 0.5) }}
                            onClick={() => handleSelect(item)}
                            className={`flex gap-3 p-2 rounded-xl cursor-pointer transition-all ${
                              isSelected
                                ? "bg-biolum-400/10 border border-biolum-400/20"
                                : "hover:bg-white/[0.03] border border-transparent"
                            }`}
                          >
                            <div className="w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden relative">
                              {item.data?.[0]?.media_type === "image" && item.links?.[0] && (
                                <img
                                  src={item.links[0].href}
                                  alt={item.data[0].title}
                                  className="w-full h-full object-cover"
                                />
                              )}
                              {isSelected && (
                                <div className="absolute inset-0 border-2 border-biolum-300/60 rounded-lg" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0 py-0.5">
                              <h4 className={`text-xs font-semibold leading-snug line-clamp-2 mb-1 ${
                                isSelected ? "text-biolum-300" : "text-white/80"
                              }`}>
                                {item.data?.[0]?.title}
                              </h4>
                              <p className="text-white/40 text-[10px]">
                                {item.data?.[0]?.center || "NASA"}
                              </p>
                              {item.data?.[0]?.date_created && (
                                <p className="text-white/30 text-[10px] mt-0.5">
                                  {new Date(item.data[0].date_created).getFullYear()}
                                </p>
                              )}
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Info Section below viewer */}
        <section className="px-4 md:px-12 pb-20">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Satellite Facts */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="glass-card p-5">
                <h3 className="text-white font-semibold text-sm mb-3">
                  Satellite Facts
                </h3>
                <div className="space-y-3">
                  {quickFacts.map((fact, i) => (
                    <p key={i} className="text-white/60 text-xs leading-relaxed flex items-start gap-2">
                      <span className="text-biolum-300 mt-0.5 flex-shrink-0">&#8226;</span>
                      {fact}
                    </p>
                  ))}
                </div>
              </motion.div>

              {/* Dashboard link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
              <Link href="/ocean-data" className="glass-card p-5 no-underline group block">
                <div className="w-10 h-10 rounded-lg bg-ocean-primary/10 flex items-center justify-center text-ocean-primary mb-3">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 3v18h18M7 16l4-8 4 4 4-6" />
                  </svg>
                </div>
                <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-seafoam-300 transition-colors">
                  Ocean Data Dashboard
                </h3>
                <p className="text-white/40 text-xs leading-relaxed">
                  Explore ocean climate charts, depth comparisons, and NASA research resources.
                </p>
              </Link>
              </motion.div>

              {/* About the data */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="glass-card p-5">
                <h3 className="text-white font-semibold text-sm mb-3">
                  About This Data
                </h3>
                <p className="text-white/60 text-xs leading-relaxed mb-3">
                  Images are sourced from NASA&apos;s Image and Video Library API, which provides access to NASA&apos;s media archives including ocean observation imagery from multiple satellite missions.
                </p>
                <a
                  href="https://images.nasa.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-primary text-xs font-semibold no-underline hover:underline inline-flex items-center gap-1"
                >
                  NASA Image Library
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M7 17L17 7M17 7H7M17 7v10" />
                  </svg>
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Modal */}
        <AnimatePresence>
          {showModal && selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm"
              onClick={() => setShowModal(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-5xl w-full max-h-[90vh] overflow-auto"
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
                    <p className="text-white/60 text-sm mt-1">
                      {selectedCard?.data?.[0]?.center} &mdash; NASA Image Library
                    </p>
                  </div>
                  <button
                    onClick={() => setShowModal(false)}
                    className="text-white/60 hover:text-white text-sm bg-white/10 hover:bg-white/20 rounded-full px-4 py-2 border-none cursor-pointer transition-colors"
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

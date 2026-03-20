import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Head from "next/head";

export default function LiveObservation({ nasaData, isLoading }) {
  const [selectedCard, setSelectedCard] = useState(null);

  const items = nasaData?.collection?.items || [];

  if (!selectedCard && items.length > 0) {
    setSelectedCard(items[0]);
  }

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
        <section className="relative pt-28 pb-16 px-4 md:px-12">
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
                Real-time ocean imagery providing unprecedented insights into
                the health and dynamics of the marine environment.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Selected Image Viewer */}
        <section className="px-4 md:px-12 pb-8">
          <div className="max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {selectedCard ? (
                <motion.div
                  key={selectedCard?.data?.[0]?.nasa_id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="glass-card overflow-hidden"
                >
                  <img
                    className="w-full max-h-[500px] object-cover"
                    src={selectedCard?.links?.[0]?.href}
                    alt={selectedCard?.data?.[0]?.title}
                  />
                  <div className="p-6">
                    <h2 className="text-white font-semibold text-lg mb-2">
                      {selectedCard?.data?.[0]?.title}
                    </h2>
                    <p className="text-white/50 text-sm leading-relaxed">
                      {selectedCard?.data?.[0]?.description_508 ||
                        (selectedCard?.data?.[0]?.description?.includes("---")
                          ? selectedCard.data[0].description.split("---")[1]
                          : selectedCard?.data?.[0]?.description
                        )?.substring(0, 300)}
                    </p>
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
        </section>

        {/* Image Grid */}
        <section className="px-4 md:px-12 pb-20">
          <div className="max-w-7xl mx-auto">
            <h3 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">
              Select an image to view details
            </h3>

            {isLoading || items.length === 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="glass-card overflow-hidden">
                    <div className="skeleton w-full h-40" />
                    <div className="p-4">
                      <div className="skeleton w-3/4 h-4" />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {items.map((item, index) => {
                  const isSelected = selectedCard === item;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.03 }}
                      onClick={() => setSelectedCard(item)}
                      className={`glass-card overflow-hidden cursor-pointer group relative ${
                        isSelected ? "ring-2 ring-biolum-300/50" : ""
                      }`}
                    >
                      {isSelected && (
                        <div className="absolute top-3 right-3 z-10">
                          <span className="text-xs font-semibold text-biolum-300 bg-deep-900/80 backdrop-blur-sm px-2 py-1 rounded-full">
                            Viewing
                          </span>
                        </div>
                      )}

                      {item.data?.[0]?.media_type === "image" &&
                        item.links?.[0] && (
                          <img
                            src={item.links[0].href}
                            alt={item.data[0].title}
                            className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      <div className="p-3">
                        <h4 className="text-white/60 text-xs line-clamp-2 group-hover:text-white transition-colors">
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
      </div>
    </>
  );
}

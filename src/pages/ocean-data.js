import RootLayout from "@/components/Layouts/RootLayout";
import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const oceanData = {
  temperature: [
    { year: "1960", value: 0 },
    { year: "1970", value: 0.02 },
    { year: "1980", value: 0.05 },
    { year: "1990", value: 0.12 },
    { year: "2000", value: 0.22 },
    { year: "2010", value: 0.38 },
    { year: "2020", value: 0.56 },
    { year: "2023", value: 0.63 },
  ],
  seaLevel: [
    { year: "1900", value: 0 },
    { year: "1920", value: 2 },
    { year: "1940", value: 5 },
    { year: "1960", value: 7 },
    { year: "1980", value: 10 },
    { year: "2000", value: 14 },
    { year: "2010", value: 18 },
    { year: "2023", value: 24 },
  ],
  co2Absorbed: [
    { year: "1960", value: 1.0 },
    { year: "1970", value: 1.3 },
    { year: "1980", value: 1.6 },
    { year: "1990", value: 2.0 },
    { year: "2000", value: 2.3 },
    { year: "2010", value: 2.6 },
    { year: "2020", value: 3.0 },
    { year: "2023", value: 3.1 },
  ],
};

const oceanFacts = [
  { label: "Ocean Surface Area", value: "361 million km²", icon: "~" },
  { label: "Average Depth", value: "3,688 meters", icon: "=" },
  { label: "Total Volume", value: "1.335 billion km³", icon: "O" },
  { label: "Deepest Point", value: "10,935 meters", icon: "V" },
  { label: "Coastline Length", value: "1.6 million km", icon: "^" },
  { label: "Known Species", value: "~700,000+", icon: "*" },
];

const nasaResources = [
  {
    title: "NASA PACE Satellite",
    description: "Monitors ocean color, phytoplankton, and aerosols globally",
    url: "https://pace.gsfc.nasa.gov/",
    color: "#4ECDC4",
  },
  {
    title: "NASA Sea Level Portal",
    description: "Track sea level changes using satellite altimetry data",
    url: "https://sealevel.nasa.gov/",
    color: "#6C5CE7",
  },
  {
    title: "NASA Worldview",
    description: "Interactive real-time satellite imagery of Earth",
    url: "https://worldview.earthdata.nasa.gov/",
    color: "#FD79A8",
  },
  {
    title: "NASA Ocean Color Web",
    description: "Ocean biology data from multiple NASA satellite missions",
    url: "https://oceancolor.gsfc.nasa.gov/",
    color: "#FFBF89",
  },
  {
    title: "NOAA Ocean Data",
    description: "Comprehensive ocean observations and climate data",
    url: "https://www.ncei.noaa.gov/products/ocean",
    color: "#BAE3C3",
  },
  {
    title: "Argo Float Network",
    description: "Global array of 4,000 ocean-monitoring floats",
    url: "https://argo.ucsd.edu/",
    color: "#CDA7FF",
  },
];

function BarChart({ data, color, unit, label }) {
  const maxVal = Math.max(...data.map((d) => d.value));
  const chartHeight = 160;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="glass-card p-6"
    >
      <h3 className="text-white font-semibold text-base mb-1">{label}</h3>
      <p className="text-white/40 text-xs mb-4">Source: NASA / NOAA</p>
      <div className="flex items-end gap-2" style={{ height: chartHeight + 24 }}>
        {data.map((d, i) => {
          const barHeight = maxVal > 0 ? Math.max((d.value / maxVal) * chartHeight, 4) : 4;
          return (
            <div key={d.year} className="flex-1 flex flex-col items-center justify-end" style={{ height: chartHeight + 24 }}>
              <motion.div
                className="relative w-full rounded-t-md group cursor-default"
                style={{ backgroundColor: color, minWidth: 12 }}
                initial={{ height: 0 }}
                whileInView={{ height: barHeight }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" }}
              >
                <div className="absolute -top-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  <span className="text-white text-[10px] font-semibold bg-deep-900/90 px-2 py-0.5 rounded">
                    {d.value}{unit}
                  </span>
                </div>
              </motion.div>
              <span className="text-white/40 text-[9px] mt-2 leading-none">{d.year}</span>
            </div>
          );
        })}
      </div>
      <div className="flex justify-between mt-4 pt-3 border-t border-white/5">
        <span className="text-white/30 text-[10px]">
          {data[0].year}: {data[0].value}{unit}
        </span>
        <span className="text-xs font-semibold" style={{ color }}>
          {data[data.length - 1].year}: {data[data.length - 1].value}{unit}
          <span className="text-white/30 font-normal ml-1">
            (+{(((data[data.length - 1].value - data[0].value) / Math.max(data[0].value, 0.01)) * 100).toFixed(0)}%)
          </span>
        </span>
      </div>
    </motion.div>
  );
}

function OceanDataPage() {
  return (
    <>
      <Head>
        <title>Ocean Data Dashboard | Marine Marvels</title>
        <meta
          name="description"
          content="Explore ocean data visualizations including temperature trends, sea level rise, and CO2 absorption rates."
        />
      </Head>

      <div className="min-h-screen bg-gradient-abyss">
        {/* Hero */}
        <section className="relative pt-28 pb-16 px-4 md:px-12 overflow-hidden">
          {/* Bubbles */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${10 + ((i * 67) % 80)}%`,
                  bottom: `-10px`,
                  width: `${3 + (i % 4) * 1.5}px`,
                  height: `${3 + (i % 4) * 1.5}px`,
                  background: `radial-gradient(circle, rgba(186,224,227,${0.15 + (i % 3) * 0.08}), transparent)`,
                }}
                animate={{ y: [0, -(400 + (i * 80) % 300)], opacity: [0, 0.5, 0] }}
                transition={{ duration: 5 + (i % 3) * 2, repeat: Infinity, delay: i * 0.7, ease: "easeOut" }}
              />
            ))}
          </div>

          <div className="max-w-5xl mx-auto text-center relative z-10">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <span className="inline-block text-ocean-primary text-xs font-semibold uppercase tracking-[0.2em] border border-ocean-primary/20 rounded-full px-4 py-1.5 bg-ocean-primary/5 backdrop-blur-sm mb-4">
                Data & Resources
              </span>
            </motion.div>
            <motion.h1 initial={{ opacity: 0, y: 25 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.6 }} className="text-5xl md:text-7xl font-display font-bold mb-6">
              <span className="gradient-text">Ocean</span>{" "}
              <span className="text-white">Dashboard</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }} className="text-white/50 text-lg max-w-xl mx-auto leading-relaxed">
              Visualize key ocean metrics and explore NASA resources for
              real-time marine and climate data.
            </motion.p>
          </div>
        </section>

        {/* Quick Facts */}
        <section className="px-4 md:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {oceanFacts.map((fact, i) => (
                <motion.div
                  key={fact.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="glass-card p-4 text-center"
                >
                  <div className="w-8 h-8 mx-auto mb-2 rounded-full bg-ocean-primary/10 flex items-center justify-center text-ocean-primary text-sm font-bold">
                    {fact.icon}
                  </div>
                  <p className="text-white font-semibold text-sm">{fact.value}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-wider mt-1">
                    {fact.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Charts */}
        <section className="px-4 md:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">
              Ocean Climate Trends
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <BarChart
                data={oceanData.temperature}
                color="#FD79A8"
                unit="°C"
                label="Ocean Temperature Anomaly"
              />
              <BarChart
                data={oceanData.seaLevel}
                color="#6C5CE7"
                unit=" cm"
                label="Sea Level Rise (since 1900)"
              />
              <BarChart
                data={oceanData.co2Absorbed}
                color="#4ECDC4"
                unit=" GtC/yr"
                label="Ocean CO₂ Absorption"
              />
            </div>
          </div>
        </section>

        {/* Depth comparison */}
        <section className="px-4 md:px-12 pb-16">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">
              Ocean Depth Comparison
            </h2>
            <div className="glass-card p-6 md:p-8">
              <div className="space-y-4">
                {[
                  { name: "Average Pool", depth: 2, color: "#4ECDC4" },
                  { name: "Scuba Diving Limit", depth: 40, color: "#4ECDC4" },
                  { name: "Titanic Wreck", depth: 3800, color: "#6C5CE7" },
                  { name: "Average Ocean Depth", depth: 3688, color: "#6C5CE7" },
                  { name: "Deepest Freedive", depth: 214, color: "#4ECDC4" },
                  { name: "Mount Everest (inverted)", depth: 8849, color: "#FD79A8" },
                  { name: "Mariana Trench", depth: 10935, color: "#FD79A8" },
                ].sort((a, b) => a.depth - b.depth).map((item, i) => (
                  <div key={item.name} className="flex items-center gap-4">
                    <span className="text-white/50 text-xs w-40 md:w-48 text-right flex-shrink-0">
                      {item.name}
                    </span>
                    <div className="flex-1 h-6 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: item.color }}
                        initial={{ width: 0 }}
                        whileInView={{
                          width: `${Math.max((item.depth / 10935) * 100, 1)}%`,
                        }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                      />
                    </div>
                    <span className="text-white/60 text-xs font-mono w-16 flex-shrink-0">
                      {item.depth.toLocaleString()}m
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* NASA Resources */}
        <section className="px-4 md:px-12 pb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-white/40 text-xs font-semibold uppercase tracking-widest mb-6">
              NASA & Research Resources
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {nasaResources.map((resource, i) => (
                <motion.a
                  key={resource.title}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-card p-5 no-underline group block"
                >
                  <div
                    className="w-2 h-2 rounded-full mb-3"
                    style={{ backgroundColor: resource.color }}
                  />
                  <h3 className="text-white font-semibold text-sm mb-1 group-hover:text-seafoam-300 transition-colors">
                    {resource.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed">
                    {resource.description}
                  </p>
                  <div className="mt-3 flex items-center gap-1 text-ocean-primary text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                    Visit
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default OceanDataPage;

OceanDataPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

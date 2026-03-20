import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const slides = [
  {
    image: "/images/carousel/image1.png",
    title: "The Ocean's Garden",
    subtitle:
      "Discover the ocean's hidden beauty and vital services — a life-sustaining garden that provides oxygen, combats CO2, and fuels our world.",
    cta: null,
  },
  {
    image: "/images/carousel/image2.png",
    title: "Explore the Ocean",
    subtitle:
      "An interactive 3D visual where you can explore various ocean ecosystems and marine life.",
    cta: { label: "Explore", href: "/explore" },
  },
  {
    image: "/images/carousel/image3.png",
    title: "Contribution of Ocean",
    subtitle:
      "Learn how this magnificent body of water sustains us in ways you might not have imagined.",
    cta: { label: "Learn", href: "/learn" },
  },
  {
    image: "/images/carousel/image4.png",
    title: "Learn by Playing",
    subtitle:
      "Test your knowledge with interactive quizzes about marine life and ocean science.",
    cta: { label: "Play", href: "/game" },
  },
];

const HeroCarousel = () => {
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[600px] rounded-2xl overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className="absolute inset-0 transition-opacity duration-1000"
          style={{
            opacity: current === index ? 1 : 0,
            zIndex: current === index ? 1 : 0,
          }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
          <div className="relative z-10 flex flex-col justify-center h-full p-8 md:p-16 max-w-2xl">
            {current === index && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-4 text-shadow-lg">
                  {slide.title}
                </h2>
                <p className="text-white/80 text-base md:text-lg mb-6 leading-relaxed max-w-lg">
                  {slide.subtitle}
                </p>
                {slide.cta && (
                  <Link
                    href={slide.cta.href}
                    className="ocean-btn ocean-btn-secondary"
                  >
                    {slide.cta.label}
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
                )}
              </motion.div>
            )}
          </div>
        </div>
      ))}

      {/* Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full border-none cursor-pointer transition-all duration-300 ${
              current === index
                ? "bg-white w-8"
                : "bg-white/40 hover:bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;

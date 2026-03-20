import Head from "next/head";
import Link from "next/link";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Lost at Sea | Marine Marvels</title>
        <meta name="description" content="Page not found" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-abyss flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${5 + ((i * 61) % 90)}%`,
                bottom: `-20px`,
                width: `${3 + (i % 5) * 2}px`,
                height: `${3 + (i % 5) * 2}px`,
                background: `radial-gradient(circle, rgba(186,224,227,${0.15 + (i % 3) * 0.1}), transparent)`,
              }}
              animate={{
                y: [0, -(600 + (i * 100) % 500)],
                x: [0, Math.sin(i) * 30, 0],
                opacity: [0, 0.5, 0],
              }}
              transition={{
                duration: 5 + (i % 4) * 2,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeOut",
              }}
            />
          ))}
        </div>

        {/* Light rays */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute top-0 bg-gradient-to-b from-white/[0.02] to-transparent"
              style={{ left: `${25 + i * 25}%`, width: "1.5px", height: "40%" }}
              animate={{ opacity: [0.2, 0.5, 0.2], scaleY: [0.8, 1.1, 0.8] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut", delay: i }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center relative z-10"
        >
          {/* Floating 404 */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="text-[130px] md:text-[200px] font-display font-bold gradient-text leading-none select-none">
              404
            </h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-2xl md:text-3xl font-display font-bold text-white mb-4 -mt-6"
          >
            Lost at Sea
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="text-white/40 text-base max-w-md mx-auto mb-10"
          >
            The page you&apos;re looking for has drifted into the deep ocean.
            Let&apos;s navigate back to familiar waters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/" className="ocean-btn ocean-btn-primary no-underline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Back to Shore
            </Link>
            <Link href="/explore" className="ocean-btn ocean-btn-outline no-underline">
              Explore Ocean
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;

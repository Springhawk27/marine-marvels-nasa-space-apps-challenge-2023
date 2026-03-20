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
        {/* Bubbles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="bubble-particle animate-bubble"
              style={{
                left: `${10 + i * 12}%`,
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${3 + i * 0.5}s`,
                width: `${4 + i * 1.5}px`,
                height: `${4 + i * 1.5}px`,
                bottom: 0,
              }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <h1 className="text-[120px] md:text-[180px] font-display font-bold gradient-text leading-none">
              404
            </h1>
          </motion.div>

          <h2 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 -mt-4">
            Lost at Sea
          </h2>
          <p className="text-white/50 text-base max-w-md mx-auto mb-8">
            The page you&apos;re looking for has drifted into the deep ocean.
            Let&apos;s navigate back to familiar waters.
          </p>

          <Link href="/" className="ocean-btn ocean-btn-primary no-underline">
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
            Back to Shore
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default NotFoundPage;

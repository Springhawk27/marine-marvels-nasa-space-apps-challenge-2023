import { MenuOutlined, CloseOutlined } from "@ant-design/icons";
import { Layout, Drawer } from "antd";
const { Content } = Layout;
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Explore", href: "/explore" },
  { label: "Learn", href: "/learn" },
  { label: "Game", href: "/game" },
  { label: "Live Observation", href: "/liveobservation" },
];

const RootLayout = ({ children }) => {
  const router = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Layout style={{ background: "transparent", minHeight: "100vh" }}>
      {/* Navbar */}
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(1, 13, 19, 0.85)"
            : "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          borderBottom: scrolled
            ? "1px solid rgba(186, 224, 227, 0.1)"
            : "1px solid transparent",
          padding: "0 24px",
          height: "64px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Link href="/" className="flex items-center gap-3 no-underline">
          <Image
            src="/images/nav_logo.png"
            width={40}
            height={20}
            alt="Marine Marvels"
            className="object-contain"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-white font-display text-lg font-semibold tracking-wider">
              Marine
            </span>
            <span className="text-seafoam-300 text-xs font-medium tracking-widest uppercase">
              Marvels
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.nav_link} ${
                router.pathname === item.href ? styles.nav_link_active : ""
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white text-xl bg-transparent border-none cursor-pointer p-2"
          onClick={() => setDrawerOpen(true)}
        >
          <MenuOutlined />
        </button>

        {/* Mobile Drawer */}
        <Drawer
          title={null}
          placement="right"
          width={280}
          closable={false}
          onClose={() => setDrawerOpen(false)}
          open={drawerOpen}
          styles={{
            body: { padding: 0 },
            wrapper: {},
          }}
          style={{
            background:
              "linear-gradient(to bottom, #043a4d 0%, #020641 100%)",
          }}
        >
          <div className="p-6">
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/nav_logo.png"
                  width={32}
                  height={16}
                  alt="Marine Marvels"
                />
                <span className="text-white font-display text-lg font-semibold">
                  Marine Marvels
                </span>
              </div>
              <button
                className="text-white text-lg bg-transparent border-none cursor-pointer"
                onClick={() => setDrawerOpen(false)}
              >
                <CloseOutlined />
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDrawerOpen(false)}
                  className={`block py-3 px-4 rounded-lg text-base font-medium no-underline transition-all duration-200 ${
                    router.pathname === item.href
                      ? "text-seafoam-300 bg-white/10"
                      : "text-white/70 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </Drawer>
      </header>

      {/* Main Content */}
      <Content style={{ position: "relative" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={router.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </Content>

      {/* Footer */}
      <footer className="relative bg-gradient-to-b from-transparent to-deep-950">
        {/* Wave SVG */}
        <div className="wave-divider">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
          >
            <path
              d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120Z"
              fill="#020641"
              fillOpacity="0.6"
            />
            <path
              d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,30 1440,80 L1440,120 L0,120Z"
              fill="#020641"
              fillOpacity="0.8"
            />
          </svg>
        </div>

        <div
          className="px-6 md:px-12 pt-12 pb-8"
          style={{ backgroundColor: "#020641" }}
        >
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Image
                    src="/images/nav_logo.png"
                    width={40}
                    height={20}
                    alt="Marine Marvels"
                  />
                  <span className="text-white font-display text-xl font-semibold tracking-wider">
                    Marine Marvels
                  </span>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">
                  An immersive educational platform unveiling the ocean&apos;s
                  essential contributions to our environment. Built for NASA
                  Space Apps Challenge 2023.
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-white font-display text-sm uppercase tracking-widest mb-4">
                  Explore
                </h4>
                <nav className="flex flex-col gap-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-white/50 hover:text-seafoam-300 text-sm no-underline transition-colors duration-200"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Resources */}
              <div>
                <h4 className="text-white font-display text-sm uppercase tracking-widest mb-4">
                  Resources
                </h4>
                <nav className="flex flex-col gap-2">
                  <span className="text-white/50 text-sm">
                    NASA Ocean Color Gallery
                  </span>
                  <span className="text-white/50 text-sm">
                    NASA Oceanography Data
                  </span>
                  <span className="text-white/50 text-sm">
                    NOAA Ocean Facts
                  </span>
                  <span className="text-white/50 text-sm">NASA EOSDIS API</span>
                </nav>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-6" />

            {/* Bottom */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-xs">
                Marine Marvels &copy; 2023 &mdash; NASA Space Apps Challenge
              </p>
              <button
                onClick={scrollToTop}
                className="text-white/30 hover:text-seafoam-300 text-xs bg-transparent border border-white/10 hover:border-seafoam-300/30 rounded-full px-4 py-2 cursor-pointer transition-all duration-300"
              >
                Back to top
              </button>
            </div>
          </div>
        </div>
      </footer>
    </Layout>
  );
};

export default RootLayout;

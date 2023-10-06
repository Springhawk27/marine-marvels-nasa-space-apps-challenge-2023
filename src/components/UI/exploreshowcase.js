import Link from "next/link";
import { motion } from "framer-motion";

export default function ExploreShowcase() {
  const exploreGradientBackground = `
    linear-gradient(
      to bottom,
      rgb(9,86,147) 0%,
      rgb(2,52,108) 50%,
      rgb(2,6,65) 100%
    )
  `;
  return (
    <div
      className="bg-local relative"
      style={{
        background: exploreGradientBackground,
        // backgroundImage: `url('/images/explore_showcase.png')`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#023667",
        minHeight: "100vh",
      }}
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-14 sm:py-18 lg:py-24">
          <div className="text-left">
            <h1 className="flex flex-col text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span
                style={{
                  color: "#BAE0E3",
                }}
              >
                Explore
              </span>
              <span className="text-white"> the Ocean</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white sm:w-2/4 w-3/4">
              An interactive 3D Visual where you can explore various ocean
              ecosystems, marine life, and understand the interconnectedness of
              marine services
            </p>
          </div>
        </div>
      </div>

      <section className="text-gray-600 body-font">
        <div className="  py-4 mx-auto">
          <div className="flex flex-col text-start sm:w-1/6 w-2/6 mb-4">
            <h2
              className="text-xs text-white tracking-widest font-medium title-font mb-1 bg-sky-700 py-2 rounded-r-lg text-end px-2"
              style={{
                color: " #F5FCCD",
              }}
            >
              Sea Level
            </h2>
          </div>
        </div>
      </section>
      {/* Euphotic Zone */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex flex-col">
            <motion.img
              src="/images/explore/phytoplankton.png"
              alt="phytoplankton"
              className="w-1/4"
              whileHover={{ scale: 1.2, rotate: 90 }}
              whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%",
              }}
            />

            <div className="w-full text-end">
              <motion.img
                src="/images/explore/jelly_fish.png"
                alt="jelly_fish"
                className="w-full text-end"
                whileHover={{ scale: 1.2, rotate: -45 }}
                whileTap={{
                  scale: 0.8,
                  rotate: -90,
                  borderRadius: "100%",
                }}
              />
            </div>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1
              className="title-font sm:text-4xl text-3xl mb-2 font-medium "
              style={{
                color: "#FEB6C9",
              }}
            >
              Euphotic Zone
            </h1>
            <p className="mb-4 leading-relaxed text-white">
              Sunlight rarely penetrates beyond this zone
            </p>
            <p className="mb-8 leading-relaxed text-gray-400 text-xs">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra
              air plant cold-pressed tacos poke beard tote bag. Heirloom echo
              park mlkshk tote bag selvage hot chicken authentic tumeric
              truffaut hexagon try-hard chambray.
            </p>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font pb-20 flex flex-row-reverse w-full">
        <div className="  py-4 w-full">
          <div className="flex flex-col justify-start items-end   mb-4">
            <h2
              className="text-xs text-white tracking-widest font-medium title-font mb-1 bg-sky-700 py-2 rounded-l-lg text-start px-2  sm:w-1/6 w-2/6"
              style={{
                color: " #F5FCCD",
              }}
            >
              200 Metre
            </h2>
          </div>
        </div>
      </section>
      {/* Dysphotic Zone */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1
              className="title-font sm:text-4xl text-3xl mb-2 font-medium "
              style={{
                color: "#FEB6C9",
              }}
            >
              Dysphotic Zone{" "}
            </h1>
            <p className="mb-4 leading-relaxed text-white">
              Sunlight decreases rapidly with depth{" "}
            </p>
            <p className="mb-8 leading-relaxed text-gray-400 text-xs">
              It is characterized by dim, residual light where photosynthesis is
              not possible, but it supports unique and adapted organisms,
              including some bioluminescent species
            </p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex flex-col">
            <motion.img
              src="/images/explore/shrimp.png"
              alt="phytoplankton"
              className="w-2/4"
              whileHover={{ scale: 1.2, rotate: -45 }}
              whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%",
              }}
            />

            <div className="w-full text-end">
              <motion.img
                src="/images/explore/sword_fish.png"
                alt="jelly_fish"
                className="w-2/4 text-start"
                whileHover={{ scale: 0.8, rotate: 30 }}
                whileTap={{
                  scale: 0.8,
                  rotate: 0,
                  borderRadius: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="  py-4 mx-auto">
          <div className="flex flex-col text-start  sm:w-1/6 w-2/6 mb-4">
            <h2
              className="text-xs text-white tracking-widest font-medium title-font mb-1 bg-sky-700 py-2 rounded-r-lg text-end px-2"
              style={{
                color: " #F5FCCD",
              }}
            >
              1000 Metre
            </h2>
          </div>
        </div>
      </section>

      {/* Euphotic Zone */}
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex flex-col">
            <motion.img
              src="/images/explore/angler_fish.png"
              alt="phytoplankton"
              className="w-2/4"
              whileHover={{ scale: 1.2, rotate: -45 }}
              whileTap={{
                scale: 0.8,
                rotate: -90,
                borderRadius: "100%",
              }}
            />

            <div className="w-full text-end">
              <motion.img
                src="/images/explore/octopus.png"
                alt="jelly_fish"
                className="w-2/4 text-end"
                whileHover={{ scale: 1.2, rotate: 45 }}
                whileTap={{
                  scale: 0.8,
                  rotate: -90,
                  borderRadius: "100%",
                }}
              />
            </div>
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1
              className="title-font sm:text-4xl text-3xl mb-2 font-medium "
              style={{
                color: "#FEB6C9",
              }}
            >
              Aphotic Zone{" "}
            </h1>
            <p className="mb-4 leading-relaxed text-white">
              Sunlight does not penetrate{" "}
            </p>
            <p className="mb-8 leading-relaxed text-gray-400 text-xs">
              It is far below the reach of sunlight. It is a deep layer where
              photosynthesis cannot occur, and organisms in this zone often rely
              on alternative sources of energy
            </p>
          </div>
        </div>
      </section>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-14 sm:py-18 lg:py-24">
          <div className="text-left">
            <h1 className="flex flex-col text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span
                style={{
                  color: "#BAE0E3",
                }}
              >
                Explore
              </span>
              <span className="text-white"> more Ocean Life</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-white sm:w-2/4 w-3/4">
              Don&apos;t stop at sea turtles—there&apos;s a whole ocean full of
              amazing creatures waiting to be discovered! From the colorful
              coral reefs to the mysterious depths, each layer of the ocean has
              its own set of residents.
            </p>
            <div className="mt-4 flex items-center justify-start gap-x-6">
              <Link
                href="/learnlist"
                className="rounded-md  px-6 py-2.5 text-lg font-bold text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{
                  backgroundColor: "#F5FCCD",
                }}
              >
                Learn more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

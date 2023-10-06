import Link from "next/link";

export default function Explore() {
  return (
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url('/images/explore.png')`,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundColor: "#023667",
        height: "100vh",
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
            <p className="mt-6 text-lg leading-8 text-white w-2/4">
              An interactive 3D Visual where you can explore various ocean
              ecosystems, marine life, and understand the interconnectedness of
              marine services
            </p>
            <div className="mt-10 flex items-center justify-start gap-x-6">
              <Link
                href="/exploreshowcase"
                className="rounded-md  px-6 py-2.5 text-lg font-bold text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{
                  backgroundColor: "#F5FCCD",
                }}
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

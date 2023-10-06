import Link from "next/link";

export default function Learn() {
  return (
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url('/images/learn.png')`,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundColor: "#023667",
        backgroundColor: "#02487F",
        height: "100vh",
      }}
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-14 sm:py-18 lg:py-24">
          <div className="text-center">
            <h1 className="flex flex-col text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span
                style={{
                  color: "#CDA7FF",
                }}
              >
                Ocean
              </span>
              <span className="text-white">Contribution</span>
            </h1>
            <p className="text-white text-lg font-bold">Interactive Learning</p>
            <p className="mt-6 text-base leading-8 text-white">
              Learn how the ocean’s ability to absorb and store carbon helps
              maintain a balanced carbon cycle, which is crucial for stabilizing
              the Earth’s climate
            </p>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/learnlist"
                className="rounded-md  px-6 py-2.5 text-lg font-bold text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{
                  backgroundColor: "#F5FCCD",
                }}
              >
                Learn
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

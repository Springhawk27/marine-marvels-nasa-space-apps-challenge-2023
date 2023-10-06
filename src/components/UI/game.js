import Link from "next/link";

export default function Game() {
  return (
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url('/images/game.png')`,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundColor: "#023667",
        backgroundColor: "#024A80",
        height: "100vh",
      }}
    >
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-4xl py-14 sm:py-18 lg:py-24">
          <div className="text-right">
            <h1 className="flex flex-col text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
              <span className="text-white">Learn By</span>
              <span
                style={{
                  color: "#FFBF89",
                }}
              >
                {" "}
                Playing
              </span>
              <span
                style={{
                  color: "#FFBF89",
                }}
              >
                Game
              </span>
            </h1>

            <div className="mt-10 flex items-center justify-end gap-x-6">
              <Link
                href="/quiz"
                className="rounded-md  px-6 py-2.5 text-lg font-bold text-black shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{
                  backgroundColor: "#F5FCCD",
                }}
              >
                Take a Quiz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

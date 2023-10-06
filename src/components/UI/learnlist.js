import Image from "next/image";
import Link from "next/link";

export default function LearnList({ allArticles }) {
  //   console.log(allArticles);
  return (
    <div
      className="bg-cover"
      style={{
        backgroundImage: `url('/images/learn2.png')`,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundColor: "#023667",
        backgroundColor: "#02487F",
        height: "100%",
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
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 gap-8 px-8 py-16">
        {allArticles?.map((article) => (
          <Link
            href={{
              pathname: `/articles/${article.id}`,
              query: {
                title: article.title,
                description: article.description,
                image_url: article.image_url,
              },
            }}
            article={article}
            key={article?.id}
          >
            <div
              className="card rounded-lg w-full  "
              style={{ backgroundColor: " #022843" }}
            >
              <figure>
                <img
                  src={`${article.image_url}`}
                  alt="image"
                  className="bg-cover  w-full  max-h-44"
                />
              </figure>
              <div className="card-body ">
                <h2 className="card-title py-2 text-white text-center text-base">
                  {article?.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

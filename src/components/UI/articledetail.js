import Link from "next/link";

export default function ArticleDetail({ article }) {
  //   console.log(article);
  const articleradientBackground = `
linear-gradient(
  to bottom,
  rgb(1,116,152) 0%,
  rgb(2,6,65) 100%
)
`;
  return (
    <div
      className="bg-cover flex justify-center rounded-lg md:p-16 p-8 "
      style={{
        // backgroundImage: `url('/images/learn.png')`,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        background: articleradientBackground,

        minHeight: "100vh",
      }}
    >
      <section
        className=" text-gray-600 body-font mb-24 mt-16 rounded-xl"
        style={{
          backgroundImage: `url(${article.background_image})`,
          // backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          //   backgroundColor: "#023667",
          height: "100vh",
        }}
      >
        <div
          className=" mx-auto flex px-5 py-8 md:flex-row flex-col items-center h-full"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <div className="lg:flex-grow md:w-1/2 lg:pl-26 md:pl-8 flex flex-col md:items-start md:text-left items-center text-center">
            <h2
              className="card-title py-2 text-4xl"
              style={{
                color: " #BAE3C3",
              }}
            >
              {article.title}
            </h2>
            <p className=" text-xl text-white">{article.description}</p>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0 flex flex-col">
            {/* <img src={article.image_url} className="bg-cover  w-full" /> */}
            <iframe
              width="100%"
              height="340"
              src={article.video_url}
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center gap-x-6">
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
      </section>
    </div>
  );
}

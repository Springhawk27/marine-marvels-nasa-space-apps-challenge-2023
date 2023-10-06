export default function ArticleDetail({ article }) {
  console.log(article);
  return (
    <div
      className="bg-cover flex justify-center"
      style={{
        backgroundImage: `url('/images/learn.png')`,
        // backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        // backgroundColor: "#023667",
        backgroundColor: "#02487F",
        minHeight: "100vh",
      }}
    >
      <section className="text-gray-600 body-font py-16">
        <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
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
      </section>
    </div>
  );
}

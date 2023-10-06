import Link from "next/link";

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
      <div
        className="card lg:card-side bg-base-100 shadow-xl py-16 text-white w-2/4 "
        style={{ backgroundColor: " #022843" }}
      >
        <figure>
          <img src={article.image_url} className="bg-cover  w-full" />
        </figure>
        <div className="card-body py-4 px-4">
          <h2 className="card-title py-2">{article.title}</h2>
          <p>{article.description}</p>
        </div>
      </div>
    </div>
  );
}

import RootLayout from "@/components/Layouts/RootLayout";
import ArticleDetail from "@/components/UI/articledetail";
import { useRouter } from "next/router";
import articles from "@/data/articles";

const ArticleDetailPage = () => {
  const router = useRouter();
  const { articleId } = router.query;
  const article = articles.find((a) => a.id === Number(articleId));

  return <ArticleDetail article={article} />;
};

export default ArticleDetailPage;

ArticleDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

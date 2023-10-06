import RootLayout from "@/components/Layouts/RootLayout";
import ArticleDetail from "@/components/UI/articledetail";
import { useRouter } from "next/router";
import React from "react";

const ArticleDetailPage = () => {
  const router = useRouter();
  //   console.log(router.query);
  const article = router.query;

  return (
    <div>
      <ArticleDetail article={article}></ArticleDetail>
    </div>
  );
};

export default ArticleDetailPage;

ArticleDetailPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

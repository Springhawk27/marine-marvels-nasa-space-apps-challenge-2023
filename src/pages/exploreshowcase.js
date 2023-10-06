import RootLayout from "@/components/Layouts/RootLayout";
import ExploreShowcase from "@/components/UI/exploreshowcase";
import React from "react";

const ExploreShowcasePage = () => {
  return (
    <div>
      <ExploreShowcase></ExploreShowcase>
    </div>
  );
};

export default ExploreShowcasePage;

ExploreShowcasePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

import RootLayout from "@/components/Layouts/RootLayout";
import Explore from "@/components/UI/explore";
import React from "react";

const ExplorePage = () => {
  return (
    <div>
      <Explore></Explore>
    </div>
  );
};

export default ExplorePage;

ExplorePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

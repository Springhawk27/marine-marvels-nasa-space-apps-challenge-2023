import RootLayout from "@/components/Layouts/RootLayout";
import Learn from "@/components/UI/learn";
import React from "react";

const LearnPage = () => {
  return (
    <div>
      <Learn></Learn>
    </div>
  );
};

export default LearnPage;

LearnPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

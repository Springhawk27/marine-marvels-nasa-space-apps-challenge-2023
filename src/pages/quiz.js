import React from "react";
import RootLayout from "@/components/Layouts/RootLayout";
import Quiz from "@/components/UI/quiz";

function QuizPage() {
  return (
    <div>
      <Quiz />
    </div>
  );
}

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

import React from "react";
import RootLayout from "@/components/Layouts/RootLayout";
import Quiz from "@/components/UI/quiz";

function QuizPage() {
  const quizGradientBackground = `
    linear-gradient(
      to bottom,
      rgb(1,116,152) 0%,
      rgb(2,6,65) 100%
    )
  `;
  return (
    <div
      style={{
        background: quizGradientBackground,
        minHeight: "100vh",
      }}
    >
      <Quiz />
    </div>
  );
}

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

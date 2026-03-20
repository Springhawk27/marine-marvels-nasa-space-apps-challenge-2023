import RootLayout from "@/components/Layouts/RootLayout";
import Quiz from "@/components/UI/quiz";

function QuizPage() {
  return <Quiz />;
}

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

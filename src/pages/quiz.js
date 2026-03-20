import RootLayout from "@/components/Layouts/RootLayout";
import Quiz from "@/components/UI/quiz";
import { useRouter } from "next/router";

function QuizPage() {
  const router = useRouter();
  const topic = router.query.topic || "phytoplankton";

  return <Quiz topicId={topic} />;
}

export default QuizPage;

QuizPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

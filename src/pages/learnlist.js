import RootLayout from "@/components/Layouts/RootLayout";
import LearnList from "@/components/UI/learnlist";

const LearnListPage = () => {
  return <LearnList />;
};

export default LearnListPage;

LearnListPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

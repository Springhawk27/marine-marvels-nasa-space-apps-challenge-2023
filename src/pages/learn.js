import RootLayout from "@/components/Layouts/RootLayout";
import LearnList from "@/components/UI/learnlist";

const LearnPage = () => {
  return <LearnList />;
};

export default LearnPage;

LearnPage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

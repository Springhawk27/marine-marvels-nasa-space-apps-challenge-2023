import RootLayout from "@/components/Layouts/RootLayout";
import ExploreShowcase from "@/components/UI/exploreshowcase";

const ExploreShowcasePage = () => {
  return <ExploreShowcase />;
};

export default ExploreShowcasePage;

ExploreShowcasePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

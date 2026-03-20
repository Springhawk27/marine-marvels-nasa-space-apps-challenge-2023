import RootLayout from "@/components/Layouts/RootLayout";
import ExploreShowcase from "@/components/UI/exploreshowcase";

const ExplorePage = () => {
  return <ExploreShowcase />;
};

export default ExplorePage;

ExplorePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

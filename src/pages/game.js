import RootLayout from "@/components/Layouts/RootLayout";
import Game from "@/components/UI/game";

const GamePage = () => {
  return <Game />;
};

export default GamePage;

GamePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

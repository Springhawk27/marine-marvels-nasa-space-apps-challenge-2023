import RootLayout from "@/components/Layouts/RootLayout";
import Game from "@/components/UI/game";
import React from "react";

const GamePage = () => {
  return (
    <div>
      <Game></Game>
    </div>
  );
};

export default GamePage;

GamePage.getLayout = function getLayout(page) {
  return <RootLayout>{page}</RootLayout>;
};

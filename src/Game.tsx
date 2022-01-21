import React from "react";
import "./Game.scss";
import { GameBody } from "./GameBody";
import { GameHeader } from "./GameHeader";
import { GameKeyboard } from "./GameKeyboard";

const Game = () => {
  return (
    <div className="game">
      <GameHeader />
      <GameBody />
      <GameKeyboard />
    </div>
  );
};

export { Game };

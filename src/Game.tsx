import _ from "lodash";
import React, { useState } from "react";
import { WORD_COUNT } from "./const";
import "./Game.scss";
import { GameBody } from "./GameBody";
import { GameHeader } from "./GameHeader";
import { GameKeyboard } from "./GameKeyboard";

const Game = () => {
  const [curRow, setCurRow] = useState<number>(0);
  const [words, setWords] = useState<string[][]>([[], [], [], [], [], []]);

  const onClickKeyboard = (letter: string) => {
    if (words[curRow].length < WORD_COUNT) {
      const newWords = _.cloneDeep(words);
      newWords[curRow].push(letter);
      setWords(newWords);
    }
  };

  const onClickEnter = () => {
    if (words[curRow].length === WORD_COUNT) {
      console.log("onClickEnter");
    }
  };

  const onClickBack = () => {
    if (0 < words[curRow].length) {
      const newWords = _.cloneDeep(words);
      newWords[curRow].pop();
      setWords(newWords);
    }
  };

  return (
    <div className="game">
      <GameHeader />
      <GameBody words={words} />
      <GameKeyboard
        curWord={words[curRow]}
        onClickKeyboard={onClickKeyboard}
        onClickEner={onClickEnter}
        onClickBack={onClickBack}
      />
    </div>
  );
};

export { Game };

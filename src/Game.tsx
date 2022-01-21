import Hangul from "hangul-js";
import _ from "lodash";
import React, { useState } from "react";
import Notification, { notify } from "react-notify-bootstrap";
import { WORD_COUNT } from "./const";
import "./Game.scss";
import { GameBody } from "./GameBody";
import { GameHeader } from "./GameHeader";
import { GameKeyboard } from "./GameKeyboard";

const Game = () => {
  const [curRow, setCurRow] = useState<number>(0);
  const [words, setWords] = useState<string[][]>([[], [], [], [], [], []]);
  const [shake, setShake] = useState<boolean>(false);

  const onClickKeyboard = (letter: string) => {
    if (words[curRow].length < WORD_COUNT) {
      const newWords = _.cloneDeep(words);
      newWords[curRow].push(letter);
      setWords(newWords);
    }
  };

  const onClickEnter = () => {
    if (words[curRow].length === WORD_COUNT) {
      const word = Hangul.assemble(words[curRow]);

      // 완성된 한글인지 체크
      const isCompleteWord = word
        .split("")
        .every(letter => Hangul.isComplete(letter));

      if (!isCompleteWord) {
        notify({
          text: "단어 목록에 없습니다.",
          variant: "dark"
        });

        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 200);
      }
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
      <GameBody curRow={curRow} words={words} shake={shake} />
      <GameKeyboard
        curWord={words[curRow]}
        onClickKeyboard={onClickKeyboard}
        onClickEner={onClickEnter}
        onClickBack={onClickBack}
      />

      <Notification options={{ position: "top", delay: 1000 }} />
    </div>
  );
};

export { Game };

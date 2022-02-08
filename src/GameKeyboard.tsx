import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import classNames from "classnames";
import React from "react";
import { LETTER_COUNT } from "./const";
import "./GameKeyboard.scss";

interface Props {
  curLetters: string;
  onClickKeyboard: (letter: string) => void;
  onClickEner: () => void;
  onClickBack: () => void;
  keyMap: { [key: string]: string };
}

const GameKeyboard = (props: Props) => {
  const row1 = ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"];
  const row2 = ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"];
  const row3 = ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"];

  return (
    <div className="game-keyboard">
      <div className="game-keyboard-row">
        {row1.map(letter => (
          <div
            key={letter}
            className={classNames("item", {
              [props.keyMap[letter]]: props.keyMap[letter]
            })}
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="game-keyboard-row px-3">
        {row2.map(letter => (
          <div
            key={letter}
            className={classNames("item", {
              [props.keyMap[letter]]: props.keyMap[letter]
            })}
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="game-keyboard-row">
        <button
          className="item"
          disabled={props.curLetters.length < LETTER_COUNT}
          onClick={props.onClickEner}
        >
          ENTER
        </button>
        {row3.map(letter => (
          <div
            key={letter}
            className={classNames("item", {
              [props.keyMap[letter]]: props.keyMap[letter]
            })}
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
        <button
          className="item"
          disabled={props.curLetters.length === 0}
          onClick={props.onClickBack}
        >
          <BackspaceOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export { GameKeyboard };

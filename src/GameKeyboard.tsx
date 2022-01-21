import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import React from "react";
import { WORD_COUNT } from "./const";
import "./GameKeyboard.scss";

interface Props {
  curWord: string[];
  onClickKeyboard: (letter: string) => void;
  onClickEner: () => void;
  onClickBack: () => void;
}

const GameKeyboard = (props: Props) => {
  const row1 = [
    "ㄱ",
    "ㄴ",
    "ㄷ",
    "ㄹ",
    "ㅁ",
    "ㅏ",
    "ㅑ",
    "ㅓ",
    "ㅕ",
    "ㅗ",
    "ㅛ"
  ];
  const row2 = [
    "ㅂ",
    "ㅅ",
    "ㅇ",
    "ㅈ",
    "ㅊ",
    "ㅜ",
    "ㅠ",
    "ㅡ",
    "ㅣ",
    "ㅐ",
    "ㅔ"
  ];
  const row3 = ["ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅘ", "ㅚ", "ㅝ", "ㅟ", "ㅢ"];

  return (
    <div className="game-keyboard">
      <div className="game-keyboard-row">
        {row1.map(letter => (
          <div
            key={letter}
            className="item"
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="game-keyboard-row">
        {row2.map(letter => (
          <div
            key={letter}
            className="item"
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="game-keyboard-row">
        <button
          className="item"
          disabled={props.curWord.length < WORD_COUNT}
          onClick={props.onClickEner}
        >
          ENTER
        </button>
        {row3.map(letter => (
          <div
            key={letter}
            className="item"
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
        <button
          className="item"
          disabled={props.curWord.length === 0}
          onClick={props.onClickBack}
        >
          <BackspaceOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export { GameKeyboard };

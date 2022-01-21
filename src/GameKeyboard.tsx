import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import React from "react";
import "./GameKeyboard.scss";

const GameKeyboard = () => {
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
  const row2 = ["ㅂ", "ㅅ", "ㅇ", "ㅈ", "ㅊ", "ㅜ", "ㅠ", "ㅢ", "ㅐ", "ㅔ"];
  const row3 = ["ㅋ", "ㅌ", "ㅍ", "ㅎ", "ㅘ", "ㅚ", "ㅝ", "ㅟ", "ㅢ"];

  return (
    <div className="game-keyboard">
      <div className="game-keyboard-row">
        {row1.map(key => (
          <div className="item">{key}</div>
        ))}
      </div>
      <div className="game-keyboard-row">
        {row2.map(key => (
          <div className="item">{key}</div>
        ))}
      </div>
      <div className="game-keyboard-row">
        <div className="item">ENTER</div>
        {row3.map(key => (
          <div className="item">{key}</div>
        ))}
        <div className="item">
          <BackspaceOutlinedIcon />
        </div>
      </div>
    </div>
  );
};

export { GameKeyboard };

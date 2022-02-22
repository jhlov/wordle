import BackspaceOutlinedIcon from "@mui/icons-material/BackspaceOutlined";
import classNames from "classnames";
import React, { useMemo } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { LETTER_COUNT } from "utils/const";
import "./GameKeyboard.scss";

interface Props {
  onClickKeyboard: (letter: string) => void;
  onClickEner: () => void;
  onClickBack: () => void;
}

const GameKeyboard = (props: Props) => {
  const isAITurn = useSelector((state: RootState) => state.game.isAITurn);
  const curRow = useSelector((state: RootState) => state.game.curRow);
  const guessList = useSelector((state: RootState) => state.game.guessList);
  const keyMap = useSelector((state: RootState) => state.game.keyMap);

  const row1 = ["ㅂ", "ㅈ", "ㄷ", "ㄱ", "ㅅ", "ㅛ", "ㅕ", "ㅑ", "ㅐ", "ㅔ"];
  const row2 = ["ㅁ", "ㄴ", "ㅇ", "ㄹ", "ㅎ", "ㅗ", "ㅓ", "ㅏ", "ㅣ"];
  const row3 = ["ㅋ", "ㅌ", "ㅊ", "ㅍ", "ㅠ", "ㅜ", "ㅡ"];

  const curGuess = useMemo(() => {
    return guessList[curRow] ?? "";
  }, [curRow, guessList]);

  return (
    <div className="game-keyboard">
      <div className="game-keyboard-row">
        {row1.map(letter => (
          <div
            key={letter}
            className={classNames(
              "tile",
              {
                [keyMap[letter]]: keyMap[letter]
              },
              {
                evaluation: keyMap[letter]
              }
            )}
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
            className={classNames(
              "tile",
              {
                [keyMap[letter]]: keyMap[letter]
              },
              {
                evaluation: keyMap[letter]
              }
            )}
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
      </div>
      <div className="game-keyboard-row">
        <button
          className="tile"
          disabled={curGuess.length < LETTER_COUNT}
          onClick={props.onClickEner}
        >
          ENTER
        </button>
        {row3.map(letter => (
          <div
            key={letter}
            className={classNames(
              "tile",
              {
                [keyMap[letter]]: keyMap[letter]
              },
              {
                evaluation: keyMap[letter]
              }
            )}
            onClick={() => props.onClickKeyboard(letter)}
          >
            {letter}
          </div>
        ))}
        <button
          className="tile"
          disabled={curGuess.length === 0}
          onClick={props.onClickBack}
        >
          <BackspaceOutlinedIcon />
        </button>
      </div>
      {isAITurn && (
        <div className="ai">
          <div>AI가 입력 중입니다.</div>
        </div>
      )}
    </div>
  );
};

export { GameKeyboard };

import className from "classnames";
import React, { useEffect, useState } from "react";
import { LETTER_COUNT, ROW_COUNT } from "./const";
import "./GameBody.scss";

interface Props {
  curRow: number;
  lettersList: string[];
  checkList: string[];
  shake: boolean;
}

const GameBody = (props: Props) => {
  const [jump, setJump] = useState<number>(0);

  useEffect(() => {
    // 마지막 check 가 다 맞는지 확인
    if (props.checkList[props.curRow] === "sssss") {
      for (let i = 0; i < LETTER_COUNT; ++i) {
        setTimeout(() => setJump(i + 1), i * 200);
      }
    } else {
      setJump(0);
    }
  }, [props.checkList]);

  return (
    <div className="game-body">
      {Array(ROW_COUNT)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={className("game-body-row", {
              shake: i === props.curRow && props.shake
            })}
          >
            {Array(LETTER_COUNT)
              .fill(0)
              .map((_, j) => (
                <div
                  key={`${i}_${j}`}
                  className={className(
                    "tile",
                    [props.lettersList[i][j] ? "letter" : "empty"],
                    { [props.checkList[i][j]]: props.checkList[i][j] },
                    { jump: i === props.curRow && 0 < jump && j < jump }
                  )}
                >
                  {props.lettersList[i][j]}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export { GameBody };

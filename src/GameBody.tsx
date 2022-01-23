import className from "classnames";
import React, { useEffect, useState } from "react";
import { ROW_COUNT, WORD_COUNT } from "./const";
import "./GameBody.scss";

interface Props {
  curRow: number;
  words: string[][];
  checks: string[][];
  shake: boolean;
}

const GameBody = (props: Props) => {
  const [jump, setJump] = useState<number>(0);

  useEffect(() => {
    // 마지막 check 가 다 맞는지 확인
    if (
      props.checks[props.curRow].length === WORD_COUNT &&
      props.checks[props.curRow].every(e => e === "s")
    ) {
      for (let i = 0; i < WORD_COUNT; ++i) {
        setTimeout(() => {
          setJump(i + 1);
          console.log(i + 1);
        }, i * 200);
      }
    } else {
      setJump(0);
    }
  }, [props.checks]);

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
            {Array(WORD_COUNT)
              .fill(0)
              .map((_, j) => (
                <div
                  key={`${i}_${j}`}
                  className={className(
                    "item",
                    `item-${j + 1}`,
                    [props.words[i][j] ? "letter" : "empty"],
                    { [props.checks[i][j]]: props.checks[i][j] },
                    { jump: i === props.curRow && 0 < jump && j < jump }
                  )}
                >
                  {props.words[i][j]}
                </div>
              ))}
          </div>
        ))}
    </div>
  );
};

export { GameBody };

import className from "classnames";
import React from "react";
import { ROW_COUNT, WORD_COUNT } from "./const";
import "./GameBody.scss";

interface Props {
  curRow: number;
  words: string[][];
  shake: boolean;
}

const GameBody = (props: Props) => {
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
                  className={className("item", [
                    props.words[i][j] ? "letter" : "empty"
                  ])}
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

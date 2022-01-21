import className from "classnames";
import React from "react";
import { ROW_COUNT, WORD_COUNT } from "./const";
import "./GameBody.scss";

interface Props {
  words: string[][];
}

const GameBody = (props: Props) => {
  return (
    <div className="game-body">
      {Array(ROW_COUNT)
        .fill(0)
        .map((_, i) => (
          <div key={i} className="game-body-row">
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

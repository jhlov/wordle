import classNames from "classnames";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { LETTER_COUNT, ROW_COUNT } from "utils/const";
import "./GameBody.scss";
import { GameTile } from "./GameTile";

interface Props {
  shake: boolean;
}

const GameBody = (props: Props) => {
  const [jump, setJump] = useState<number>(0);

  const curRow = useSelector((state: RootState) => state.game.curRow);
  const guessList = useSelector((state: RootState) => state.game.guessList);
  const evaluationList = useSelector(
    (state: RootState) => state.game.evaluationList
  );

  useEffect(() => {
    // 마지막 추측이 다 맞는지 확인
    if (evaluationList[curRow] === "sssss") {
      for (let i = 0; i < LETTER_COUNT; ++i) {
        setTimeout(() => setJump(i + 1), i * 200);
      }
    } else {
      setJump(0);
    }
  }, [evaluationList, curRow]);

  return (
    <div className="game-body">
      {Array(ROW_COUNT)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={classNames("game-body-row", {
              shake: i === curRow && props.shake
            })}
          >
            {Array(LETTER_COUNT)
              .fill(0)
              .map((_, j) => (
                <GameTile
                  key={`${i}_${j}`}
                  letter={guessList[i][j]}
                  evaluation={evaluationList[i][j]}
                  jump={i === curRow && 0 < jump && j < jump}
                />
              ))}
          </div>
        ))}
    </div>
  );
};

export { GameBody };

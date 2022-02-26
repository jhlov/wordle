import MenuBookIcon from "@mui/icons-material/MenuBook";
import axios from "axios";
import classNames from "classnames";
import { DictModal } from "components/modals/DictModal";
import Hangul from "hangul-js";
import React, { useEffect, useState } from "react";
import ReactGA from "react-ga4";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { addToast } from "store/common";
import { LETTER_COUNT, ROW_COUNT } from "utils/const";
import "./GameBody.scss";
import { GameTile } from "./GameTile";
ReactGA.initialize("G-L07VJN65FL");

interface Props {
  shake: boolean;
}

interface DictResponse {
  word?: string;
  value?: string[];
  error?: string;
}

const GameBody = (props: Props) => {
  const dispatch = useDispatch();

  const [jump, setJump] = useState<number>(0);

  const curRow = useSelector((state: RootState) => state.game.curRow);
  const guessList = useSelector((state: RootState) => state.game.guessList);
  const evaluationList = useSelector(
    (state: RootState) => state.game.evaluationList
  );

  // 사전
  const [dict, setDict] = useState<DictResponse>({});

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

  const onClickDict = async (letterList: string) => {
    ReactGA.event({
      category: "dict",
      action: "click"
    });

    const word = Hangul.assemble(letterList.split(""));
    const r = await axios.get<DictResponse>(
      "https://4rf9kpckfi.execute-api.ap-northeast-2.amazonaws.com/default/wordle-dict?word=" +
        word
    );

    if (r.data.error) {
      dispatch(addToast({ text: r.data.error }));
    }

    if (r.status !== 200 || !r.data) {
      dispatch(addToast({ text: "오류가 발생했습니다." }));
    }

    if (r.data.word && r.data.value) {
      setDict({ word: r.data.word, value: r.data.value });
    }
  };

  const onCloseDict = () => {
    setDict({});
  };

  return (
    <div className="game-body my-3">
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
            {evaluationList[i].length === LETTER_COUNT && (
              <div className="position-relative">
                <MenuBookIcon
                  className="dict"
                  fontSize="small"
                  onClick={() => onClickDict(guessList[i])}
                />
              </div>
            )}
          </div>
        ))}
      <DictModal word={dict.word} value={dict.value} onClose={onCloseDict} />
    </div>
  );
};

export { GameBody };

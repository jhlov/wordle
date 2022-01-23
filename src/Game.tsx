import axios from "axios";
import Hangul from "hangul-js";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Notification, { notify } from "react-notify-bootstrap";
import { ROW_COUNT, WORD_COUNT } from "./const";
import "./Game.scss";
import { GameBody } from "./GameBody";
import { GameHeader } from "./GameHeader";
import { GameKeyboard } from "./GameKeyboard";
import { StatisticsModal } from "./StatisticsModal";

interface Response {
  id?: number;
  word?: string;
  letters?: string;
  check?: string[];
  error?: string;
}

const Game = () => {
  const [id, setId] = useState<number>(0);
  const [curRow, setCurRow] = useState<number>(0);
  const [words, setWords] = useState<string[][]>([[], [], [], [], [], []]);
  const [checks, setChecks] = useState<string[][]>([[], [], [], [], [], []]);
  const [keyMap, setKeyMap] = useState<{ [key: string]: string }>({});
  const [shake, setShake] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnabledInput, setIsEnabledInput] = useState<boolean>(true);
  const [showStatisticsModal, setShowStatisticsModal] =
    useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setIsLoading(true);

    const r = await axios.get<Response>(
      "https://ukntcifwza.execute-api.ap-northeast-2.amazonaws.com/default/wordle"
    );

    setId(r.data.id!);

    // TODO: local load
    // TODO: 방법

    setIsLoading(false);
  };

  const onClickKeyboard = (letter: string) => {
    if (!isEnabledInput) {
      return;
    }

    if (words[curRow].length < WORD_COUNT) {
      const newWords = _.cloneDeep(words);
      newWords[curRow].push(letter);
      setWords(newWords);
    }
  };

  const onClickEnter = async () => {
    if (!isEnabledInput) {
      return;
    }

    if (words[curRow].length === WORD_COUNT) {
      const word = Hangul.assemble(words[curRow]);
      console.log(word);

      // 완성된 한글인지 체크
      const isCompleteWord = word
        .split("")
        .every(letter => Hangul.isComplete(letter));

      if (isCompleteWord) {
        setIsLoading(true);
        setIsEnabledInput(false);

        const r = await axios.get<Response>(
          `https://ukntcifwza.execute-api.ap-northeast-2.amazonaws.com/default/wordle?word=${word}&letters=${words[
            curRow
          ].join("")}`
        );

        // TODO: id 가 변경 되었을 경우 처리

        // TODO: 기록

        setIsLoading(false);

        // 에러 체크
        if (r.data.error) {
          notify({
            text: r.data.error,
            variant: "dark"
          });

          setShake(true);
          setTimeout(() => {
            setShake(false);
          }, 200);

          setIsEnabledInput(true);
          return;
        }

        // 애니메이션 주면서 세팅
        for (let i = 0; i < 5; ++i) {
          setTimeout(() => {
            const newChecks = _.cloneDeep(checks);
            newChecks[curRow] = (r.data.check ?? []).slice(0, i + 1);
            setChecks(newChecks);
          }, i * 300);
        }

        setTimeout(() => {
          const newkeyMap = _.cloneDeep(keyMap);
          r.data.letters?.split("").forEach((letter, i) => {
            if ((r.data.check ?? [])[i] === "s") {
              newkeyMap[letter] = "s";
            } else if ((r.data.check ?? [])[i] === "b") {
              if (newkeyMap[letter] !== "s") {
                newkeyMap[letter] = "b";
              }
            } else {
              if (newkeyMap[letter] === undefined) {
                newkeyMap[letter] = "o";
              }
            }
          });
          setKeyMap(newkeyMap);
          setIsEnabledInput(true);

          // 종료 처리
          if (r.data.check?.every(e => e === "s")) {
            const answerString = [
              "천재!!!",
              "굉장해요!!!",
              "정말 잘했어요!!",
              "멋져요!",
              "잘했어요!!",
              "겨우 맞췄네요!"
            ];

            notify({
              text: answerString[curRow],
              variant: "dark"
            });

            // TODO: 통계 모달
          } else {
            if (curRow < ROW_COUNT - 1) {
              setCurRow(prev => prev + 1);
            }
          }
        }, 1500);
      } else {
        notify({
          text: "단어 목록에 없습니다.",
          variant: "dark"
        });

        setShake(true);
        setTimeout(() => {
          setShake(false);
        }, 200);
      }
    }
  };

  const onClickBack = () => {
    if (!isEnabledInput) {
      return;
    }

    if (0 < words[curRow].length) {
      const newWords = _.cloneDeep(words);
      newWords[curRow].pop();
      setWords(newWords);
    }
  };

  return (
    <div className="game">
      <GameHeader onClickStatistics={() => setShowStatisticsModal(true)} />
      <GameBody curRow={curRow} words={words} checks={checks} shake={shake} />
      <GameKeyboard
        curWord={words[curRow]}
        onClickKeyboard={onClickKeyboard}
        onClickEner={onClickEnter}
        onClickBack={onClickBack}
        keyMap={keyMap}
      />

      <Notification options={{ position: "top", delay: 1000 }} />
      {isLoading && (
        <div className="loading">
          <Spinner animation="border" />
        </div>
      )}
      <StatisticsModal
        show={showStatisticsModal}
        onClose={() => setShowStatisticsModal(false)}
      />
    </div>
  );
};

export { Game };

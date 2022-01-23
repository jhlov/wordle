import axios from "axios";
import Hangul from "hangul-js";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Notification, { notify } from "react-notify-bootstrap";
import { LETTER_COUNT, ROW_COUNT } from "./const";
import "./Game.scss";
import { GameBody } from "./GameBody";
import { GameData, getGameData, initGameData, saveGameData } from "./GameData";
import { GameHeader } from "./GameHeader";
import { GameKeyboard } from "./GameKeyboard";
import { HelpModal } from "./HelpModal";
import { getStatisticsData, saveStatisticsData } from "./StatisticsData";
import { StatisticsModal } from "./StatisticsModal";

interface Response {
  id?: number;
  letters?: string;
  check?: string;
  error?: string;
}

const Game = () => {
  const [curRow, setCurRow] = useState<number>(0);
  const [lettersList, setLettersList] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    ""
  ]);
  const [checkList, setCheckList] = useState<string[]>([
    "",
    "",
    "",
    "",
    "",
    ""
  ]);
  const [keyMap, setKeyMap] = useState<{ [key: string]: string }>({});
  const [shake, setShake] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnabledInput, setIsEnabledInput] = useState<boolean>(true);
  const [showStatisticsModal, setShowStatisticsModal] =
    useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setIsLoading(true);

    const r = await axios.get<Response>(
      "https://ukntcifwza.execute-api.ap-northeast-2.amazonaws.com/default/wordle"
    );

    const gameData = getGameData();

    if (gameData.id === 0) {
      setShowHelpModal(true);
    }

    if (gameData.id === r.data.id) {
      syncGameData(gameData);

      if (gameData.state === "FINISH") {
        setIsEnabledInput(false);
        setTimeout(() => {
          setShowStatisticsModal(true);
        }, 1000);
      }
    } else {
      startNewGame(r.data.id!);
    }

    setIsLoading(false);
  };

  const startNewGame = (id: number) => {
    const gameData: GameData = _.cloneDeep(initGameData);
    gameData.id = id;
    saveGameData(gameData);
    syncGameData(gameData);
    setIsEnabledInput(true);
  };

  const syncGameData = (gameData: GameData) => {
    setCurRow(gameData.curRow);
    setLettersList([...gameData.letters]);
    setCheckList([...gameData.checks]);
    setKeyMap({ ...gameData.keyMap });
  };

  const onClickKeyboard = (letter: string) => {
    if (!isEnabledInput) {
      return;
    }

    if (lettersList[curRow].length < LETTER_COUNT) {
      const lettersList_ = _.cloneDeep(lettersList);
      lettersList_[curRow] += letter;
      setLettersList(lettersList_);
    }
  };

  const getUpdateKyeMap = (
    letters: string,
    check: string
  ): { [key: string]: string } => {
    const newkeyMap = _.cloneDeep(keyMap);
    letters.split("").forEach((letter, i) => {
      if (check[i] === "s") {
        newkeyMap[letter] = "s";
      } else if (check[i] === "b") {
        if (newkeyMap[letter] !== "s") {
          newkeyMap[letter] = "b";
        }
      } else {
        if (newkeyMap[letter] === undefined) {
          newkeyMap[letter] = "o";
        }
      }
    });

    return newkeyMap;
  };

  const onClickEnter = async () => {
    if (!isEnabledInput) {
      return;
    }

    if (lettersList[curRow].length === LETTER_COUNT) {
      const word = Hangul.assemble(lettersList[curRow].split(""));

      // 완성된 한글인지 체크
      const isCompleteWord = word
        .split("")
        .every(letter => Hangul.isComplete(letter));

      if (isCompleteWord) {
        setIsLoading(true);
        setIsEnabledInput(false);

        const r = await axios.get<Response>(
          `https://ukntcifwza.execute-api.ap-northeast-2.amazonaws.com/default/wordle?word=${word}&letters=${lettersList[curRow]}`
        );

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

        // id 가 변경 되었을 경우 처리
        const gameData = getGameData();
        if (r.data.id !== gameData.id) {
          notify({
            text: "게임이 업데이트 되었습니다. 새로운 게임을 시작합니다.",
            variant: "dark"
          });

          startNewGame(r.data.id!);
          return;
        }

        // 게임 기록 업데이트
        gameData.curRow = curRow + 1;
        gameData.letters[curRow] = r.data.letters!;
        gameData.checks[curRow] = r.data.check!;
        gameData.keyMap = _.cloneDeep(
          getUpdateKyeMap(r.data.letters!, r.data.check!)
        );
        saveGameData(gameData);

        // 통계 업데이트
        if (r.data.check === "sssss") {
          // 성공
          const statisticsData = getStatisticsData();
          statisticsData.currentStreak += 1;
          statisticsData.maxStreak = Math.max(
            statisticsData.maxStreak,
            statisticsData.currentStreak
          );
          statisticsData.success[curRow] =
            (statisticsData.success[curRow] ?? 0) + 1;
          saveStatisticsData(statisticsData);

          gameData.state = "FINISH";
          saveGameData(gameData);
        } else if (curRow === ROW_COUNT - 1) {
          // 실패
          const statisticsData = getStatisticsData();
          statisticsData.currentStreak = 0;
          statisticsData.fail += 1;
          saveStatisticsData(statisticsData);

          gameData.state = "FINISH";
          saveGameData(gameData);
        }

        // 애니메이션 주면서 세팅
        for (let i = 0; i < 5; ++i) {
          setTimeout(() => {
            const newCheckList = _.cloneDeep(checkList);
            newCheckList[curRow] = (r.data.check ?? "").slice(0, i + 1);
            setCheckList(newCheckList);
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

          // 종료 처리
          if (r.data.check === "sssss") {
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

            // 통계 모달
            setTimeout(() => {
              setShowStatisticsModal(true);
            }, 1500);
          } else if (curRow === ROW_COUNT - 1) {
            notify({
              text: "다음 기회에 다시 도전해보세요",
              variant: "dark"
            });

            // 통계 모달
            setTimeout(() => {
              setShowStatisticsModal(true);
            }, 1500);
          } else {
            setCurRow(prev => prev + 1);
            setIsEnabledInput(true);
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

    if (0 < lettersList[curRow].length) {
      const lettersList_ = _.cloneDeep(lettersList);
      lettersList_[curRow] = lettersList_[curRow].slice(0, -1);
      setLettersList(lettersList_);
    }
  };

  return (
    <div className="game">
      <GameHeader
        onClickStatistics={() => setShowStatisticsModal(true)}
        onClickHowTo={() => setShowHelpModal(true)}
      />
      <GameBody
        curRow={curRow}
        lettersList={lettersList}
        checkList={checkList}
        shake={shake}
      />
      <GameKeyboard
        curLetters={lettersList[curRow]}
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
      <HelpModal show={showHelpModal} onClose={() => setShowHelpModal(false)} />
    </div>
  );
};

export { Game };

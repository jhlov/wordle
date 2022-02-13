import axios from "axios";
import Hangul from "hangul-js";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddSolution } from "./AddSolution";
import { LETTER_COUNT, ROW_COUNT } from "./const";
import "./Game.scss";
import { GameBody } from "./GameBody";
import { GameData, getGameData, initGameData, saveGameData } from "./GameData";
import { GameHeader } from "./GameHeader";
import { GameKeyboard } from "./GameKeyboard";
import { GameKeyboardInput } from "./GameKeyboardInput";
import { HelpModal } from "./modals/HelpModal";
import { StatisticsModal } from "./modals/StatisticsModal";
import { getStatisticsData, saveStatisticsData } from "./StatisticsData";
import { RootState } from "./store";
import { addToast, setLoading } from "./store/common";

interface Response {
  id?: number;
  letters?: string;
  check?: string;
  error?: string;
  solution?: string;
}

const Game = () => {
  const dispatch = useDispatch();

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
  const [isEnabledInput, setIsEnabledInput] = useState<boolean>(true);
  const [showStatisticsModal, setShowStatisticsModal] =
    useState<boolean>(false);
  const [showHelpModal, setShowHelpModal] = useState<boolean>(false);
  const [showAddSolutionModal, setShowAddSolutionModal] =
    useState<boolean>(false);

  const isDarkmode = useSelector((state: RootState) => state.common.isDarkmode);
  const isHardmode = useSelector((state: RootState) => state.common.isHardmode);
  const isContrastmode = useSelector(
    (state: RootState) => state.common.isContrastMode
  );

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    dispatch(setLoading(true));

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

    dispatch(setLoading(false));
  };

  const startNewGame = (id: number) => {
    const gameData: GameData = _.cloneDeep(initGameData);
    gameData.id = id;
    saveGameData(gameData);
    syncGameData(gameData);
    setIsEnabledInput(true);
  };

  const syncGameData = (gameData: GameData) => {
    setCurRow(Math.min(ROW_COUNT - 1, gameData.curRow));
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

  const shakeTiles = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 200);
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
        // 하드 모드 체크
        if (isHardmode) {
          // 스트라이크 체크
          for (let i = 0; i < curRow; ++i) {
            for (let j = 0; j < LETTER_COUNT; ++j) {
              if (checkList[i].split("")[j] === "s") {
                if (
                  lettersList[curRow].split("")[j] !==
                  lettersList[i].split("")[j]
                ) {
                  dispatch(
                    addToast({
                      text: `${j + 1}번째 글자는 '${
                        lettersList[i].split("")[j]
                      }' 이어야 합니다.`
                    })
                  );
                  shakeTiles();
                  return;
                }
              }
            }
          }

          // 볼 체크
          for (let i = 0; i < curRow; ++i) {
            for (let j = 0; j < LETTER_COUNT; ++j) {
              if (checkList[i].split("")[j] === "b") {
                if (
                  !lettersList[curRow].includes(lettersList[i].split("")[j])
                ) {
                  dispatch(
                    addToast({
                      text: `'${
                        lettersList[i].split("")[j]
                      }' 글자가 포함되어야 합니다.`
                    })
                  );
                  shakeTiles();
                  return;
                }
              }
            }
          }
        }

        dispatch(setLoading(true));
        setIsEnabledInput(false);

        const r = await axios.get<Response>(
          `https://ukntcifwza.execute-api.ap-northeast-2.amazonaws.com/default/wordle?word=${word}&letters=${
            lettersList[curRow]
          }&isLast=${curRow === ROW_COUNT - 1}`
        );

        dispatch(setLoading(false));

        // 에러 체크
        if (r.data.error) {
          dispatch(addToast({ text: r.data.error }));
          shakeTiles();
          setIsEnabledInput(true);
          return;
        }

        // id 가 변경 되었을 경우 처리
        const gameData = getGameData();
        if (r.data.id !== gameData.id) {
          dispatch(
            addToast({
              text: "게임이 업데이트 되었습니다. 새로운 게임을 시작합니다.",
              delay: 2000
            })
          );
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

          gameData.curRow = curRow;
          gameData.state = "FINISH";
          saveGameData(gameData);
        } else if (curRow === ROW_COUNT - 1) {
          // 실패
          const statisticsData = getStatisticsData();
          statisticsData.currentStreak = 0;
          statisticsData.fail += 1;
          saveStatisticsData(statisticsData);

          gameData.curRow = curRow;
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

            dispatch(
              addToast({
                text: answerString[curRow],
                delay: 2000
              })
            );

            // 통계 모달
            setTimeout(() => {
              setShowStatisticsModal(true);
            }, 2000);
          } else if (curRow === ROW_COUNT - 1) {
            dispatch(
              addToast({
                text: "다음 기회에 다시 도전해보세요.",
                delay: 2000
              })
            );

            dispatch(
              addToast({
                text: `정답은 '${r.data.solution}' 입니다`,
                delay: 4000
              })
            );

            // 통계 모달
            setTimeout(() => {
              setShowStatisticsModal(true);
            }, 2000);
          } else {
            setCurRow(prev => prev + 1);
            setIsEnabledInput(true);
          }
        }, 1500);
      } else {
        dispatch(
          addToast({
            text: "단어 목록에 없습니다."
          })
        );
        shakeTiles();
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

  const onClickShare = () => {
    const gameData = getGameData();
    let copyText = `워들 ${gameData.id} ${
      gameData.checks.some(row => row === "sssss")
        ? gameData.checks.filter(row => row).length
        : "X"
    }/${gameData.checks.length}${isHardmode ? "*" : ""}\n`;
    copyText += "https://jhlov.github.io/wordle\n\n";

    copyText += gameData.checks
      .filter(row => row !== "")
      .map(row =>
        row
          .split("")
          .reduce(
            (p, c) =>
              (p +=
                c === "s"
                  ? isContrastmode
                    ? "🟧"
                    : "🟩"
                  : c === "b"
                  ? isContrastmode
                    ? "🟦"
                    : "🟨"
                  : isDarkmode
                  ? "⬛"
                  : "⬜"),
            ""
          )
      )
      .join("\n");

    if (navigator.share) {
      navigator.share({
        text: copyText
      });
    } else {
      navigator.clipboard.writeText(copyText);
      dispatch(
        addToast({
          text: "게임 결과를 클립보드에 복사했습니다.",
          delay: 2000
        })
      );
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

      {/* other */}
      <div>
        <GameKeyboardInput
          curLetters={lettersList[curRow]}
          onClickKeyboard={onClickKeyboard}
          onClickEner={onClickEnter}
          onClickBack={onClickBack}
          showAddSolutionModal={showAddSolutionModal}
        />

        <StatisticsModal
          show={showStatisticsModal}
          onClose={() => setShowStatisticsModal(false)}
          onClickShare={onClickShare}
        />

        <HelpModal
          show={showHelpModal}
          onClose={() => setShowHelpModal(false)}
        />

        <AddSolution setShowAddSolutionModal={setShowAddSolutionModal} />
      </div>
    </div>
  );
};

export { Game };

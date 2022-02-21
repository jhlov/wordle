import axios from "axios";
import { AddSolution } from "components/AddSolution";
import { HelpModal } from "components/modals/HelpModal";
import { StatisticsModal } from "components/modals/StatisticsModal";
import Hangul from "hangul-js";
import _ from "lodash";
import React, { useEffect, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { RootState } from "store";
import { addToast, addToast2, setLoading } from "store/common";
import {
  setCurResultSummary,
  setCurRow,
  setEvaluationList,
  setGameType,
  setGuessList,
  setId,
  setKeyMap,
  setPrevResultSummary,
  setSolution,
  syncFromGameData
} from "store/game";
import { setShowHelpModal, setShowStatisticsModal } from "store/modal";
import { LETTER_COUNT, ROW_COUNT } from "utils/const";
import {
  GameData,
  getGameDataFromLS,
  initGameData,
  saveGameData
} from "utils/GameData";
import { getStatisticsData, saveStatisticsData } from "utils/StatisticsData";
import { Utils } from "utils/Utils";
import "./Game.scss";
import { GameBody } from "./GameBody";
import { GameHeader } from "./GameHeader";
import { GameKeyboard } from "./GameKeyboard";
import { GameKeyboardInput } from "./GameKeyboardInput";
import AdSense from "react-adsense";

export interface ResultSummaryRes {
  id: number;
  solution: string;
  "-1": number;
  0: number;
  1: number;
  2: number;
  3: number;
  4: number;
  5: number;
}

interface Response {
  id?: number;
  error?: string;
  solution?: string;
}

const Game = ({ match }: RouteComponentProps) => {
  const dispatch = useDispatch();

  const gameType = useSelector((state: RootState) => state.game.gameType);

  const solution = useSelector((state: RootState) => state.game.solution);
  const curRow = useSelector((state: RootState) => state.game.curRow);
  const guessList = useSelector((state: RootState) => state.game.guessList);
  const evaluationList = useSelector(
    (state: RootState) => state.game.evaluationList
  );
  const keyMap = useSelector((state: RootState) => state.game.keyMap);

  const [shake, setShake] = useState<boolean>(false);
  const [isEnabledInput, setIsEnabledInput] = useState<boolean>(true);

  const isDarkmode = useSelector((state: RootState) => state.common.isDarkmode);
  const isHardmode = useSelector((state: RootState) => state.common.isHardmode);
  const isContrastmode = useSelector(
    (state: RootState) => state.common.isContrastMode
  );

  const curGuess = useMemo(() => {
    return guessList[curRow] ?? "";
  }, [curRow, guessList]);

  useEffect(() => {
    const gameType: string | undefined = (match.params as any).gameType;
    dispatch(setGameType(gameType));
  }, []);

  // init
  useEffect(() => {
    if (gameType !== "NONE") {
      init();
    }
  }, [gameType]);

  const init = async () => {
    dispatch(setLoading(true));

    if (gameType === "NORMAL" && (match.params as any).gameType === undefined) {
      const r = await axios.get<Response>(
        `https://hy374x63qa.execute-api.ap-northeast-2.amazonaws.com/default/wordle-v2?gameType=${gameType}`
      );

      if (r.status !== 200 || !r.data.id || !r.data.solution) {
        dispatch(
          addToast({
            text: "시스템 오류 입니다!"
          })
        );

        return;
      }

      dispatch(setId(r.data.id));
      dispatch(setSolution(r.data.solution));

      fetchResultSummary(r.data.id, false);
      fetchResultSummary(r.data.id - 1, true);

      const gameData = getGameDataFromLS(gameType);

      // 최초 접속 시 헬프 모달
      if (gameData.id === 0) {
        dispatch(setShowHelpModal(true));
      }

      // 기존 진행하고 있는 게임 일 경우, 게임데이터 싱크
      if (gameData.id === r.data.id) {
        syncGameData(gameData);

        if (gameData.state === "FINISH") {
          setIsEnabledInput(false);
          setTimeout(() => {
            dispatch(setShowStatisticsModal(true));
          }, 1000);
        }
      } else {
        startNewGame(r.data.id);
      }
    } else if (
      gameType === "INFINITE" &&
      (match.params as any).gameType === "infinite"
    ) {
      const gameData = getGameDataFromLS(gameType);
      if (gameData.id === 0 || gameData.state === "FINISH") {
        // 게임이 종료 되었으면 새 게임 받아오기
        startNewInfiniteGame();
      } else {
        // 진행중이면 계속 진행
        syncGameData(gameData);
      }
    }

    dispatch(setLoading(false));
  };

  const startNewInfiniteGame = async () => {
    const r = await axios.get<Response>(
      `https://hy374x63qa.execute-api.ap-northeast-2.amazonaws.com/default/wordle-v2?gameType=${gameType}`
    );

    if (r.status !== 200 || !r.data.id || !r.data.solution) {
      dispatch(
        addToast({
          text: "시스템 오류 입니다!"
        })
      );

      return;
    }

    dispatch(setId(r.data.id));
    dispatch(setSolution(r.data.solution));

    startNewGame(r.data.id, r.data.solution);
  };

  /**
   * 노말게임, 결과 요약 데이터 받아오기
   * @param id
   * @param isPrev
   */
  const fetchResultSummary = async (id: number, isPrev: boolean) => {
    const url = `https://ff91bzwy7j.execute-api.ap-northeast-2.amazonaws.com/default/wordle-get-result-summary?id=${id}`;
    const r = await axios.get<ResultSummaryRes>(url);
    if (!_.isEmpty(r.data)) {
      if (isPrev) {
        dispatch(setPrevResultSummary(r.data));
      } else {
        dispatch(setCurResultSummary(r.data));
      }
    }
  };

  const startNewGame = (id: number, solution?: string) => {
    const gameData: GameData = _.cloneDeep(initGameData);
    gameData.id = id;
    if (solution) {
      gameData.solution = solution;
    }
    saveGameData(gameType, gameData);
    syncGameData(gameData);
    setIsEnabledInput(true);
  };

  /**
   * 게임데이터를 스토어에 싱크
   * @param gameData
   */
  const syncGameData = (gameData: GameData) => {
    dispatch(syncFromGameData(gameData));
  };

  const onClickKeyboard = (letter: string) => {
    if (!isEnabledInput) {
      return;
    }

    if (curGuess.length < LETTER_COUNT) {
      const guessList_ = [...guessList];
      guessList_[curRow] += letter;
      dispatch(setGuessList(guessList_));
    }
  };

  const shakeTiles = () => {
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, 200);
  };

  const onClickEnter = async () => {
    if (!isEnabledInput) {
      return;
    }

    if (curGuess.length === LETTER_COUNT) {
      const guessWord = Hangul.assemble(curGuess.split(""));

      // 완성된 한글인지 체크
      const isCompleteWord = guessWord
        .split("")
        .every(letter => Hangul.isComplete(letter));

      if (!isCompleteWord) {
        dispatch(addToast({ text: "단어 목록에 없습니다." }));
        shakeTiles();
        return;
      }

      // 하드 모드 체크
      if (isHardmode) {
        const error = Utils.checkHardmode(curRow, guessList, evaluationList);
        if (error) {
          dispatch(addToast({ text: error }));
          shakeTiles();
          return;
        }
      }

      setIsEnabledInput(false);

      // 게임 평가 시작
      const r = await axios.get<Response>(
        `https://hy374x63qa.execute-api.ap-northeast-2.amazonaws.com/default/wordle-v2?guess=${guessWord}`
      );

      // 에러 체크
      if (r.data.error) {
        dispatch(addToast({ text: r.data.error }));
        shakeTiles();
        setIsEnabledInput(true);
        return;
      }

      // 평가
      const evaluation = Utils.getEvaluation(curGuess, solution);

      // 게임 기록 업데이트
      const gameData: GameData = getGameDataFromLS(gameType);
      gameData.curRow = curRow + 1;
      gameData.guessList[curRow] = curGuess;
      gameData.evaluationList[curRow] = evaluation;
      gameData.keyMap = _.cloneDeep(
        Utils.getNewKeyMap(curGuess, evaluation, keyMap)
      );
      saveGameData(gameType, gameData);

      // 통계 업데이트
      if (evaluation === "sssss") {
        // 성공
        const statisticsData = getStatisticsData(gameType);
        statisticsData.currentStreak += 1;
        statisticsData.maxStreak = Math.max(
          statisticsData.maxStreak,
          statisticsData.currentStreak
        );
        statisticsData.success[curRow] =
          (statisticsData.success[curRow] ?? 0) + 1;
        saveStatisticsData(gameType, statisticsData);

        gameData.curRow = curRow;
        gameData.state = "FINISH";
        saveGameData(gameType, gameData);
      } else if (curRow === ROW_COUNT - 1) {
        // 실패
        const statisticsData = getStatisticsData(gameType);
        statisticsData.currentStreak = 0;
        statisticsData.fail += 1;
        saveStatisticsData(gameType, statisticsData);

        gameData.curRow = curRow;
        gameData.state = "FINISH";
        saveGameData(gameType, gameData);
      }

      // 애니메이션 주면서 타일 오픈 1.6초
      for (let i = 0; i < LETTER_COUNT; ++i) {
        setTimeout(() => {
          const evaluationList_ = [...evaluationList];
          evaluationList_[curRow] = evaluation.slice(0, i + 1);
          dispatch(setEvaluationList(evaluationList_));
        }, i * 320);
      }

      setTimeout(() => {
        const newKeyMap = Utils.getNewKeyMap(curGuess, evaluation, keyMap);
        dispatch(setKeyMap(newKeyMap));

        // 종료 처리
        if (evaluation === "sssss") {
          const answerString = [
            "천재!!!",
            "굉장해요!!!",
            "정말 잘했어요!!",
            "멋져요!",
            "잘했어요!!",
            "휴~ 겨우 맞췄네요!"
          ];

          dispatch(
            addToast({
              text: answerString[curRow],
              delay: 2000
            })
          );

          if (gameType === "NORMAL") {
            axios.get(
              `https://jnfj4yqnp0.execute-api.ap-northeast-2.amazonaws.com/default/wordle-result?id=${gameData.id}&row=${curRow}`
            );
          }

          // 통계 모달
          setTimeout(() => {
            dispatch(setShowStatisticsModal(true));
          }, 2000);
        } else if (curRow === ROW_COUNT - 1) {
          if (gameType === "NORMAL") {
            dispatch(
              addToast({
                text: "다음에 다시 도전해보세요.",
                delay: 2000
              })
            );
          }

          dispatch(
            addToast({
              text: `정답은 '${solution}' 입니다`,
              delay: 4000
            })
          );

          if (gameType === "NORMAL") {
            axios.get(
              `https://jnfj4yqnp0.execute-api.ap-northeast-2.amazonaws.com/default/wordle-result?id=${gameData.id}&row=-1`
            );
          }

          // 통계 모달
          setTimeout(() => {
            dispatch(setShowStatisticsModal(true));
          }, 2000);
        } else {
          dispatch(setCurRow(curRow + 1));
          setIsEnabledInput(true);
        }
      }, 1600);
    }
  };

  const onClickBack = () => {
    if (!isEnabledInput) {
      return;
    }

    if (0 < curGuess.length) {
      const guessList_ = [...guessList];
      guessList_[curRow] = guessList_[curRow].slice(0, -1);
      dispatch(setGuessList(guessList_));
    }
  };

  const onClickShare = () => {
    const gameData = getGameDataFromLS(gameType);
    let copyText = Utils.getCopyText(
      gameType,
      isHardmode,
      isContrastmode,
      isDarkmode,
      gameData
    );

    if (isMobile && navigator.share) {
      navigator.share({
        text: copyText
      });
    } else {
      navigator.clipboard.writeText(copyText);
      dispatch(
        addToast2({
          text: "게임 결과를 클립보드에 복사했습니다.",
          delay: 2000
        })
      );
    }
  };

  return (
    <div className="game">
      {/* other */}
      <div>
        <GameKeyboardInput
          onClickKeyboard={onClickKeyboard}
          onClickEner={onClickEnter}
          onClickBack={onClickBack}
        />

        <StatisticsModal
          onClickShare={onClickShare}
          onClickNewInfiniteGame={startNewInfiniteGame}
        />
        <HelpModal />
        {gameType === "NORMAL" && <AddSolution />}
      </div>

      <GameHeader />
      <GameBody shake={shake} />
      <GameKeyboard
        onClickKeyboard={onClickKeyboard}
        onClickEner={onClickEnter}
        onClickBack={onClickBack}
      />
      <AdSense.Google
        className="mt-4 mb-2"
        style={{ display: "inline-block", width: "100%", height: 90 }}
        client="ca-pub-7150456660061561"
        slot="3236246273"
        format=""
      />
    </div>
  );
};

export { Game };

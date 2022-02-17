import { LETTER_COUNT, ROW_COUNT } from "const";
import { GameData } from "GameData";
import _ from "lodash";
import Hangul from "hangul-js";

export const Utils = {
  /**
   *
   * @param guess 'ㅊㅜㅊㅡㄱ'
   * @param solution '정답'
   * @returns
   */
  getEvaluation: (guess: string, solution: string) => {
    let evalution = ["o", "o", "o", "o", "o"];
    const solution_ = Hangul.disassemble(solution);

    // 스트라이크 체크
    for (let i = 0; i < LETTER_COUNT; ++i) {
      if (guess[i] === solution_[i]) {
        evalution[i] = "s";
      }
    }

    // 볼 체크
    for (let i = 0; i < LETTER_COUNT; ++i) {
      if (evalution[i] === "o") {
        let countLetterInSolution = solution_.filter(
          l => l === guess[i]
        ).length;
        let countSB = 0;
        for (let j = 0; j < LETTER_COUNT; ++j) {
          if (guess[i] === guess[j] && evalution[j] !== "o") {
            ++countSB;
          }
        }

        if (countSB < countLetterInSolution) {
          evalution[i] = "b";
        }
      }
    }

    return evalution.join("");
  },
  checkHardmode: (
    curRow: number,
    guessList: string[],
    evaluationList: string[]
  ): string => {
    // 스트라이크 체크
    for (let i = 0; i < curRow; ++i) {
      for (let j = 0; j < LETTER_COUNT; ++j) {
        if (evaluationList[i].split("")[j] === "s") {
          if (guessList[curRow].split("")[j] !== guessList[i].split("")[j]) {
            return `${j + 1}번째 글자는 '${
              guessList[i].split("")[j]
            }' 이어야 합니다.`;
          }
        }
      }
    }

    // 볼 체크
    for (let i = 0; i < curRow; ++i) {
      for (let j = 0; j < LETTER_COUNT; ++j) {
        if (evaluationList[i].split("")[j] === "b") {
          if (!guessList[curRow].includes(guessList[i].split("")[j])) {
            return `'${guessList[i].split("")[j]}' 글자가 포함되어야 합니다.`;
          }
        }
      }
    }

    return "";
  },
  getCopyText: (
    isHardmode: boolean,
    isContrastmode: boolean,
    isDarkmode: boolean,
    gameData: GameData
  ) => {
    let copyText = `워들 ${gameData.id} ${
      gameData.evaluationList.some(evaluation => evaluation === "sssss")
        ? gameData.evaluationList.filter(evaluation => evaluation).length
        : "X"
    }/${ROW_COUNT}${isHardmode ? "*" : ""}\n`;
    copyText += "https://jhlov.github.io/wordle\n\n";

    copyText += gameData.evaluationList
      .filter(evaluation => evaluation !== "")
      .map(evaluation =>
        evaluation
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

    return copyText;
  },
  getNewKeyMap: (
    guess: string,
    evaluation: string,
    keyMap: { [key: string]: string }
  ) => {
    const newkeyMap = _.cloneDeep(keyMap);
    guess.split("").forEach((letter, i) => {
      if (evaluation[i] === "s") {
        newkeyMap[letter] = "s";
      } else if (evaluation[i] === "b") {
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
  }
};

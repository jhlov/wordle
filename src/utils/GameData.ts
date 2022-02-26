import _ from "lodash";
import { GameType } from "store/game";

export interface GameData {
  guessList: string[];
  evaluationList: string[];
  keyMap: { [key: string]: string };
  curRow: number;
  id: number;
  state: "PLAYING" | "FINISH";
  solution?: string;
}

export const initGameData: GameData = {
  guessList: ["", "", "", "", "", ""],
  evaluationList: ["", "", "", "", "", ""],
  keyMap: {},
  curRow: -1,
  id: 0,
  state: "PLAYING"
};

export const getGameDataFromLS = (gameType: GameType): GameData => {
  const key =
    gameType === "INFINITE"
      ? "wordle-gamedata-infinite"
      : gameType === "BATTLE"
      ? "wordle-gamedata-battle"
      : gameType === "CUSTOM"
      ? "wordle-gamedata-custom"
      : "gameData";
  const str = localStorage.getItem(key);
  if (str) {
    const data: GameData = JSON.parse(str);
    if (!data.guessList || !data.evaluationList) {
      // 버전 바꼈을 때, 헬프 팝업 띄우지 않게 하기 위해 id 를 -1로
      return { ...initGameData, id: -1 };
    }

    return { ...data };
  } else {
    localStorage.setItem(key, JSON.stringify(initGameData));
    return _.cloneDeep(initGameData);
  }
};

export const saveGameData = (gameType: GameType, gameData: GameData) => {
  const key =
    gameType === "INFINITE"
      ? "wordle-gamedata-infinite"
      : gameType === "BATTLE"
      ? "wordle-gamedata-battle"
      : gameType === "CUSTOM"
      ? "wordle-gamedata-custom"
      : "gameData";
  localStorage.setItem(key, JSON.stringify(gameData));
};

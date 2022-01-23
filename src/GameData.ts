import _ from "lodash";

export interface GameData {
  letters: string[];
  checks: string[];
  keyMap: { [key: string]: string };
  curRow: number;
  id: number;
  state: "PLAYING" | "FINISH";
}

export const initGameData: GameData = {
  letters: ["", "", "", "", "", ""],
  checks: ["", "", "", "", "", ""],
  keyMap: {},
  curRow: 0,
  id: 0,
  state: "PLAYING"
};

export const getGameData = (): GameData => {
  const str = localStorage.getItem("gameData");
  if (str) {
    return JSON.parse(str);
  } else {
    localStorage.setItem("gameData", JSON.stringify(initGameData));
    return _.cloneDeep(initGameData);
  }
};

export const saveGameData = (gameData: GameData) => {
  localStorage.setItem("gameData", JSON.stringify(gameData));
};

import _ from "lodash";

export interface GameData {
  guessList: string[];
  evaluationList: string[];
  keyMap: { [key: string]: string };
  curRow: number;
  id: number;
  state: "PLAYING" | "FINISH";
}

export const initGameData: GameData = {
  guessList: ["", "", "", "", "", ""],
  evaluationList: ["", "", "", "", "", ""],
  keyMap: {},
  curRow: 0,
  id: 0,
  state: "PLAYING"
};

export const getGameDataFromLS = (): GameData => {
  const str = localStorage.getItem("gameData");
  if (str) {
    const data: GameData = JSON.parse(str);
    if (!data.guessList || !data.evaluationList) {
      return { ...initGameData, id: -1 };
    }

    return { ...data };
  } else {
    localStorage.setItem("gameData", JSON.stringify(initGameData));
    return _.cloneDeep(initGameData);
  }
};

export const saveGameData = (gameData: GameData) => {
  localStorage.setItem("gameData", JSON.stringify(gameData));
};

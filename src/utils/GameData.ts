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
      // 버전 바꼈을 때, 헬프 팝업 띄우지 않게 하기 위해 id 를 -1로
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

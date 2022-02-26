import _ from "lodash";
import { GameType } from "store/game";

export interface StatisticsData {
  currentStreak: number;
  maxStreak: number;
  success: { [key: string]: number };
  fail: number;

  // 배틀모드에서 사용
  win?: number;
  draw?: number;
}

export const initStatisticsData: StatisticsData = {
  currentStreak: 0,
  maxStreak: 0,
  success: {},
  fail: 0
};

export const getStatisticsData = (gameType: GameType): StatisticsData => {
  const key =
    gameType === "INFINITE"
      ? "wordle-statisticsdata-infinite"
      : gameType === "BATTLE"
      ? "wordle-statisticsdata-battle"
      : gameType === "CUSTOM"
      ? "wordle-statisticsdata-custom"
      : "statisticsData";

  const str = localStorage.getItem(key);
  if (str) {
    return JSON.parse(str);
  } else {
    localStorage.setItem(key, JSON.stringify(initStatisticsData));
    return _.cloneDeep(initStatisticsData);
  }
};

export const saveStatisticsData = (
  gameType: GameType,
  statisticsData: StatisticsData
) => {
  const key =
    gameType === "INFINITE"
      ? "wordle-statisticsdata-infinite"
      : gameType === "BATTLE"
      ? "wordle-statisticsdata-battle"
      : gameType === "CUSTOM"
      ? "wordle-statisticsdata-custom"
      : "statisticsData";

  localStorage.setItem(key, JSON.stringify(statisticsData));
};

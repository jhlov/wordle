import _ from "lodash";

export interface StatisticsData {
  currentStreak: number;
  maxStreak: number;
  success: { [key: string]: number };
  fail: number;
}

export const initStatisticsData = {
  currentStreak: 0,
  maxStreak: 0,
  success: {},
  fail: 0
};

export const getStatisticsData = (): StatisticsData => {
  const str = localStorage.getItem("statisticsData");
  if (str) {
    return JSON.parse(str);
  } else {
    localStorage.setItem("statisticsData", JSON.stringify(initStatisticsData));
    return _.cloneDeep(initStatisticsData);
  }
};

export const saveStatisticsData = (statisticsData: StatisticsData) => {
  localStorage.setItem("statisticsData", JSON.stringify(statisticsData));
};

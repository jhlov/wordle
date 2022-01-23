export interface StatisticsData {
  currentStreak: number;
  maxStreak: number;
  success: { [key: string]: number };
  fail: number;
  lastGame: number;
}

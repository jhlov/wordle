import { createSlice } from "@reduxjs/toolkit";
import _ from "lodash";
import { ResultSummaryRes } from "pages/game/Game";
import { ROW_COUNT } from "utils/const";
import { GameData } from "utils/GameData";

export type GameType = "NORMAL" | "INFINITE";

interface InitialState {
  gameType: GameType;
  id: number;
  solution: string;
  curRow: number;
  guessList: string[];
  evaluationList: string[];
  keyMap: { [key: string]: string };
  curReslutSummary: ResultSummaryRes | null;
  prevReslutSummary: ResultSummaryRes | null;
}

const initialState: InitialState = {
  gameType: "NORMAL",
  id: -1,
  solution: "",
  curRow: 0,
  guessList: ["", "", "", "", "", ""],
  evaluationList: ["", "", "", "", "", ""],
  keyMap: {},
  curReslutSummary: null,
  prevReslutSummary: null
};

export const game = createSlice({
  name: "game",
  initialState,
  reducers: {
    setGameType: (state, action: { payload: string | undefined }) => {
      if (action.payload === "infinite") {
        state.gameType = "INFINITE";
      } else {
        state.gameType = "NORMAL";
      }
    },
    setId: (state, action: { payload: number }) => {
      state.id = action.payload;
    },
    setSolution: (state, action: { payload: string }) => {
      state.solution = action.payload;
    },
    setCurRow: (state, action: { payload: number }) => {
      state.curRow = Math.min(ROW_COUNT - 1, action.payload);
    },
    setGuessList: (state, action: { payload: string[] }) => {
      state.guessList = [...action.payload];
    },
    setEvaluationList: (state, action: { payload: string[] }) => {
      state.evaluationList = [...action.payload];
    },
    setKeyMap: (state, action: { payload: { [key: string]: string } }) => {
      state.keyMap = { ...action.payload };
    },
    syncFromGameData: (state, action: { payload: GameData }) => {
      state.curRow = Math.min(ROW_COUNT - 1, action.payload.curRow);
      state.guessList = [...action.payload.guessList];
      state.evaluationList = [...action.payload.evaluationList];
      state.keyMap = _.cloneDeep(action.payload.keyMap);
    },
    setCurResultSummary: (state, action: { payload: ResultSummaryRes }) => {
      state.curReslutSummary = { ...action.payload };
    },
    setPrevResultSummary: (state, action: { payload: ResultSummaryRes }) => {
      state.prevReslutSummary = { ...action.payload };
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setGameType,
  setId,
  setSolution,
  setCurRow,
  setGuessList,
  setEvaluationList,
  setKeyMap,
  syncFromGameData,
  setCurResultSummary,
  setPrevResultSummary
} = game.actions;

export default game.reducer;

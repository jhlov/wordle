import { createSlice } from "@reduxjs/toolkit";

interface InitialState {
  showHelpModal: boolean;
  showSettingModal: boolean;
  showStatisticsModal: boolean;
  showAddSolutionModal: boolean;
}

const initialState: InitialState = {
  showHelpModal: false,
  showSettingModal: false,
  showStatisticsModal: false,
  showAddSolutionModal: false
};

export const modal = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setShowHelpModal: (state, action: { payload: boolean }) => {
      state.showHelpModal = action.payload;
    },
    setShowSettingModal: (state, action: { payload: boolean }) => {
      state.showSettingModal = action.payload;
    },
    setShowStatisticsModal: (state, action: { payload: boolean }) => {
      state.showStatisticsModal = action.payload;
    },
    setShowAddSolutionModal: (state, action: { payload: boolean }) => {
      state.showAddSolutionModal = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setShowHelpModal,
  setShowSettingModal,
  setShowStatisticsModal,
  setShowAddSolutionModal
} = modal.actions;

export default modal.reducer;

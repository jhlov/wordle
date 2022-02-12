import { createSlice } from "@reduxjs/toolkit";

export const common = createSlice({
  name: "common",
  initialState: {
    isHardmode: false,
    isDarkmode: false,
    isContrastMode: false
  },
  reducers: {
    setHardmode: (state, action: { payload: boolean }) => {
      state.isHardmode = action.payload;
    },
    setDarkmode: (state, action: { payload: boolean }) => {
      state.isDarkmode = action.payload;
    },
    setContrastmode: (state, action: { payload: boolean }) => {
      state.isContrastMode = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setHardmode, setDarkmode, setContrastmode } = common.actions;

export default common.reducer;

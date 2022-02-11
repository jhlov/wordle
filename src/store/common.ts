import { createSlice } from "@reduxjs/toolkit";

export const common = createSlice({
  name: "common",
  initialState: {
    isHardmode: false,
    isDarkmode: false
  },
  reducers: {
    setHardmode: (state, action: { payload: boolean }) => {
      state.isHardmode = action.payload;
    },
    setDarkmode: (state, action: { payload: boolean }) => {
      state.isDarkmode = action.payload;
    }
  }
});

// Action creators are generated for each case reducer function
export const { setHardmode, setDarkmode } = common.actions;

export default common.reducer;

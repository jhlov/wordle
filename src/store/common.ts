import { createSlice } from "@reduxjs/toolkit";
import { ToastData } from "../ToastLayer";

interface InitialState {
  isHardmode: boolean;
  isDarkmode: boolean;
  isContrastMode: boolean;
  isLoading: boolean;
  toastList: ToastData[];
}

const initialState: InitialState = {
  isHardmode: false,
  isDarkmode: false,
  isContrastMode: false,
  isLoading: false,
  toastList: []
};

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setHardmode: (state, action: { payload: boolean }) => {
      state.isHardmode = action.payload;
    },
    setDarkmode: (state, action: { payload: boolean }) => {
      state.isDarkmode = action.payload;
    },
    setContrastmode: (state, action: { payload: boolean }) => {
      state.isContrastMode = action.payload;
    },
    setLoading: (state, action: { payload: boolean }) => {
      state.isLoading = action.payload;
    },
    addToast: (state, action: { payload: ToastData }) => {
      state.toastList = [...state.toastList, action.payload];
    },
    closeToast: (state, action: { payload: number }) => {
      state.toastList = state.toastList.map((toast, i) =>
        i === action.payload ? { ...toast, show: false } : toast
      );
    }
  }
});

// Action creators are generated for each case reducer function
export const {
  setHardmode,
  setDarkmode,
  setContrastmode,
  setLoading,
  addToast,
  closeToast
} = common.actions;

export default common.reducer;

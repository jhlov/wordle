import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common";

const store = configureStore({
  reducer: {
    common: commonReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

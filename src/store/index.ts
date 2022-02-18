import { configureStore } from "@reduxjs/toolkit";
import commonReducer from "./common";
import gameReducer from "./game";
import modalReducer from "./modal";

const store = configureStore({
  reducer: {
    common: commonReducer,
    game: gameReducer,
    modal: modalReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;

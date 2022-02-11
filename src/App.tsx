import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.scss";
import { Game } from "./Game";
import { RootState } from "./store";
import { setDarkmode } from "./store/common";

function App() {
  const dispatch = useDispatch();

  const isMobile = true;
  const isDarkmode = useSelector((state: RootState) => state.common.isDarkmode);

  useEffect(() => {
    const darkmode = localStorage.getItem("wordle-darkmode") === "true";
    dispatch(setDarkmode(darkmode));

    if (darkmode) {
      document.body.classList.add("darkmode");
    }
  }, []);

  return (
    <div className={classNames("App", { darkmode: isDarkmode })}>
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <Game />
      </div>
    </div>
  );
}

export default App;

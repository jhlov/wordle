import classNames from "classnames";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import "./App.scss";
import { Game } from "./Game";
import { setDarkmode, setHardmode } from "./store/common";

function App() {
  const dispatch = useDispatch();

  const isMobile = true;

  useEffect(() => {
    const harmode = localStorage.getItem("wordle-hardmode") === "true";
    dispatch(setHardmode(harmode));

    const darkmode = localStorage.getItem("wordle-darkmode") === "true";
    dispatch(setDarkmode(darkmode));

    if (darkmode) {
      document.body.classList.add("darkmode");
    }
  }, []);

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <Game />
      </div>
    </div>
  );
}

export default App;

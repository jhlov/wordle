import classNames from "classnames";
import { LoadingLayer } from "components/LoadingLayer";
import { ToastLayer } from "components/ToastLayer";
import { Game } from "pages/game/Game";
import { Maker } from "pages/maker/Maker";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Route } from "react-router-dom";
import { setContrastmode, setDarkmode, setHardmode } from "store/common";
import "styles/tile.scss";
import "./App.scss";

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

    const contrastmode = localStorage.getItem("wordle-contrast") === "true";
    dispatch(setContrastmode(contrastmode));

    if (contrastmode) {
      document.body.classList.add("contrast");
    }
  }, []);

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <HashRouter>
          <Route path="/" component={Game} exact />
          <Route path="/infinite" component={Game} />
          <Route path="/battle" component={Game} />
          <Route path="/maker" component={Maker} />
          <Route path="/c/:key" component={Game} />
        </HashRouter>
        <LoadingLayer />
        <ToastLayer />
      </div>
    </div>
  );
}

export default App;

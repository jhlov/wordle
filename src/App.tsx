import classNames from "classnames";
import React from "react";
import { HashRouter, Route } from "react-router-dom";
import "./App.scss";
import { Game } from "./Game";

function App() {
  const isMobile = true;

  return (
    <div className="App">
      <div className={classNames(isMobile ? "mobile-container" : "container")}>
        <HashRouter>
          <Route path="/" component={Game} />
        </HashRouter>
      </div>
    </div>
  );
}

export default App;

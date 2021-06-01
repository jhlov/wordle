import classNames from "classnames";
import React from "react";
import "./App.scss";

function App() {
  const isMobile = false;

  return (
    <div className="App">
      <div
        className={classNames(isMobile ? "mobile-container" : "container")}
      ></div>
    </div>
  );
}

export default App;

import React from "react";
import "./GameBody.scss";

const GameBody = () => {
  return (
    <div className="game-body">
      <div className="game-body-row">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div className="item">{i}</div>
          ))}
      </div>
      <div className="game-body-row">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div className="item">{i}</div>
          ))}
      </div>
      <div className="game-body-row">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div className="item">{i}</div>
          ))}
      </div>
      <div className="game-body-row">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div className="item">{i}</div>
          ))}
      </div>
      <div className="game-body-row">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div className="item">{i}</div>
          ))}
      </div>
      <div className="game-body-row">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <div className="item">{i}</div>
          ))}
      </div>
    </div>
  );
};

export { GameBody };

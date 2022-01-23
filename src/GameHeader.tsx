import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import React from "react";
import "./GameHeader.scss";

interface Props {
  onClickStatistics: () => void;
  onClickHowTo: () => void;
}

const GameHeader = (props: Props) => {
  return (
    <div className="game-header align-items-center justify-content-between py-2 border-bottom">
      <button onClick={props.onClickHowTo}>
        <HelpOutlineIcon />
      </button>
      <h1 className="m-0 p-0">워들</h1>
      <div>
        <button onClick={props.onClickStatistics}>
          <LeaderboardOutlinedIcon />
        </button>
      </div>
    </div>
  );
};

export { GameHeader };

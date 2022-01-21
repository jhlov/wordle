import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import "./GameHeader.scss";

const GameHeader = () => {
  return (
    <div className="game-header align-items-center justify-content-between py-1 border-bottom">
      <button>
        <HelpOutlineIcon />
      </button>
      <h1 className="m-0 p-0">워들</h1>
      <div>
        <button>
          <LeaderboardOutlinedIcon />
        </button>
        <button>
          <SettingsIcon />
        </button>
      </div>
    </div>
  );
};

export { GameHeader };
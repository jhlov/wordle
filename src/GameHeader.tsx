import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import React from "react";
import "./GameHeader.scss";

const GameHeader = () => {
  return (
    <div className="game-header align-items-center justify-content-between py-1 border-bottom">
      <HelpOutlineIcon />
      <h1 className="m-0 p-0">워들</h1>
      <div>
        <LeaderboardOutlinedIcon />
        <SettingsIcon />
      </div>
    </div>
  );
};

export { GameHeader };

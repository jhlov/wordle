import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { SettingModal } from "components/modals/SettingModal";
import React from "react";
import { useDispatch } from "react-redux";
import {
  setShowHelpModal,
  setShowSettingModal,
  setShowStatisticsModal
} from "store/modal";
import "./GameHeader.scss";

const GameHeader = () => {
  const dispatch = useDispatch();

  const onClickHowTo = () => {
    dispatch(setShowHelpModal(true));
  };

  const onClickStatistics = () => {
    dispatch(setShowStatisticsModal(true));
  };

  const onClickSetting = () => {
    dispatch(setShowSettingModal(true));
  };

  return (
    <div className="game-header align-items-center justify-content-between py-2 border-bottom">
      <button onClick={onClickHowTo}>
        <HelpOutlineIcon />
      </button>
      <h1 className="m-0 p-0">워들</h1>
      <div>
        <button onClick={onClickStatistics}>
          <LeaderboardOutlinedIcon />
        </button>
        <button onClick={onClickSetting}>
          <SettingsIcon />
        </button>
      </div>

      <SettingModal />
    </div>
  );
};

export { GameHeader };

import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import { SettingModal } from "components/modals/SettingModal";
import React, { useState } from "react";
import "./GameHeader.scss";

interface Props {
  onClickStatistics: () => void;
  onClickHowTo: () => void;
}

const GameHeader = (props: Props) => {
  const [showSettingModal, setShowSettingModal] = useState<boolean>(false);

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
        <button onClick={() => setShowSettingModal(true)}>
          <SettingsIcon />
        </button>
      </div>

      <SettingModal
        show={showSettingModal}
        onClose={() => setShowSettingModal(false)}
      />
    </div>
  );
};

export { GameHeader };

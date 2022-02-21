import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import LeaderboardOutlinedIcon from "@mui/icons-material/LeaderboardOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import SettingsIcon from "@mui/icons-material/Settings";
import { SettingModal } from "components/modals/SettingModal";
import React, { useMemo, useState } from "react";
import { Accordion } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { RootState } from "store";
import { syncFromGameData } from "store/game";
import {
  setShowHelpModal,
  setShowSettingModal,
  setShowStatisticsModal
} from "store/modal";
import { initGameData } from "utils/GameData";
import "./GameHeader.scss";

const GameHeader = () => {
  const history = useHistory();

  const [activeMenuKey, setActiveMenuKey] = useState<string>("");

  const dispatch = useDispatch();

  const gameType = useSelector((state: RootState) => state.game.gameType);

  const title = useMemo(() => {
    if (gameType === "INFINITE") {
      return "무한 워들";
    }

    return "워들";
  }, [gameType]);

  const onClickMenu = () => {
    if (activeMenuKey === "") {
      setActiveMenuKey("0");
    } else {
      setActiveMenuKey("");
    }
  };

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
    <div>
      <div className="game-header align-items-center justify-content-between py-2 border-bottom">
        <div>
          <button onClick={onClickMenu}>
            <MenuIcon />
          </button>
          <button onClick={onClickHowTo}>
            <HelpOutlineIcon />
          </button>
        </div>
        <h1 className="m-0 p-0">{title}</h1>
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
      <Accordion activeKey={activeMenuKey}>
        <Accordion.Collapse eventKey="0">
          <div className="game-header-menu pt-1 pb-2">
            {gameType === "NORMAL" ? (
              <span className="px-2">워들</span>
            ) : (
              <a
                className="px-2"
                onClick={() => {
                  dispatch(syncFromGameData(initGameData));
                  history.replace("/");
                }}
              >
                워들
              </a>
            )}
            {gameType === "INFINITE" ? (
              <span className="px-2">무한 워들</span>
            ) : (
              <a
                className="px-2"
                onClick={() => {
                  dispatch(syncFromGameData(initGameData));
                  history.replace("/infinite");
                }}
              >
                무한 워들
              </a>
            )}
          </div>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};

export { GameHeader };

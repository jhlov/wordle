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
    } else if (gameType === "BATTLE") {
      return "워들 vs AI";
    } else if (gameType === "MAKER") {
      return "워들 메이커";
    } else if (gameType === "CUSTOM") {
      return "워들 커스텀";
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
          {gameType !== "MAKER" && (
            <button onClick={onClickHowTo}>
              <HelpOutlineIcon />
            </button>
          )}
        </div>
        <h1 className="m-0 p-0">{title}</h1>

        <div>
          {gameType !== "MAKER" && (
            <button onClick={onClickStatistics}>
              <LeaderboardOutlinedIcon />
            </button>
          )}
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
              <span className="px-2 border-right">워들</span>
            ) : (
              <a
                className="px-2 border-right"
                onClick={() => {
                  setActiveMenuKey("");
                  dispatch(syncFromGameData(initGameData));
                  history.replace("/");
                }}
              >
                워들
              </a>
            )}
            {gameType === "INFINITE" ? (
              <span className="px-2 border-right">무한 워들</span>
            ) : (
              <a
                className="px-2 border-right"
                onClick={() => {
                  setActiveMenuKey("");
                  dispatch(syncFromGameData(initGameData));
                  history.replace("/infinite");
                }}
              >
                무한 워들
              </a>
            )}
            {gameType === "BATTLE" ? (
              <span className="px-2 border-right">워들 vs AI</span>
            ) : (
              <a
                className="px-2 border-right"
                onClick={() => {
                  setActiveMenuKey("");
                  dispatch(syncFromGameData(initGameData));
                  history.replace("/battle");
                }}
              >
                워들 vs AI
              </a>
            )}
            {gameType === "MAKER" ? (
              <span className="px-2">워들 메이커</span>
            ) : (
              <a
                className="px-2"
                onClick={() => {
                  setActiveMenuKey("");
                  dispatch(syncFromGameData(initGameData));
                  history.replace("/maker");
                }}
              >
                워들 메이커
              </a>
            )}
          </div>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};

export { GameHeader };

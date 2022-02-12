import CloseIcon from "@mui/icons-material/Close";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import classNames from "classnames";
import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Button, Modal, ProgressBar } from "react-bootstrap";
import { ROW_COUNT } from "./../const";
import { getGameData } from "./../GameData";
import {
  getStatisticsData,
  initStatisticsData,
  StatisticsData
} from "./../StatisticsData";
import "./StatisticsModal.scss";

interface Props {
  show: boolean;
  onClose: () => void;
  onClickShare: () => void;
}

const StatisticsModal = (props: Props) => {
  const [statisticsData, setStatisticsData] =
    useState<StatisticsData>(initStatisticsData);
  const [isFinish, setIsFinish] = useState<boolean>(false);
  const [nextTime, setNextTime] = useState<string>("");
  const [intervalId, setIntervalId] = useState<any>(null);
  const [lastWinRow, setLastWinRow] = useState<number>(-1);

  useEffect(() => {
    if (props.show) {
      const statisticsData = getStatisticsData();
      setStatisticsData(statisticsData);

      const gameData = getGameData();
      setLastWinRow(gameData.checks.indexOf("sssss"));
      setIsFinish(gameData.state === "FINISH");
      if (gameData.state === "FINISH") {
        const intervalId_ = setInterval(() => {
          const now = moment();
          let nextTime = moment();
          if (now.get("h") < 12) {
            nextTime = moment().hour(12).startOf("h");
          } else {
            nextTime = moment().add("d", 1).startOf("d");
          }

          const hours = Math.floor(
            moment.duration(nextTime.diff(now)).asHours()
          );
          const minutes = Math.floor(
            moment.duration(nextTime.diff(now)).asMinutes() % 60
          );
          const seconds = Math.floor(
            moment.duration(nextTime.diff(now)).asSeconds() % 60
          );

          setNextTime(
            `${hours.toString().padStart(2, "0")}:${minutes
              .toString()
              .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
          );
        }, 1000);

        setIntervalId(intervalId_);
      }
    } else {
      clearInterval(intervalId);
    }
  }, [props.show]);

  const winCount = useMemo(() => {
    return Object.values(statisticsData.success).reduce((p, c) => p + c, 0);
  }, [statisticsData]);

  const played = useMemo(() => {
    return statisticsData.fail + winCount;
  }, [statisticsData]);

  const winRate = useMemo(() => {
    if (played === 0) {
      return 0;
    }

    return Math.round((winCount / played) * 100);
  }, [statisticsData]);

  const maxSuccess = useMemo(() => {
    return Math.max(...Object.values(statisticsData.success));
  }, [statisticsData]);

  return (
    <Modal
      className="statistics-modal"
      show={props.show}
      onHide={props.onClose}
      centered
    >
      <Modal.Header className="border-0">
        <button className="close-btn" onClick={props.onClose}>
          <CloseIcon />
        </button>
      </Modal.Header>

      <Modal.Body>
        <section>
          <h2>통계</h2>
          <div className="summary">
            <div className="summary-item">
              <div className="value">{played}</div>
              <div className="title">게임</div>
            </div>
            <div className="summary-item">
              <div className="value">{winRate}</div>
              <div className="title">승률(%)</div>
            </div>
            <div className="summary-item">
              <div className="value">{statisticsData.currentStreak}</div>
              <div className="title">현재 연승</div>
            </div>
            <div className="summary-item">
              <div className="value">{statisticsData.maxStreak}</div>
              <div className="title">최고 연승</div>
            </div>
          </div>
        </section>

        <section>
          <h2>정답 분포</h2>
          <div className="guess-distribution">
            {Array(ROW_COUNT)
              .fill(0)
              .map((_, i) => (
                <div key={i} className="guess-distribution-item">
                  <span>{i + 1}</span>
                  <ProgressBar
                    className={classNames({ last: i === lastWinRow })}
                    now={(statisticsData.success[i] / maxSuccess) * 100}
                    label={statisticsData.success[i] ?? 0}
                  />
                </div>
              ))}
          </div>
        </section>

        {isFinish && (
          <section>
            <div className="bottom">
              <div className="border-right">
                <h2>다음 워들까지</h2>
                <div className="next-time">&nbsp;{nextTime}&nbsp;</div>
              </div>
              <div className="d-flex align-items-center justify-content-center">
                <Button
                  className="share-btn"
                  size="lg"
                  onClick={props.onClickShare}
                >
                  공유 <ShareOutlinedIcon />
                </Button>
              </div>
            </div>
          </section>
        )}
      </Modal.Body>
    </Modal>
  );
};

export { StatisticsModal };

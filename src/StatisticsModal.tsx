import classNames from "classnames";
import React, { useEffect, useMemo, useState } from "react";
import { Modal, ProgressBar } from "react-bootstrap";
import { ROW_COUNT } from "./const";
import { StatisticsData } from "./StatisticsData";
import "./StatisticsModal.scss";

interface Props {
  show: boolean;
  onClose: () => void;
}

const StatisticsModal = (props: Props) => {
  const initData: StatisticsData = {
    currentStreak: 0,
    maxStreak: 0,
    success: {},
    fail: 0,
    lastGame: 0
  };

  const [statisticsData, setStatisticsData] =
    useState<StatisticsData>(initData);

  useEffect(() => {
    const str = localStorage.getItem("statisticsData");
    if (str) {
      setStatisticsData(JSON.parse(str));
    } else {
      setStatisticsData(initData);
      localStorage.setItem("statisticsData", JSON.stringify(initData));
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

  const isFinished = useMemo(() => {
    return false;
  }, []);

  return (
    <Modal
      className="statistics-modal"
      show={props.show}
      onHide={props.onClose}
    >
      <Modal.Header className="border-0" closeButton />

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
                    className={classNames({ first: i === 0 })}
                    now={(statisticsData.success[i] / maxSuccess) * 100}
                    label={statisticsData.success[i] ?? 0}
                  />
                </div>
              ))}
          </div>
        </section>

        {isFinished && <section></section>}
      </Modal.Body>
    </Modal>
  );
};

export { StatisticsModal };

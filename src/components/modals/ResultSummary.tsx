import "@toast-ui/chart/dist/toastui-chart.min.css";
import { BarChartOptions, PieChartOptions } from "@toast-ui/chart/types";
import { BarChart, PieChart } from "@toast-ui/react-chart";
import { ResultSummaryRes } from "pages/game/Game";
import React, { useMemo } from "react";
import { isMobile } from "react-device-detect";
import { useSelector } from "react-redux";
import { RootState } from "store";

interface Props {
  resultSummary: ResultSummaryRes | null;
}

export const ResultSummary = (props: Props) => {
  const isDarkmode = useSelector((state: RootState) => state.common.isDarkmode);
  const isContrastMode = useSelector(
    (state: RootState) => state.common.isContrastMode
  );

  const firstColor = useMemo(() => {
    return isContrastMode ? "#f5793a" : isDarkmode ? "#538d4e" : "#6aaa64";
  }, [isDarkmode, isContrastMode]);

  const secondColor = useMemo(() => {
    return isDarkmode ? "#3a3a3c" : "#787c7e";
  }, [isDarkmode]);

  const pieData = useMemo(() => {
    return {
      series: [
        {
          name: "성공",
          data:
            (props.resultSummary?.[0] ?? 0) +
            (props.resultSummary?.[1] ?? 0) +
            (props.resultSummary?.[2] ?? 0) +
            (props.resultSummary?.[3] ?? 0) +
            (props.resultSummary?.[4] ?? 0) +
            (props.resultSummary?.[5] ?? 0),
          color: "#6AAA64"
        },
        {
          name: "실패",
          data: props.resultSummary?.["-1"] ?? 0
        }
      ]
    };
  }, [props.resultSummary]);

  const pieOptions: PieChartOptions = useMemo(() => {
    return {
      chart: {
        title: "성공/실패",
        width: isMobile ? 150 : 200,
        height: isMobile ? 150 : 200
      },
      tooltip: {
        template: () => ""
      },
      series: {
        selectable: false,
        dataLabels: {
          visible: true,
          pieSeriesName: {
            visible: true
          }
        }
      },
      legend: {
        visible: false
      },
      exportMenu: {
        visible: false
      },
      theme: {
        title: {
          color: isDarkmode ? "white" : "#212529",
          fontWeight: 500
        },
        chart: {
          backgroundColor: isDarkmode ? "#121213" : "white"
        },
        series: {
          colors: [firstColor, secondColor]
        }
      }
    };
  }, [isDarkmode, firstColor, secondColor]);

  const barData = useMemo(() => {
    return {
      categories: ["1", "2", "3", "4", "5", "6"],
      series: [
        {
          name: "Budget",
          data: [
            props.resultSummary?.[0] ?? 0,
            props.resultSummary?.[1] ?? 0,
            props.resultSummary?.[2] ?? 0,
            props.resultSummary?.[3] ?? 0,
            props.resultSummary?.[4] ?? 0,
            props.resultSummary?.[5] ?? 0
          ]
        }
      ]
    };
  }, [props.resultSummary]);

  const barOptions: BarChartOptions = useMemo(() => {
    return {
      chart: {
        title: "성공 단계",
        width: isMobile ? 150 : 200,
        height: isMobile ? 150 : 200
      },
      tooltip: {
        template: () => ""
      },
      series: {
        selectable: false
      },
      legend: {
        visible: false
      },
      exportMenu: {
        visible: false
      },
      xAxis: {
        label: {
          formatter: () => ""
        },
        height: 1
      },
      theme: {
        title: {
          color: isDarkmode ? "white" : "#212529",
          fontWeight: 500
        },
        chart: {
          backgroundColor: isDarkmode ? "#121213" : "white"
        },
        series: {
          colors: [firstColor]
        },
        yAxis: {
          label: {
            color: isDarkmode ? "white" : "#212529"
          },
          color: isDarkmode ? "white" : "#212529"
        },
        xAxis: {
          color: isDarkmode ? "white" : "#212529"
        },
        plot: {
          vertical: {
            lineColor: isDarkmode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
          },
          horizontal: {
            lineColor: isDarkmode
              ? "rgba(255, 255, 255, 0.1)"
              : "rgba(0, 0, 0, 0.1)"
          }
        }
      }
    };
  }, [isDarkmode, firstColor]);

  return (
    <div className="bottom text-center">
      {props.resultSummary && (
        <>
          <div>
            <PieChart data={pieData} options={pieOptions} />
          </div>
          <div>
            <BarChart data={barData} options={barOptions} />
          </div>
        </>
      )}
    </div>
  );
};

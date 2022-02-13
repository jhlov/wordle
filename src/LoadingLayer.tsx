import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "./LoadingLayer.scss";
import { RootState } from "./store";

const LoadingLayer = () => {
  const isLoading = useSelector((state: RootState) => state.common.isLoading);

  return (
    <>
      {isLoading && (
        <div className="loading">
          <Spinner animation="border" />
        </div>
      )}
    </>
  );
};

export { LoadingLayer };

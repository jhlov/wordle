import React from "react";
import { Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { RootState } from "store";
import "./LoadingLayer.scss";

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

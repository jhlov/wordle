import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { closeToast } from "./store/common";
import "./ToastLayer.scss";

export interface ToastData {
  show?: boolean;
  text: string;
  delay?: number;
}

const ToastLayer = () => {
  const dispatch = useDispatch();

  const toastList = useSelector((state: RootState) => state.common.toastList);

  const onClose = (index: number) => {
    dispatch(closeToast(index));
  };

  return (
    <div>
      <ToastContainer position="top-center" className="p-3">
        {toastList.map((toast, i) => (
          <Toast
            show={toast.show ?? true}
            key={i}
            autohide
            delay={toast.delay ?? 1000}
            onClose={() => onClose(i)}
          >
            <Toast.Body>{toast.text}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};

export { ToastLayer };

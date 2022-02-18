import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { closeToast, closeToast2 } from "store/common";
import "./ToastLayer.scss";

export interface ToastData {
  show?: boolean;
  text: string;
  delay?: number;
}

const ToastLayer = () => {
  const dispatch = useDispatch();

  const toastList = useSelector((state: RootState) => state.common.toastList);
  const toastList2 = useSelector((state: RootState) => state.common.toastList2);

  const onClose = (index: number) => {
    dispatch(closeToast(index));
  };

  const onClose2 = (index: number) => {
    dispatch(closeToast2(index));
  };

  return (
    <div>
      <ToastContainer
        position="top-center"
        className="toast-layer toast-layer-1 p-3"
      >
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

      <ToastContainer
        position="top-center"
        className="toast-layer toast-layer-2 p-3"
      >
        {toastList2.map((toast, i) => (
          <Toast
            show={toast.show ?? true}
            key={i}
            autohide
            delay={toast.delay ?? 1000}
            onClose={() => onClose2(i)}
          >
            <Toast.Body>{toast.text}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};

export { ToastLayer };

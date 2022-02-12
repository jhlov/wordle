import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames";
import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./../store";
import { setDarkmode, setHardmode } from "./../store/common";
import "./SettingModal.scss";

interface Props {
  show: boolean;
  onClose: () => void;
}

const SettingModal = (props: Props) => {
  const dispatch = useDispatch();

  const isHardmode = useSelector((state: RootState) => state.common.isHardmode);
  const isDarkmode = useSelector((state: RootState) => state.common.isDarkmode);

  const onChangeHardmode = (e: React.ChangeEvent) => {
    const v = (e.target as HTMLInputElement).checked;
    localStorage.setItem("wordle-hardmode", v.toString());
    dispatch(setHardmode(v));
  };

  const onChangeDarkmode = (e: React.ChangeEvent) => {
    const v = (e.target as HTMLInputElement).checked;
    localStorage.setItem("wordle-darkmode", v.toString());
    dispatch(setDarkmode(v));

    if (v) {
      document.body.classList.add("darkmode");
    } else {
      document.body.classList.remove("darkmode");
    }
  };

  return (
    <Modal
      className="setting-modal fullsize"
      backdropClassName="fullsize"
      show={props.show}
      onHide={props.onClose}
    >
      <Modal.Header className="border-0">
        <Modal.Title className="pl-4">설정</Modal.Title>
        <button className="close-btn" onClick={props.onClose}>
          <CloseIcon />
        </button>
      </Modal.Header>
      <Modal.Body>
        {/* <section className="pt-0">
          <div>
            <div>
              <b>하드 모드</b>
            </div>
            <p>
              <small>표시된 힌트는 다음 추측 단어에 사용되어야 합니다.</small>
            </p>
          </div>
          <Form>
            <Form.Check
              type="switch"
              id="hardmode"
              label=""
              defaultChecked={isHardmode}
              onChange={onChangeHardmode}
            />
          </Form>
        </section> */}
        <section>
          <div>
            <div>
              <b>다크 테마</b>
            </div>
          </div>
          <Form>
            <Form.Check
              type="switch"
              id="darkmode"
              label=""
              defaultChecked={isDarkmode}
              onChange={onChangeDarkmode}
            />
          </Form>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export { SettingModal };

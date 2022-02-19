import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Form, Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setContrastmode, setDarkmode, setHardmode } from "store/common";
import { setShowSettingModal } from "store/modal";
import "./SettingModal.scss";

const SettingModal = () => {
  const dispatch = useDispatch();

  const showSettingModal = useSelector(
    (state: RootState) => state.modal.showSettingModal
  );
  const isHardmode = useSelector((state: RootState) => state.common.isHardmode);
  const isDarkmode = useSelector((state: RootState) => state.common.isDarkmode);
  const isContrastMode = useSelector(
    (state: RootState) => state.common.isContrastMode
  );

  const onClose = () => {
    dispatch(setShowSettingModal(false));
  };

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

  const onChangeContrastmode = (e: React.ChangeEvent) => {
    const v = (e.target as HTMLInputElement).checked;
    localStorage.setItem("wordle-contrast", v.toString());
    dispatch(setContrastmode(v));

    if (v) {
      document.body.classList.add("contrast");
    } else {
      document.body.classList.remove("contrast");
    }
  };

  return (
    <Modal
      className="setting-modal"
      show={showSettingModal}
      onHide={onClose}
      scrollable
    >
      <Modal.Header className="border-0">
        <Modal.Title className="pl-4">설정</Modal.Title>
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
      </Modal.Header>
      <Modal.Body>
        <section className="pt-0">
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
        </section>
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
        <section>
          <div>
            <div>
              <b>고대비 모드</b>
            </div>
            <p>
              <small>시인성 향상</small>
            </p>
          </div>
          <Form>
            <Form.Check
              type="switch"
              id="contrast"
              label=""
              defaultChecked={isContrastMode}
              onChange={onChangeContrastmode}
            />
          </Form>
        </section>
        <section>
          <div>
            <div>
              <b>피드백</b>
            </div>
          </div>
          <div>
            <a href="mailto:jhlovv@gmail.com">jhlovv@gmail.com</a>
          </div>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export { SettingModal };

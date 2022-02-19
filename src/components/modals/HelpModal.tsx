import CloseIcon from "@mui/icons-material/Close";
import React from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { setShowHelpModal } from "store/modal";
import "./HelpModal.scss";

const HelpModal = () => {
  const dispatch = useDispatch();

  const showHelpModal = useSelector(
    (state: RootState) => state.modal.showHelpModal
  );

  const onClose = () => {
    dispatch(setShowHelpModal(false));
  };

  return (
    <Modal
      className="help-modal"
      show={showHelpModal}
      onHide={onClose}
      scrollable
    >
      <Modal.Header className="border-0">
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
      </Modal.Header>

      <Modal.Body>
        <section className="border-bottom">
          <p>
            6번의 시도 안에 <b>단어</b>를 맞춰보세요.
          </p>
          <p>
            단어는 5글자로 이루어진 유효한 단어입니다. 'ENTER' 버튼을 눌러
            제출하세요.
          </p>
          <p>
            제출 후에 글자 타일의 색상이 변경되어, 추측이 단어에 얼마나
            가까웠는지 보여줍니다.
          </p>
        </section>

        <section className="examples border-bottom">
          <p>
            <b>예시</b>
          </p>
          <div className="tiles">
            <div className="tile letter s rotate evaluation">ㅅ</div>
            <div className="tile letter">ㅏ</div>
            <div className="tile letter">ㄹ</div>
            <div className="tile letter">ㅏ</div>
            <div className="tile letter">ㅇ</div>
          </div>
          <p>'ㅅ' 글자는 단어에 있고, 정확한 위치에 있습니다.</p>

          <div className="tiles">
            <div className="tile letter">ㄱ</div>
            <div className="tile letter">ㅏ</div>
            <div className="tile letter b rotate evaluation">ㅁ</div>
            <div className="tile letter">ㅅ</div>
            <div className="tile letter">ㅏ</div>
          </div>
          <p>'ㅁ' 글자는 단어에는 있지만 잘못된 위치에 있습니다.</p>

          <div className="tiles">
            <div className="tile letter">ㅇ</div>
            <div className="tile letter">ㅕ</div>
            <div className="tile letter">ㄹ</div>
            <div className="tile letter o rotate evaluation">ㅡ</div>
            <div className="tile letter">ㅁ</div>
          </div>
          <p>'ㅡ' 글자는 단어에 없습니다.</p>
        </section>

        <section>
          <p>
            <strong>매일 2번(0시, 12시) 새로운 게임을 할 수 있습니다.</strong>
          </p>
          <p>
            <small>
              (이 프로젝트는&nbsp;
              <a href="https://www.powerlanguage.co.uk/wordle/" target="_blank">
                WORDLE
              </a>
              을 한글버전으로 만들어 본 토이프로젝트입니다.)
            </small>
          </p>
        </section>
      </Modal.Body>
    </Modal>
  );
};

export { HelpModal };

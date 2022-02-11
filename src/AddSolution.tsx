import AddIcon from "@mui/icons-material/Add";
import classNames from "classnames";
import Hangul from "hangul-js";
import React, { useEffect, useMemo, useState } from "react";
import {
  Button,
  Form,
  Modal,
  OverlayTrigger,
  Toast,
  ToastContainer,
  Tooltip
} from "react-bootstrap";
import { isBrowser } from "react-device-detect";
import "./AddSolution.scss";
import CloseIcon from "@mui/icons-material/Close";
import { LETTER_COUNT } from "./const";

interface Props {
  setShowAddSolutionModal: (v: boolean) => void;
}

interface ToastData {
  show: boolean;
  text?: string;
}

const AddSolution = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");
  const [toastList, setToastList] = useState<ToastData[]>([]);

  const validLetterList = [
    "ㅂ",
    "ㅈ",
    "ㄷ",
    "ㄱ",
    "ㅅ",
    "ㅛ",
    "ㅕ",
    "ㅑ",
    "ㅐ",
    "ㅔ",
    "ㅁ",
    "ㄴ",
    "ㅇ",
    "ㄹ",
    "ㅎ",
    "ㅗ",
    "ㅓ",
    "ㅏ",
    "ㅣ",
    "ㅋ",
    "ㅌ",
    "ㅊ",
    "ㅍ",
    "ㅠ",
    "ㅜ",
    "ㅡ"
  ];

  useEffect(() => {
    setWord("");
  }, [showModal]);

  const isValid = useMemo(() => {
    if (word.length !== 2) {
      return false;
    }

    if (!Hangul.isCompleteAll(word)) {
      return false;
    }

    const letters = Hangul.disassemble(word);
    if (letters.length !== LETTER_COUNT) {
      return false;
    }

    return true;
  }, [word]);

  const onClick = () => {
    setShowModal(true);
    props.setShowAddSolutionModal(true);
  };

  const onHide = () => {
    setShowModal(false);
    props.setShowAddSolutionModal(false);
  };

  const onHideCompleteModal = () => {
    setShowCompleteModal(false);
    props.setShowAddSolutionModal(false);
  };

  const addWord = () => {
    if (isValid) {
      setTimeout(() => {
        setShowModal(false);
        setShowCompleteModal(true);
      }, 1000);
    }
    // setToastList([...toastList, { show: true, text: word }]);
    // 에러 체크
    // 단어 길이
    // 글자 수
    // 정상적인 글자인지
  };

  const letters: string[] = useMemo<string[]>(() => {
    const letters = Hangul.disassemble(word);
    if (letters.length < 5) {
      Array(5 - letters.length)
        .fill(0)
        .forEach(_ => {
          letters.push("");
        });
    }

    return letters;
  }, [word]);

  return (
    <div className="add-solution">
      {isBrowser && (
        <div className="add-btn">
          <OverlayTrigger
            placement="top"
            overlay={
              <Tooltip id="add-btn-tooltip">문제를 직접 추가 해 보세요</Tooltip>
            }
          >
            <button onClick={onClick}>
              <AddIcon />
            </button>
          </OverlayTrigger>
        </div>
      )}

      <Modal className="add-solution-modal" show={showModal} onHide={onHide}>
        <Modal.Header className="border-0">
          <button className="close-btn" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>

        <Modal.Body>
          <div className="tiles mb-4">
            {letters.map((letter, i) => (
              <div
                className={classNames("tile", {
                  invalid:
                    (letter && !validLetterList.includes(letter)) || 4 < i
                })}
              >
                {letter}
              </div>
            ))}
          </div>

          <Form.Control
            type="text"
            value={word}
            onChange={e => setWord(e.target.value)}
            maxLength={2}
          />
          <p>
            <small>* shift 가 필요한 글자는 제외됩니다.</small>
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            <b>닫기</b>
          </Button>
          <Button variant="primary" onClick={addWord} disabled={!isValid}>
            <b>문제 추가</b>
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        className="add-solution-complete-modal"
        show={showCompleteModal}
        onHide={onHideCompleteModal}
      >
        <Modal.Header className="border-0">
          <button className="close-btn" onClick={onHideCompleteModal}>
            <CloseIcon />
          </button>
        </Modal.Header>

        <Modal.Body>
          <p className="text-center">
            문제 추가가 완료 되었습니다.
            <br />
            올려주신 문제 단어는 확인을 거친 후 정식 문제로 등록 됩니다.
            <br />
            감사합니다!!
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHideCompleteModal}>
            <b>닫기</b>
          </Button>
        </Modal.Footer>
      </Modal>

      <ToastContainer position="top-center" className="p-3">
        {toastList.map((toast, i) => (
          <Toast
            show={toast.show}
            key={i}
            autohide
            delay={3000}
            onClose={() => {
              setToastList(
                toastList.map((t, j) =>
                  j === i ? { show: false, text: t.text } : t
                )
              );
            }}
          >
            <Toast.Body>{toast.text}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </div>
  );
};

export { AddSolution };

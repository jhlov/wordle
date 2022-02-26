import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import classNames from "classnames";
import Hangul from "hangul-js";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { isBrowser } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "store";
import { addToast, setLoading } from "store/common";
import { setShowAddSolutionModal } from "store/modal";
import { LETTER_COUNT } from "utils/const";
import "./AddSolution.scss";

const AddSolution = () => {
  const dispatch = useDispatch();

  const showAddSolutionModal = useSelector(
    (state: RootState) => state.modal.showAddSolutionModal
  );

  const [showCompleteModal, setShowCompleteModal] = useState<boolean>(false);
  const [word, setWord] = useState<string>("");

  const tilesRef = useRef<HTMLDivElement>(null);

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
    if (showAddSolutionModal) {
      setWord("");
    }
  }, [showAddSolutionModal]);

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

    if (letters.some(letter => !validLetterList.includes(letter))) {
      return false;
    }

    return true;
  }, [word]);

  const onClick = () => {
    dispatch(setShowAddSolutionModal(true));
  };

  const onHide = () => {
    dispatch(setShowAddSolutionModal(false));
  };

  const onHideCompleteModal = () => {
    dispatch(setShowAddSolutionModal(false));
    setShowCompleteModal(false);
  };

  const addWord = async () => {
    if (isValid) {
      dispatch(setLoading(true));

      try {
        const r = await axios.post(
          "https://apn7ny4u9f.execute-api.ap-northeast-2.amazonaws.com/default/wordle-add-solution",
          { word: word }
        );

        if (r.data.error) {
          dispatch(addToast({ text: r.data.error }));

          // 흔들기
          tilesRef.current?.classList.add("shake");
          setTimeout(() => {
            tilesRef.current?.classList.remove("shake");
          }, 200);
          return;
        }

        if (r.status === 200) {
          dispatch(setShowAddSolutionModal(false));
          setShowCompleteModal(true);
        }
      } catch (error) {
        dispatch(setLoading(false));
      } finally {
        dispatch(setLoading(false));
      }
    }
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

      <Modal
        className="add-solution-modal"
        show={showAddSolutionModal}
        onHide={onHide}
        scrollable
      >
        <Modal.Header className="border-0">
          <button className="close-btn" onClick={onHide}>
            <CloseIcon />
          </button>
        </Modal.Header>

        <Modal.Body>
          <div ref={tilesRef} className="tiles mb-4">
            {letters.map((letter, i) => (
              <div
                key={`add-solution-tile-${i}`}
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
        scrollable
      >
        <Modal.Header className="border-0">
          <button className="close-btn" onClick={onHideCompleteModal}>
            <CloseIcon />
          </button>
        </Modal.Header>

        <Modal.Body>
          <p className="text-center">
            '<b>{word}</b>' 단어 추가가 완료 되었습니다.
            <br />
            올려주신 단어는 확인을 거친 후 정식 문제로 등록 됩니다.
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
    </div>
  );
};

export { AddSolution };

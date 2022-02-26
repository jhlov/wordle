import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import axios from "axios";
import classNames from "classnames";
import Hangul from "hangul-js";
import { GameHeader } from "pages/game/GameHeader";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { addToast, setLoading } from "store/common";
import { setGameType } from "store/game";
import { LETTER_COUNT } from "utils/const";
import "./Maker.scss";

interface Response {
  error?: string;
  key?: string;
}

export const Maker = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [word, setWord] = useState<string>("a");
  const [key, setKey] = useState<string>("");

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
    dispatch(setGameType("maker"));
    setWord("");
    setKey("");
  }, []);

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

  const createWordle = async () => {
    if (isValid) {
      dispatch(setLoading(true));
      setKey("");

      try {
        const r = await axios.post<Response>(
          "https://fszsuthkzi.execute-api.ap-northeast-2.amazonaws.com/default/wordle-create-custom",
          { word }
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
          setKey(r.data.key!);
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

  const wordleUrl = useMemo(() => {
    return `${window.location.origin}${window.location.pathname}#/c/${key}`;
  }, [window.location, key]);

  const onClickCopy = () => {
    if (navigator.clipboard.writeText) {
      navigator.clipboard.writeText(wordleUrl);
      dispatch(
        addToast({
          text: "게임 주소를 클립보드에 복사했습니다.",
          delay: 2000
        })
      );
    } else {
      dispatch(
        addToast({
          text: "클립보드 복사에 실패하였습니다. (크롬에서 시도해 보세요)",
          delay: 2000
        })
      );
    }
  };

  const onClickPlayGame = () => {
    history.push(`/c/${key}`);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter" && isValid) {
      createWordle();
    }
  };

  return (
    <div className="maker">
      <GameHeader />

      <div className="p-4 pt-5">
        <p className="mb-5">
          직접 워들 문제를 만들어 친구들과 공유하고 즐겨보세요!
        </p>

        <div ref={tilesRef} className="tiles mb-4">
          {letters.map((letter, i) => (
            <div
              key={`add-solution-tile-${i}`}
              className={classNames("tile", {
                invalid: (letter && !validLetterList.includes(letter)) || 4 < i
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
          placeholder="단어를 입력하세요."
          onKeyDown={onKeyDown}
        />
        <p className="text-left">
          <small>* shift 가 필요한 글자는 제외됩니다.</small>
        </p>

        <Button variant="primary" disabled={!isValid} onClick={createWordle}>
          워들 생성
        </Button>

        {key && (
          <div className="py-5">
            <div className="url p-2">{wordleUrl}</div>
            <div className="pt-2">
              <Button variant="primary" className="me-2" onClick={onClickCopy}>
                클립보드 복사 <ContentCopyIcon fontSize="small" />
              </Button>
              <Button variant="primary" onClick={onClickPlayGame}>
                게임하러가기 <PlayArrowIcon fontSize="small" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

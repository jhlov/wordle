import React, { useMemo, useRef } from "react";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { LETTER_COUNT } from "./const";
import useInterval from "./useInterval";

interface Props {
  onClickKeyboard: (letter: string) => void;
  onClickEner: () => void;
  onClickBack: () => void;
  showAddSolutionModal: boolean;
}

const GameKeyboardInput = (props: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  const curRow = useSelector((state: RootState) => state.game.curRow);
  const guessList = useSelector((state: RootState) => state.game.guessList);

  const curGuess = useMemo(() => {
    return guessList[curRow];
  }, [curRow, guessList]);

  useInterval(() => {
    if (divRef.current) {
      if (!props.showAddSolutionModal) {
        divRef.current.focus();
      }
    }
  }, 100);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      if (curGuess.length === LETTER_COUNT) {
        props.onClickEner();
      }
    } else if (e.code === "Backspace") {
      if (0 < curGuess.length) {
        props.onClickBack();
      }
    } else {
      const code: { [key: string]: string } = {
        KeyQ: "ㅂ",
        KeyW: "ㅈ",
        KeyE: "ㄷ",
        KeyR: "ㄱ",
        KeyT: "ㅅ",
        KeyY: "ㅛ",
        KeyU: "ㅕ",
        KeyI: "ㅑ",
        KeyO: "ㅐ",
        KeyP: "ㅔ",
        KeyA: "ㅁ",
        KeyS: "ㄴ",
        KeyD: "ㅇ",
        KeyF: "ㄹ",
        KeyG: "ㅎ",
        KeyH: "ㅗ",
        KeyJ: "ㅓ",
        KeyK: "ㅏ",
        KeyL: "ㅣ",
        KeyZ: "ㅋ",
        KeyX: "ㅌ",
        KeyC: "ㅊ",
        KeyV: "ㅍ",
        KeyB: "ㅠ",
        KeyN: "ㅜ",
        KeyM: "ㅡ"
      };

      if (code[e.code]) {
        props.onClickKeyboard(code[e.code]);
      }
    }
  };

  return (
    <div
      className="position-absolute"
      ref={divRef}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    ></div>
  );
};

export { GameKeyboardInput };

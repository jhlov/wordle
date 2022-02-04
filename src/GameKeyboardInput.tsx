import React, { useEffect, useRef } from "react";
import { LETTER_COUNT } from "./const";

interface Props {
  curLetters: string;
  onClickKeyboard: (letter: string) => void;
  onClickEner: () => void;
  onClickBack: () => void;
}

const GameKeyboardInput = (props: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInterval(() => {
      if (divRef.current) {
        divRef.current.focus();
      }
    }, 100);
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      if (props.curLetters.length === LETTER_COUNT) {
        props.onClickEner();
      }
    } else if (e.code === "Backspace") {
      if (0 < props.curLetters.length) {
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

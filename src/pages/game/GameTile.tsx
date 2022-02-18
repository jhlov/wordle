import classNames from "classnames";
import React, { useEffect, useState } from "react";

interface Props {
  letter: string;
  evaluation: string;
  jump: boolean;
}

export const GameTile = (props: Props) => {
  const [evaluation, setEvaluation] = useState<boolean>(false);

  useEffect(() => {
    if (props.evaluation) {
      setTimeout(() => {
        setEvaluation(true);
      }, 250);
    } else {
      setEvaluation(false);
    }
  }, [props.evaluation]);

  return (
    <div
      className={classNames(
        "tile",
        [props.letter ? "letter" : "empty"],
        { [props.evaluation]: props.evaluation },
        { jump: props.jump },
        { evaluation: evaluation }
      )}
    >
      {props.letter}
    </div>
  );
};

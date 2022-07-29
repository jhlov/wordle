import AbcIcon from "@mui/icons-material/Abc";
import CloseIcon from "@mui/icons-material/Close";
import _ from "lodash";
import React from "react";
import { Modal } from "react-bootstrap";
import "./HelpModal.scss";

interface Props {
  word?: string;
  value?: string[];
  onClose: () => void;
}

const DictModal = (props: Props) => {
  const onClose = () => {
    props.onClose();
  };

  return (
    <Modal
      className="dict-modal"
      show={!_.isEmpty(props.word) && !_.isNil(props.word)}
      onHide={onClose}
      scrollable
    >
      <Modal.Header className="border-0">
        <button className="close-btn" onClick={onClose}>
          <CloseIcon />
        </button>
      </Modal.Header>

      <Modal.Body className="p-5">
        <h3>
          {props.word}{" "}
          <a
            href={`https://en.dict.naver.com/#/search?query=${props.word}`}
            target="_blank"
          >
            <AbcIcon />
          </a>
        </h3>
        <ul>
          {props.value?.map(v => (
            <li>{v}</li>
          ))}
        </ul>
      </Modal.Body>
    </Modal>
  );
};

export { DictModal };

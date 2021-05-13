import React from "react";
import { Modal, Button } from "react-bootstrap";

const CustomModal = ({ title, subtext, handleClose, show, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{subtext}</Modal.Body>
      <Modal.Footer>
        {handleConfirm && (
          <Button variant="primary" onClick={handleConfirm}>
            Confirm
          </Button>
        )}
        <Button variant={handleConfirm ? "secondary" : "primary"} onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CustomModal;

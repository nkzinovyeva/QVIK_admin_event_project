import React, { useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { deletePresenter } from "../../redux/actions/presenters";

import "bootstrap/dist/css/bootstrap.min.css";

const DeletePresenter = (props) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deletePresenter(props.presenter.presenterId));
    handleClose();
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button onClick={handleShow} size="small" color="primary">
        DELETE
      </Button>

      <Modal
        show={show}
        aria-labelledby="contained-modal-title-vcenter"
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Confirm your action: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You are going to delete {props.presenter.name}</p>
        </Modal.Body>
        <Modal.Footer>
          <Form onSubmit={handleDelete}>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              {" "}
              Confirm{" "}
            </Button>{" "}
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              onClick={handleClose}
            >
              Cancel
            </Button>
          </Form>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeletePresenter;

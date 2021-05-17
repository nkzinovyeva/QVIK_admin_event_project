import React, { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { editPresenter } from "../../redux/actions/presenters";

import "bootstrap/dist/css/bootstrap.min.css";

export default function EditStage(props) {
  const [presenter, setPresenter] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setPresenter({
      presenterId: props.presenter.presenterId,
      name: props.presenter.name,
      contact: props.presenter.contact,
      shortDescription: props.presenter.shortDescription,
      fullDescription: props.presenter.fullDescription,
    });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setPresenter({ ...presenter, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    dispatch(editPresenter(presenter, presenter.presenterId));
    handleClose();
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log("Im here");
      handleEdit();
    }
    setValidated(true);
  };

  return (
    <>
      <Button onClick={handleShow} size="small" color="primary">
        EDIT
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Edit host's information: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group>
              <Form.Label> Name </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="name"
                label="name"
                value={presenter.name}
                onChange={handleInputChange}
                maxLength={50}
                required
              />
              <Form.Text muted>
                The name must be no more than 50 characters long.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                This field can't be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label> Contact e-mail: </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="contact"
                value={presenter.contact}
                onChange={handleInputChange}
                label="contact e-mail"
                maxLength={120}
                required
              />
              <Form.Text muted>Provide a valid e-mail address</Form.Text>
              <Form.Control.Feedback type="invalid">
                This field can't be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label> Short description: </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="shortDescription"
                label="short Description"
                value={presenter.shortDescription}
                onChange={handleInputChange}
                maxLength={120}
                required
              />
              <Form.Text muted>
                Short description must be no more than 120 characters long.
                Describe the presenter in a few words, choosing succinct and
                precise expressions.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                This field can't be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label> Full Description: </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                size="sm"
                type="text"
                name="fullDescription"
                value={presenter.fullDescription}
                onChange={handleInputChange}
                label="full Description"
                required
              />
              <Form.Control.Feedback type="invalid">
                This field can't be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              size="small"
            >
              {" "}
              Update{" "}
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
        </Modal.Body>
      </Modal>
    </>
  );
}

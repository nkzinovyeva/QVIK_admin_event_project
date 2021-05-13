import React, { useState } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addPresenter } from "../../redux/actions/presenters";

import "bootstrap/dist/css/bootstrap.min.css";

export default function AddPresenter() {
  const dispatch = useDispatch();

  const [presenter, setPresenter] = useState({
    name: "",
    contact: "",
    shortDescription: "",
    fullDescription: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setPresenter({ ...presenter, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    dispatch(addPresenter(presenter));
    handleClose();
  };

  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      handleAdd();
    }
    setValidated(true);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Add Host
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Add host: </Modal.Title>
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
                type="test"
                name="shortDescription"
                label="short Description"
                value={presenter.shortDescription}
                onChange={handleInputChange}
                maxLength={120}
                required
              />
              <Form.Text muted>
                Short description must be no more than 120 characters long.
                Describe the host in a few words, choosing succinct and precise
                expressions.
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
            <Button type="submit"> Add </Button>{" "}
            <Button variant="outline-secondary" onClick={handleClose}>
              Cancel
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

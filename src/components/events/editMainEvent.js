import React, { useEffect, useState } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useDispatch, useSelector } from "react-redux";
import { editEvent } from "../../redux/actions/events";

import "bootstrap/dist/css/bootstrap.min.css";

export default function EditMainEvent(props) {
  
  const [event, setEvent] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setEvent({
      eventId: props.event.eventId,
      startDate: props.event.startDate,
      startTime: props.event.startTime,
      endDate: props.event.endDate,
      endTime: props.event.endTime,
      title: props.event.title,
      mainEvent: props.event.mainEvent
    });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    dispatch(editEvent(event, event.eventId));
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
      <Button onClick={handleShow} size="small" variant="outlined" color="primary">
        EDIT MAIN EVENT
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Edit Main Event info: </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit} noValidate validated={validated}>
            <Form.Group>
              <Form.Label> Title: </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="title"
                label="title"
                value={event.title}
                onChange={handleInputChange}
                maxLength={30}
                required
              />
              <Form.Text muted>
                The title must be no more than 30 characters long. Choose a
                short and succinct name that accurately reflects the essence of
                the event.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                This field can't be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> Start Date: </Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="startDate"
                  label="start Date"
                  value={event.startDate}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Start Time: </Form.Label>
                <Form.Control
                  size="sm"
                  type="time"
                  name="startTime"
                  value={event.startTime}
                  label="start Time"
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> End Date: </Form.Label>
                <Form.Control
                  size="sm"
                  type="date"
                  name="endDate"
                  label="end Date"
                  value={event.endDate}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> End Time: </Form.Label>
                <Form.Control
                  size="sm"
                  type="time"
                  name="endTime"
                  value={event.endTime}
                  label="end Time"
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
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

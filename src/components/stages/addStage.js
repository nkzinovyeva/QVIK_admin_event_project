import React, { useState } from "react";
import { Modal, Form, Col, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addStage } from "../../redux/actions/stages";

import "bootstrap/dist/css/bootstrap.min.css";

export default function AddStage() {
  const dispatch = useDispatch();

  const [stage, setStage] = useState({
    //stageId: "",
    name: "",
    location: "",
    capacity: "",
    type: "",
    /*venue: {
          venueId: 10,
          name: "Suvilahti"
        },
        events:[
          {
            eventId: 45,
            startDate: "2021-05-09",
            startTime: "12:00:00",
            endDate: "2021-05-09",
            endTime: "13:00:00",
            title: "Art Business"
          }
        ]*/
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setStage({ ...stage, [e.target.name]: e.target.value });
  };

  const handleAdd = () => {
    console.log(stage);
    dispatch(addStage(stage));
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
      console.log("want to add stage");
    }
    setValidated(true);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Add Stage
      </Button>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        show={show}
        onHide={handleClose}
      >
        <Modal.Header>
          <Modal.Title>Add stage: </Modal.Title>
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
                value={stage.name}
                onChange={handleInputChange}
                maxLength={30}
                required
              />
              <Form.Text muted>
                The name for the stage must be no more than 30 characters long.
                Choose a short and succinct name that accurately reflects the
                essence of the stage.
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                This field can't be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Label> Location: </Form.Label>
              <Form.Control
                size="sm"
                type="text"
                name="location"
                value={stage.location}
                onChange={handleInputChange}
                label="location"
                maxLength={120}
                required
              />
              <Form.Text muted>
                Provide a summary description of the stage location
              </Form.Text>
              <Form.Control.Feedback type="invalid">
                This field can't be empty.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> Capacity: </Form.Label>
                <Form.Control
                  size="sm"
                  type="number"
                  name="capacity"
                  label="capacity"
                  value={stage.capacity}
                  onChange={handleInputChange}
                  required
                />
                <Form.Text muted>Provide a capacity of the stage</Form.Text>
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Type: </Form.Label>
                <Form.Control
                  size="sm"
                  as="select"
                  type="text"
                  name="type"
                  value={stage.type}
                  onChange={handleInputChange}
                  label="type"
                  required
                >
                  <option value="Small stage">Small stage</option>
                  <option value="Medium stage">Medium stage</option>
                  <option value="Big stage">Big stage</option>
                  ))
                </Form.Control>
                <Form.Text muted>Choose a type for the stage</Form.Text>
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
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

import React, {useEffect, useState} from 'react';
import { Modal, Form, Col, Button, } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { editStage } from '../../redux/actions/stages';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditStage(props) {

    const [stage, setStage] = useState({});
    const dispatch = useDispatch();
    //const editOneEvent = (event, id) => dispatch(editEvent(event, id));
    
    useEffect(() => {
        setStage({
            stageId: props.stage.stageId,
            name: props.stage.name,
            location: props.stage.location,
            capacity: props.stage.capacity,
            type: props.stage.type,
        });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setStage({...stage, [e.target.name]: e.target.value})
  }

  const handleEdit = () => {
    dispatch(editStage(stage, stage.stageId))
    handleClose();
  }
 
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    } else {
      console.log('Im here')
      handleEdit();
    }
    setValidated(true);
  };

    return (
      <>
        <Button variant="link" onClick={handleShow}>
          Edit
        </Button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title>Edit stage: </Modal.Title>
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
                  The title must be no more than 30 characters long. Choose a
                  short and succinct name that accurately reflects the essence
                  of the event.
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
                  Short description must be no more than 120 characters long.
                  Describe the event in a few words, choosing succinct and
                  precise expressions.
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
                  <Form.Control.Feedback type="invalid">
                    This field can't be empty.
                  </Form.Control.Feedback>
                </Form.Group>
              </Form.Row>
              <Button type="submit"> Update </Button>{" "}
              <Button variant="outline-secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
};
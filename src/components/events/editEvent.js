import React, {useEffect, useState} from 'react';
import { Modal, Form, Col, Button, } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { editEvent } from '../../redux/actions/events';
import { linkEventPresenter, linkEventStage } from '../../redux/actions/links'

import 'bootstrap/dist/css/bootstrap.min.css';

export default function EditEvent(props) {

    const stagesList = useSelector(state => state.stageReducer.stages)
    const presentersList = useSelector(state => state.presenterReducer.presenters)
    const [event, setEvent] = useState({});
    const dispatch = useDispatch();
    //const editOneEvent = (event, id) => dispatch(editEvent(event, id));
    
    useEffect(() => {
        setEvent({
            eventId: props.event.eventId,
            startDate: props.event.startDate,
            startTime: props.event.startTime,
            endDate: props.event.endDate,
            endTime: props.event.endTime,
            title: props.event.title, 
            shortDescription: props.event.shortDescription,
            fullDescription: props.event.fullDescription,
            stage: props.event.stage.name,
            active: props.event.active,
            mainEvent: props.event.mainEvent
        });
  }, []);

  const currentPresenters = props.event.presenters

  const [stage, setStage] = useState('');
  const [presenter, setPresenter] = useState('');

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setEvent({...event, [e.target.name]: e.target.value})
  }

  const handleEdit = () => {
    dispatch(editEvent(event, event.eventId))
    dispatch(linkEventPresenter(event.eventId, presenter.presenterId))
    dispatch(linkEventStage(event.eventId, stage.stageId ))
    handleClose();
  }
  
  const handleStageChange = e => {
    setStage(e.target.value);
  };
  const handlePresenterChange = e => {
    setPresenter(e.target.value);
  };

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

  const handleAddPresenter = () => {
    dispatch(linkEventPresenter(event.eventId, presenter.presenterId))
  }

  const handleAddStage = () => {
    dispatch(linkEventStage(event.eventId, stage.stageId))
  }

  const fromDate = useState(props.event.startDate);

  const [toDate, setToDate] = useState("");


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
            <Modal.Title>Edit sub-event info: </Modal.Title>
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
                  short and succinct name that accurately reflects the essence
                  of the event.
                </Form.Text>
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label> Short Description: </Form.Label>
                <Form.Control
                  size="sm"
                  type="text"
                  name="shortDescription"
                  value={event.shortDescription}
                  onChange={handleInputChange}
                  label="short Description"
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
                  <Form.Label> Start Date: </Form.Label>
                  <Form.Control
                    size="sm"
                    type="date"
                    name="startDate"
                    minDate={"2021-05-19T12:00:00.000Z"}
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
              <Form.Group>
                <Form.Label> Full Description: </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  size="sm"
                  type="text"
                  name="fullDescription"
                  value={event.fullDescription}
                  onChange={handleInputChange}
                  label="full Description"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Current stage:</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    defaultValue={event.stage}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label> Stage to choose: </Form.Label>
                  <Form.Control
                    size="sm"
                    as="select"
                    type="text"
                    name="stage"
                    value={stage}
                    onChange={handleStageChange}
                    label="stage"
                    required
                  >
                    {stagesList.map((stage) => (
                      <option value={stage.stageId}>{stage.name}</option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    This field can't be empty.
                  </Form.Control.Feedback>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleAddStage}
                  >
                    Save
                  </Button>
                </Form.Group>
              </Form.Row>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label>Current presenter:</Form.Label>
                  <Form.Control
                    size="sm"
                    type="text"
                    readOnly
                    defaultValue={currentPresenters.map(
                      (presenter) => " " + presenter.name
                    )}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label> Presenter to choose: </Form.Label>
                  <Form.Control
                    size="sm"
                    as="select"
                    type="text"
                    name="presenter"
                    value={presenter}
                    onChange={handlePresenterChange}
                    label="presenter"
                    required
                  >
                    {presentersList.map((presenter) => (
                      <option value={presenter.presenterId}>
                        {presenter.name}
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Control.Feedback type="invalid">
                    This field can't be empty.
                  </Form.Control.Feedback>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    onClick={handleAddPresenter}
                  >
                    Save
                  </Button>
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
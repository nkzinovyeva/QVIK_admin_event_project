import React, {useEffect, useState} from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { getStages } from '../../redux/actions/stages';
import { getPresenters } from '../../redux/actions/presenters';
import { addEvent } from '../../redux/actions/events';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function AddEvent(props) {
    const dispatch = useDispatch();

    const [event, setEvent] = useState({
        startDate: "",
        startTime: "",
        endDate: "",
        endTime: "",
        title: "",
        shortDescription: "",
        fullDescription: ""
      });
    //For the stage list
    const stagesList = useSelector(state => state.stageReducer.stages)
    const fetchStages = () => dispatch(getStages());
    const [stage, setStage] = useState('');
  

    //For the presenters list
    const presentersList = useSelector(state => state.presenterReducer.presenters)
    const fetchPresenters = () => dispatch(getPresenters());
    const [presenter, setPresenter] = useState('');

    useEffect(() => {
        fetchStages()
        fetchPresenters()
      }, []);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleInputChange = (e) => {
        setEvent({...event, [e.target.name]: e.target.value})
    }
    const handleStageChange = e => {
        setStage(e.target.value);
      };
      const handlePresenterChange = e => {
        setPresenter(e.target.value);
      };

    const handleAdd = () => {
        dispatch(addEvent(event))
        console.log("adding event");
        //props.createEvent(event, stage, presenter);
        handleClose();
    }

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
        <Button variant="light" className={"ml-3 mr-3"} onClick={handleShow}>
          Add Event
        </Button>

        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          show={show}
          onHide={handleClose}
        >
          <Modal.Header>
            <Modal.Title>Add new sub-event : </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit} noValidate validated={validated}>
              <Form.Group>
                <Form.Label> Title: </Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  label="title"
                  value={event.title}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label> Short Description: </Form.Label>
                <Form.Control
                  type="text"
                  name="shortDescription"
                  value={event.shortDescription}
                  onChange={handleInputChange}
                  label="short Description"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Label> Start Date: </Form.Label>
                  <Form.Control
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
              <Form.Group>
                <Form.Label> Stage: </Form.Label>
                    <Form.Control 
                        as="select"
                        type="text"
                        name="stage"
                        value={stage}
                        onChange={handleStageChange}
                        label="stage"
                        required  
                        >
                            {stagesList.map(stage=><option value={stage.stageId}>{stage.name}</option>)}
                    </Form.Control>
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Label> Presenter: </Form.Label>
                    <Form.Control 
                        as="select"
                        type="text"
                        name="presenter"
                        value={presenter}
                        onChange={handlePresenterChange}
                        label="presenter"
                        required  
                        >
                        {presentersList.map(presenter=><option value={presenter.presenterId}>{presenter.name}</option>)} 
                    </Form.Control>
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                </Form.Control.Feedback>
              </Form.Group>
              <Button type="submit"> Add Event </Button>{" "}
              <Button variant="outline-secondary" onClick={handleClose}>
                Cancel
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </>
    );
};
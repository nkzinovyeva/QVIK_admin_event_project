import React, { useEffect, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect, useDispatch } from "react-redux";
import { deleteEvent } from "../../redux/actions";

import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteEvent = (props) => {
  const [buttonAvailable, setButtonAvailable] = useState(false);
  useEffect(() => {
      setButtonAvailable(true);
  }, [props]);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteEvent(props.event.eventId));
    handleClose();
    setButtonAvailable(false);
  }

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (buttonAvailable) {
    return (
      <>
        <Button
          //variant="danger"
          className={'ml-3 mr-3'}
          onClick={handleShow}
        >
          Delete
        </Button>

        <Modal
          show={show}
          aria-labelledby='contained-modal-title-vcenter'
        >
          <Modal.Header>
            <Modal.Title>Confirm your action:  </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You are going to delete { props.event.title }
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Confirm
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }

  return (
    <>
      <Button
        variant="danger"
        className={'ml-3 mr-3'}
        onClick={handleShow}
        disabled
      >
        Delete
      </Button>
    </>
  );
}

export default connect(
  state => {
    return { events: state.events.eventsData }
  }, { deleteEvent }
)(DeleteEvent);
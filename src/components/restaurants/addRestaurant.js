import React, { useEffect, useState } from 'react';
import { Modal, Form, Col, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { addRestaurant } from '../../redux/actions/restaurants';

export default function AddRestaurant() {
  const dispatch = useDispatch();

  const [restaurant, setRestaurant] = useState({
    restaurantId: 0,
    name: "",
    location: "",
    openTime: "",
    closeTime: "",
    shortDescription: "",
    fullDescription: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value })
  };
  const handleAdd = () => {
    console.log(restaurant);
    dispatch(addRestaurant(restaurant))
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
      console.log("want to add restaurant");
    }
    setValidated(true);
  };

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        Add Restaurant
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
                value={restaurant.name}
                onChange={handleInputChange}
                maxLength={30}
                required
              />
              <Form.Text muted>
                The title must be no more than 30 characters long.
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
                value={restaurant.location}
                onChange={handleInputChange}
                label="location"
                maxLength={120}
                required
              />
              <Form.Control.Feedback type="invalid">
                This field can't be empty.
                  </Form.Control.Feedback>
            </Form.Group>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label> Open Time: </Form.Label>
                <Form.Control
                  type="time"
                  name="openTime"
                  label="open time"
                  value={restaurant.openTime}
                  onChange={handleInputChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                    </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label> Close Time: </Form.Label>
                <Form.Control
                  type="time"
                  name="closeTime"
                  value={restaurant.closeTime}
                  label="close time"
                  onChange={handleInputChange}
                  required
                />

                <Form.Control.Feedback type="invalid">
                  This field can't be empty.
                    </Form.Control.Feedback>
              </Form.Group>
              </Form.Row>
              <Form.Group>
                <Form.Label> Short Description: </Form.Label>
                <Form.Control
                  type="text"
                  name="shortDescription"
                  value={restaurant.shortDescription}
                  onChange={handleInputChange}
                  label="short Description"
                  maxLength={120}
                  required
                />
                <Form.Text muted>
                  Short description must be no more than 120 characters long.
                  Describe the restaurant in a few words, choosing succinct and precise expressions.
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
                  value={restaurant.fullDescription}
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
import React, { useEffect, useState } from "react";
import { Modal, Form, Col } from "react-bootstrap";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { editRestaurant } from "../../redux/actions/restaurants";
import "bootstrap/dist/css/bootstrap.min.css";

export default function EditRestaurant(props) {
  const [restaurant, setRestaurant] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    setRestaurant({
      restaurantId: props.rest.restaurantId,
      name: props.rest.name,
      location: props.rest.location,
      openTime: props.rest.openTime,
      closeTime: props.rest.closeTime,
      shortDescription: props.rest.shortDescription,
      fullDescription: props.rest.fullDescription,
    });
  }, []);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleInputChange = (e) => {
    setRestaurant({ ...restaurant, [e.target.name]: e.target.value });
  };

  const handleEdit = () => {
    dispatch(editRestaurant(restaurant, restaurant.restaurantId));
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
          <Modal.Title>Edit Restaurant: </Modal.Title>
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
                The title must be no more than 30 characters long. Choose a
                short and succinct name that accurately reflects the essence of
                the event.
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
              <Form.Text muted>
                Short description must be no more than 120 characters long.
                Describe the event in a few words, choosing succinct and precise
                expressions.
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
                value={restaurant.shortDescription}
                onChange={handleInputChange}
                label="short Description"
                maxLength={120}
                required
              />
              <Form.Text muted>
                Short description must be no more than 120 characters long.
                Describe the event in a few words, choosing succinct and precise
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
                value={restaurant.fullDescription}
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
                <Form.Label> Open Time: </Form.Label>
                <Form.Control
                  size="sm"
                  type="time"
                  name="openTime"
                  value={restaurant.openTime}
                  label="open Time"
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
                  size="sm"
                  type="time"
                  name="closeTime"
                  value={restaurant.closeTime}
                  label="close Time"
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

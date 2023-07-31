import { useEffect, useState } from "react";
import { Form, InputGroup, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { putUser } from "../services/UserService";

function EditUserModal(props) {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    setFirstName(props.firstName);
    setLastName(props.lastName);
    setEmail(props.email);
  }, [props.firstName, props.lastName, props.email]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEdit = async () => {
    const res = await putUser(firstName, lastName, email, props.userId);
    console.log(res);
    handleClose();
    setShowToast(true);
    props.reloadData(props.currentPage);
  };

  return (
    <>
      <Button className="btn btn-warning me-3" onClick={handleShow}>
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                First Name:
              </InputGroup.Text>
              <Form.Control
                aria-label="Name"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Type your name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Last Name:
              </InputGroup.Text>
              <Form.Control
                aria-label="Name"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Type your name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </InputGroup>

            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Email:
              </InputGroup.Text>
              <Form.Control
                aria-label="Job"
                aria-describedby="inputGroup-sizing-default"
                placeholder="Type your job"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        bg="success"
        className=" position-absolute top-0 end-0"
      >
        <Toast.Header>
          <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
          <strong className="me-auto">Notification</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>Update user successfull!</Toast.Body>
      </Toast>
    </>
  );
}

export default EditUserModal;

import { useState } from "react";
import { Form, InputGroup, Toast } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { postNewUser } from "../services/UserService";
import { AiOutlinePlusCircle } from "./icons";
import { useNavigate } from "react-router-dom";

function AddUserModal() {
    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleSubmit = async () => {
        try {
            const res = await postNewUser(firstName, lastName, email);
            console.log(res);
            handleClose();
            setEmail("");
            setFirstName("");
            setLastName("");
            setShowToast(true);
        } catch (error) {
            if (error && error.response.data.message === "jwt expired")
                navigate("/login");
        }
    };
    return (
        <>
            <Button className="btn btn-success" onClick={handleShow}>
                <AiOutlinePlusCircle className="fs-6 mb-1" /> Add user
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
                    <Button variant="primary" onClick={handleSubmit}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                bg="success"
                className=" position-absolute top-10 end-0"
            >
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Notification</strong>
                    <small>just now</small>
                </Toast.Header>
                <Toast.Body>Add user successfull!</Toast.Body>
            </Toast>
        </>
    );
}

export default AddUserModal;

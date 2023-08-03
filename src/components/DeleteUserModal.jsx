import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUser } from "../services/UserService";
import { Toast } from "react-bootstrap";

function DeleteUserModal(props) {
    const [show, setShow] = useState(false);
    const [showToast, setShowToast] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleDelete = async () => {
        const res = await deleteUser(props.userId);
        console.log(props.userId);
        console.log(res);
        handleClose();
        setShowToast(true);
        props.reloadTable();
    };
    return (
        <>
            <Button className="btn btn-danger me-3" onClick={handleShow}>
                Delete
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Do you want to delete this user?</p>
                    <strong>
                        name: {props.firstName} -- Gmail: {props.email}
                    </strong>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Delete
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
                <Toast.Body>Delete user successfull!</Toast.Body>
            </Toast>
        </>
    );
}

export default DeleteUserModal;

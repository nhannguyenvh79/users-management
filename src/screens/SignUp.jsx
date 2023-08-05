import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

function SignUp() {
    return (
        <Container className="min-vh-70 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-primary">Sign Up</h2>
            <Form className=" form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address:</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Type your password again"
                    />
                </Form.Group>
                <Link className="d-block my-2 text-primary" to="/login">
                    Already have an account?
                </Link>

                <Button variant="primary" type="submit">
                    Sign Up
                </Button>
            </Form>
        </Container>
    );
}

export default SignUp;

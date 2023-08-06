import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { logIn } from "../services/LoginService";
import { useContext } from "react";
import { LogInConText } from "../context/LogInContext";
import { useEffect } from "react";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const { setLogInValue, resetLogIn } = useContext(LogInConText);

    useEffect(() => {
        resetLogIn();
    }, []);

    const handleLogIn = async () => {
        try {
            const res = await logIn(email, password);
            setLogInValue(res);
            setError("");
            localStorage.setItem("accessToken", res.accessToken);
            navigate("/");
        } catch (error) {
            setError(error.response.data.message);
        }
    };
    return (
        <Container className="min-vh-70 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-secondary">Log In</h2>
            <Form className=" form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Link className="d-block my-2 text-primary" to="/signup">
                    Don't have an account yet?
                </Link>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                        handleLogIn();
                        e.preventDefault();
                    }}
                >
                    Log In
                </Button>
            </Form>
            {error && <div className="text-danger">{error}!</div>}
        </Container>
    );
}

export default LogIn;

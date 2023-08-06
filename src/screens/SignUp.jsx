import { useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import { signUp, signUpConfirm } from "../services/SignUpService";
import { useEffect } from "react";

function SignUp() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const [tokenSignUp, setTokenSignUp] = useState("");
    const [error, setError] = useState("");
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        if (seconds > 1) {
            const timer = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timer);
        } else {
        }
    }, [seconds]);

    const handleSignUp = async () => {
        if (password && password === rePassword) {
            try {
                const res = await signUp(email, password);
                if (!res.signUpToken) {
                    throw new Error(res.message);
                } else {
                    setTokenSignUp(res.signUpToken);
                    setSeconds(30);
                    setError("");
                }
            } catch (err) {
                setError(err.message);
            }
        } else if (password === "") {
            setError("please enter password");
        } else {
            setError("please enter the same password");
        }
    };

    const confirmSignUp = async () => {
        if (seconds > 1)
            window.alert(
                "Signup successfulSignup successfu! Please Login to use services!"
            );
        setSeconds(0);
        try {
            const res = await signUpConfirm(email, password, tokenSignUp);
            setTokenSignUp("");
            setError("");
        } catch (err) {
            console.log(err);
            setError("Please Signup again!");
            setTokenSignUp("");
        }
    };
    return (
        <Container className="min-vh-70 d-flex flex-column justify-content-center align-items-center">
            <h2 className="text-primary">Sign Up</h2>
            <Form className=" form">
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address:</Form.Label>
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
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Confirm Password:</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Type your password again"
                        required
                        onChange={(e) => setRePassword(e.target.value)}
                    />
                </Form.Group>
                <Link className="d-block my-2 text-primary" to="/login">
                    Already have an account?
                </Link>

                <Button
                    variant="primary"
                    type="submit"
                    onClick={(e) => {
                        handleSignUp();
                        e.preventDefault();
                    }}
                >
                    Sign Up
                </Button>
                {error && <div className="text-danger">{error}!</div>}
            </Form>
            {seconds ? (
                <>
                    <p>{`Please confirm account after ${seconds}s`}</p>
                    <button className="btn btn-success" onClick={confirmSignUp}>
                        Confirm
                    </button>
                </>
            ) : (
                <></>
            )}
        </Container>
    );
}

export default SignUp;

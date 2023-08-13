import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import img192 from "../assets/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "./icons";
import { useContext } from "react";
import { LogInConText } from "../context/LogInContext";

export default function Header() {
    const navigate = useNavigate();

    const activeClass = (params) => {
        return params.isActive ? "active-item" : "";
    };

    const { logInValue, resetLogIn } = useContext(LogInConText);
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img style={{ width: 40 }} src={img192} alt="img192" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto d-flex gap-3">
                            <NavLink to="/" className={activeClass}>
                                Home
                            </NavLink>
                            <NavLink to="/userlist" className={activeClass}>
                                Manage User
                            </NavLink>
                        </Nav>
                        <Nav className="my-3">
                            {!logInValue.account.email ? (
                                <NavLink to="/login" className={activeClass}>
                                    Log In
                                </NavLink>
                            ) : (
                                <NavDropdown
                                    title={logInValue.account.email}
                                    id="basic-nav-dropdown"
                                >
                                    <NavDropdown.Item
                                        className="text-danger"
                                        onClick={() => {
                                            navigate("/login");
                                            resetLogIn();
                                        }}
                                    >
                                        Log Out <FiLogOut />
                                    </NavDropdown.Item>
                                </NavDropdown>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import img192 from "../assets/logo192.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FiLogOut } from "./icons";

export default function Header() {
    const navigate = useNavigate();
    const activeClass = (params) => {
        return params.isActive ? "active-item" : "";
    };
    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/">
                        <img style={{ width: 40 }} src={img192} alt="img192" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto d-flex gap-20">
                            <NavLink to="/" className={activeClass}>
                                Home
                            </NavLink>
                            <NavLink to="/userlist" className={activeClass}>
                                Manage User
                            </NavLink>
                        </Nav>
                        <Nav>
                            <NavDropdown
                                title="Name..."
                                id="basic-nav-dropdown"
                            >
                                <NavDropdown.Item
                                    onClick={() => navigate("/login")}
                                >
                                    Log In
                                </NavDropdown.Item>
                                <NavDropdown.Item
                                    className="text-danger"
                                    onClick={() => navigate("/login")}
                                >
                                    Log Out <FiLogOut />
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    );
}

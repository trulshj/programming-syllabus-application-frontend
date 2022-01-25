import React, { useContext, useState } from "react";
import {
    Navbar,
    Nav,
    NavDropdown,
    Form,
    FormControl,
    Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserStatusContext } from "../../App";

export default function NavBar() {
    const [search, setSearch] = useState("");

    // kode copied from
    // https://stackoverflow.com/questions/45711927/how-to-avoid-submitting-in-the-form-of-react-bootstrap-validation-when-press-the
    function keyDownEvent(event) {
        //key 13 is enter-key
        if (event.keyCode === 13) {
            event.preventDefault();
        }
    }

    const userStatus = useContext(UserStatusContext);

    return (
        <div className="navBar">
            <Navbar collapseOnSelect expand="lg" bg="blue" variant="dark">
                <Navbar.Brand href="/">NTNU</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                        <NavDropdown
                            title="Temasider"
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown
                            title="Årstrinn"
                            id="collasible-nav-dropdown"
                        >
                            <NavDropdown.Item href="#action/3.1">
                                Action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">
                                Something
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>

                    <Form onKeyDown={keyDownEvent} inline>
                        <FormControl
                            type="text"
                            placeholder="Søk"
                            className="mr-sm-2"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <Link to={"/search/" + search}>
                            <Button variant="outline-light">Søk</Button>
                        </Link>
                    </Form>
                    <Nav>
                        {userStatus[0] ? (
                            <Nav.Link
                                style={{ color: "#ffff" }}
                                href="/usermeny"
                            >
                                {" "}
                                HovedMeny
                            </Nav.Link>
                        ) : null}
                        {userStatus[0] ? (
                            <Nav.Link href="/loggout">Logg ut</Nav.Link>
                        ) : null}
                    </Nav>
                    <Nav>
                        {userStatus[0] ? null : (
                            <Nav.Link href="/registration">Ny bruker</Nav.Link>
                        )}
                        {userStatus[0] ? null : (
                            <Nav.Link href="/logginn">Logg inn </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

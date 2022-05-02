import { useContext, useState } from "react";
import { Navbar, Nav, Form, FormControl, Button, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { UserStatusContext } from "../../App";
import { logout } from "../../api/userData.service";

import ntnuLogo from "../../logo_ntnu.svg";

export default function NavBar() {
    const [search, setSearch] = useState("");

    // kode copied from
    // https://stackoverflow.com/questions/45711927/how-to-avoid-submitting-in-the-form-of-react-bootstrap-validation-when-press-the
    function keyDownEvent(event) {
        //key 13 is enter-key
        if (event.keyCode === 13) {
            //event.preventDefault();
        }
    }

    const userStatus = useContext(UserStatusContext);

    return (
        <div className="navBar">
            <Navbar collapseOnSelect expand="lg" bg="white">
                <Navbar.Brand href="/">
                    <Image src={ntnuLogo} fluid></Image>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Form onKeyDown={keyDownEvent} className="d-flex">
                        <FormControl
                            type="text"
                            placeholder="Søk"
                            className="mr-sm-2"
                            onChange={(e) => {
                                setSearch(e.target.value);
                            }}
                        />
                        <Link to={"/articles"}>
                            <Button>Søk</Button>
                        </Link>
                    </Form>
                    <Nav className="ml-sm-5">
                        {userStatus[0] ? (
                            <Nav.Link href="/user" className="font-weight-bold">
                                {" "}
                                Min bruker
                            </Nav.Link>
                        ) : null}
                        {userStatus[0] ? (
                            <Nav.Link
                                onClick={logout}
                                className="font-weight-bold"
                            >
                                Logg ut
                            </Nav.Link>
                        ) : null}
                        {userStatus[0] ? null : (
                            <Nav.Link
                                href="/registration"
                                className="font-weight-bold"
                            >
                                Ny bruker
                            </Nav.Link>
                        )}
                        {userStatus[0] ? null : (
                            <Nav.Link
                                href="/login"
                                className="font-weight-bold"
                            >
                                Logg inn{" "}
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
}

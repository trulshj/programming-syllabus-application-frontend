import { useContext } from "react";
import { Navbar, Nav, Form, FormControl, Button, Image } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import "./NavBar.css";
import { UserStatusContext } from "../../App";
import { logout } from "../../api/userData.service";

import ntnuLogo from "../../logo_ntnu.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
    const history = useHistory();
    const userStatus = useContext(UserStatusContext);

    function handleSubmit(e: any) {
        e.preventDefault();

        history.push(`/articles?search=${e.target.searchText.value}`);
    }

    return (
        <div className="navBar">
            <Navbar collapseOnSelect expand="md" bg="white">
                <Navbar.Brand href="/">
                    <Image src={ntnuLogo} fluid></Image>
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Form
                        onSubmit={handleSubmit}
                        className="d-flex mt-3 mt-md-0"
                    >
                        <FormControl
                            id="searchText"
                            name="searchText"
                            type="text"
                            placeholder="Søk"
                            className="mr-sm-2"
                        />
                        <Button type="submit">
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Button>
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

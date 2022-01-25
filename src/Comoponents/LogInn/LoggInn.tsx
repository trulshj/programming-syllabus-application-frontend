import React, { useContext, useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import LoggImage from "../../LoggInn.jpg";
import { login } from "../../Api";
import { UserStatusContext } from "../../App";

const LoggInn = (props) => {
    const userStatus = useContext(UserStatusContext);
    const setUserStatus = userStatus[1];
    const [error, setError] = useState(false);

    let email = "";
    let password = "";

    function keyDownEvent(event) {
        //key 13 is enter-key
        if (event.keyCode === 13) {
            event.preventDefault();
            login(email, password)
                .then((res) => {
                    if (res) {
                        localStorage.setItem("userId", res.user.user_id);
                        localStorage.setItem("username", res.user.username);
                        localStorage.setItem("email", res.user.email);
                        localStorage.setItem("roleId", res.user.role_id);
                        localStorage.setItem("updatedAt", res.user.updatedAt);
                        setUserStatus(true);
                        props.history.push("/");
                    }
                })
                .catch((error) => {
                    console.error(error);
                    setError(true);
                });
        }
    }

    return (
        <div>
            <br />
            <br />
            <br />
            <Row>
                <Col>
                    <h3 className="text-info">Logg inn</h3>
                    <Form
                        onKeyDown={keyDownEvent}
                        style={{
                            width: "50%",
                            marginLeft: "30%",
                            marginTop: "10%",
                        }}
                    >
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label style={{ float: "left" }}>
                                Email address
                            </Form.Label>
                            <Form.Control
                                type="email"
                                onChange={(event) => {
                                    email = event.target.value;
                                }}
                                placeholder="Email adresse"
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label style={{ float: "left" }}>
                                Passord
                            </Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Passord"
                                onChange={(evnet) => {
                                    password = evnet.target.value;
                                }}
                            />
                            <div className="text-info" hidden={!error}>
                                Feil epost eller passord
                            </div>
                        </Form.Group>

                        <Button
                            variant="primary"
                            onClick={(e) => {
                                keyDownEvent({
                                    keyCode: 13,
                                    preventDefault: () => {},
                                });
                            }}
                        >
                            Logg inn
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <Image
                        src={LoggImage}
                        thumbnail
                        style={{ border: "none" }}
                    ></Image>
                </Col>
            </Row>
        </div>
    );
};

export default LoggInn;

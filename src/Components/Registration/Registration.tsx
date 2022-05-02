import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { registration } from "../../api/userData.service";

const Registration = (props) => {
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    function handleSubmit(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const passwordConfirm = event.target.passwordConfirm.value;

        if (!username || !email || password !== passwordConfirm) {
            setErrorMessage("Passordene samsvarer ikke");
        }

        registration(username, email, password)
            .then((res) => {
                setErrorMessage(undefined);
                console.log(res);
                props.history.push("/login");
            })
            .catch((err) => {
                console.log(err);
                setErrorMessage(err.message);
            });
    }

    return (
        <div>
            <Row>
                <Col>
                    <h3>Lag ny bruker</h3>
                    <Alert variant="danger" hidden={!errorMessage}>
                        {errorMessage}
                    </Alert>
                    <Form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                        <Form.Group controlId="username">
                            <Form.Label style={{ float: "left" }}>
                                Brukernavn
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ditt navn"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label style={{ float: "left" }}>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="eksempel@epost.no"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
                            <Form.Label style={{ float: "left" }}>
                                Passord
                            </Form.Label>
                            <Form.Control type="password" required />
                        </Form.Group>

                        <Form.Group controlId="passwordConfirm">
                            <Form.Label style={{ float: "left" }}>
                                Bekreft Passord
                            </Form.Label>
                            <Form.Control type="password" required />
                        </Form.Group>
                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-5"
                        >
                            Registrer Bruker
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="py-4">
                <Col>
                    Har du allerede en konto? <a href="/login">Logg inn her!</a>
                </Col>
            </Row>
        </div>
    );
};

export default Registration;

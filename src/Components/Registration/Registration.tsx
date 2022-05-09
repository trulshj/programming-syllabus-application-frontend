import React, { useState } from "react";
import { Form, Button, Row, Col, Alert } from "react-bootstrap";
import { registration } from "../../api/userData.service";
import "./Registration.css";

const Registration = (props) => {
    const [strength, setStrength] = useState(0);
    const [showPassword, setShowPassword] = useState(false);
    const [validations, setValidations] = useState([
        false,
        false,
        false,
        false,
    ]);

    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );

    function validatePassword(event: any) {
        const password = event.target.value;

        const currValidations = [
            password.length > 5,
            password.search(/[A-Z]/) > -1,
            password.search(/[0-9]/) > -1,
            password.search(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/) > -1,
        ];
        setValidations(currValidations);

        const currStrength = currValidations.filter((x) => x).length;
        setStrength(currStrength);
    }

    function handleSubmit(event) {
        event.preventDefault();

        const username = event.target.username.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const passwordConfirm = event.target.passwordConfirm.value;

        if (password !== passwordConfirm) {
            setErrorMessage("Passordene samsvarer ikke");
            return;
        }

        if (strength < 4) {
            setErrorMessage("Passordet er for svakt");
            return;
        }

        registration(username, email, password)
            .then((res) => {
                setErrorMessage(undefined);
                props.history.push("/login");
            })
            .catch((err) => {
                console.error(err);
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
                        <Form.Group controlId="username" className="mb-3">
                            <Form.Label style={{ float: "left" }}>
                                Brukernavn
                            </Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Ditt navn"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="email" className="mb-3">
                            <Form.Label style={{ float: "left" }}>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="eksempel@epost.no"
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="password" className="mb-3">
                            <Form.Label style={{ float: "left" }}>
                                Passord{" "}
                                <span
                                    onMouseEnter={() => setShowPassword(true)}
                                    onMouseLeave={() => setShowPassword(false)}
                                >
                                    {showPassword ? "🙈" : "👁️"}
                                </span>
                            </Form.Label>
                            <Form.Control
                                type={showPassword ? "text" : "password"}
                                required
                                onChange={validatePassword}
                            />
                        </Form.Group>

                        <Form.Group
                            controlId="passwordConfirm"
                            className="mb-3"
                        >
                            <Form.Label style={{ float: "left" }}>
                                Bekreft Passord
                            </Form.Label>
                            <Form.Control type="password" required />
                        </Form.Group>

                        <label
                            htmlFor="passwordStrength"
                            className="w-100 text-left"
                        >
                            Passord-styrke
                        </label>
                        <div className="strength mt-0" id="passwordStrength">
                            <span
                                className={
                                    "bar bar-1" +
                                    (strength > 0 ? " bar-show" : "")
                                }
                            ></span>
                            <span
                                className={
                                    "bar bar-2" +
                                    (strength > 1 ? " bar-show" : "")
                                }
                            ></span>
                            <span
                                className={
                                    "bar bar-3" +
                                    (strength > 2 ? " bar-show" : "")
                                }
                            ></span>
                            <span
                                className={
                                    "bar bar-4" +
                                    (strength > 3 ? " bar-show" : "")
                                }
                            ></span>
                        </div>

                        <ul className="password-checks text-left pt-3">
                            <li>
                                {validations[0] ? "✔️" : "❌"} Er lengre enn 5
                                tegn
                            </li>
                            <li>
                                {validations[1] ? "✔️" : "❌"} Inneholder minst
                                1 stor bokstav
                            </li>
                            <li>
                                {validations[2] ? "✔️" : "❌"} Inneholder minst
                                1 tall
                            </li>
                            <li>
                                {validations[3] ? "✔️" : "❌"} Inneholder minst
                                1 av tegnene:{" "}
                                {"!\"#$%&'()*+,-./:;<=>?@[]^_`{|}~"}
                            </li>
                        </ul>

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

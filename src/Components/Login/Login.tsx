import { useContext, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { login } from "../../api/userData.service";
import { UserStatusContext } from "../../App";

const Login = (props) => {
    const userStatus = useContext(UserStatusContext);
    const setUserStatus = userStatus[1];
    const [error, setError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        login(event.target.email.value, event.target.password.value)
            .then((res) => {
                if (res) {
                    localStorage.setItem("userId", res.id);
                    localStorage.setItem("username", res.username);
                    localStorage.setItem("email", res.email);
                    localStorage.setItem("roleId", res.roleId.toString());
                    setUserStatus(true);
                    props.history.push("/");
                }
            })
            .catch((error) => {
                console.error(error);
                setError(true);
            });
    }

    return (
        <div>
            <Row>
                <Col>
                    <h3>Logg inn</h3>
                    <Form onSubmit={handleSubmit} className="col-md-6 mx-auto">
                        <Form.Group className="mb-3" controlId="email">
                            <Form.Label style={{ float: "left" }}>
                                Email
                            </Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="eksempel@epost.no"
                            />
                        </Form.Group>

                        <Form.Group controlId="password">
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
                            />
                            <div className="text-info" hidden={!error}>
                                Feil epost eller passord
                            </div>
                        </Form.Group>

                        <Button
                            variant="primary"
                            type="submit"
                            className="mt-5"
                        >
                            Logg inn
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row className="py-4">
                <Col>
                    Vil du lage ny bruker?{" "}
                    <a href="/registration">Registrer deg her!</a>
                </Col>
            </Row>
        </div>
    );
};

export default Login;

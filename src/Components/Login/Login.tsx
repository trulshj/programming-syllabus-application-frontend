import { useContext, useState } from "react";
import { Form, Button, Row, Col, Image } from "react-bootstrap";
import LoggImage from "../../LoggInn.jpg";
import { UserStatusContext } from "../../App";
import { login } from "../../api/userData.service";

const Login = (props) => {
    const userStatus = useContext(UserStatusContext);
    const setUserStatus = userStatus[1];
    const [error, setError] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();

        login(event.target.email.value, event.target.password.value)
            .then((res) => {
                console.log(res);
                if (res) {
                    localStorage.setItem("userId", res.id);
                    localStorage.setItem("username", res.username);
                    localStorage.setItem("email", res.email);
                    localStorage.setItem("roleId", res.roleId.toString());
                    localStorage.setItem("updatedAt", res.updatedAt.toString());
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
            <h3>Logg inn</h3>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="email">
                    <Form.Label style={{ float: "left" }}>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="eksempel@epost.no"
                    />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label style={{ float: "left" }}>Passord</Form.Label>
                    <Form.Control type="password" />
                    <div className="text-info" hidden={!error}>
                        Feil epost eller passord
                    </div>
                </Form.Group>

                <Button variant="primary" type="submit">
                    Logg inn
                </Button>
            </Form>
        </div>
    );
};

export default Login;

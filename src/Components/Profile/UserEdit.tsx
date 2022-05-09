import { useEffect, useRef, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { updateLanguageServiceSourceFile } from "typescript";
import { getUser, updateUser } from "../../api/userData.service";
import { User } from "../../types/User";

export default function UserEdit() {
    const [user, setUser] = useState<User>();
    const formRef = useRef<HTMLFormElement>(null);

    const history = useHistory();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            window.location.href = "/login";
            return;
        }

        if (user === undefined) {
            getUser(userId).then((res) => {
                setUser(res);
                const form = formRef.current as any;
                form.username.value = res.username;
                form.email.value = res.email;
            });
        }
    });

    const handleSubmit = (event: any) => {
        event.preventDefault();

        if (!user?.id) {
            return;
        }

        updateUser(
            user?.id,
            event.target.username.value,
            event.target.email.value,
            event.target.password.value
        )
            .then((res) => {
                if (res) {
                    history.push("/user");
                }
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <Container>
            <h1 className="my-3">Rediger bruker</h1>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <Form.Group controlId="username" className="mb-3">
                    <Form.Label>Brukernavn</Form.Label>
                    <Form.Control />
                </Form.Group>

                <Form.Group controlId="email" className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" />
                </Form.Group>

                <Form.Group controlId="password" className="mb-3">
                    <Form.Label>Nytt Passord</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Form.Group controlId="passwordConfirm" className="mb-3">
                    <Form.Label>Bekreft passord</Form.Label>
                    <Form.Control type="password" />
                </Form.Group>

                <Button type="submit">Lagre</Button>
            </Form>
        </Container>
    );
}

import { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, BrowserRouter } from "react-router-dom";
import { getUser } from "../../api/userData.service";
import { User } from "../../types/User";
export default function Profile() {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            window.location.href = "/login";
            return;
        }

        if (user === undefined) {
            getUser(userId).then((res) => {
                setUser(res);
            });
        }
    });

    return (
        <BrowserRouter forceRefresh={true}>
            <div className="py-5">
                <Container>
                    <h3>Heisann {user?.username}</h3>
                    <h5>Epost: {user?.email}</h5>
                </Container>
                <Container className="d-flex flex-column">
                    <Link to="/user/articles">
                        <Button
                            className="w-50 mx-auto my-4"
                            variant="secondary"
                            size="lg"
                        >
                            Mine undervisningsopplegg
                        </Button>
                    </Link>
                    <Link to="/articles/new">
                        <Button
                            className="w-50 mx-auto my-4"
                            variant="secondary"
                            size="lg"
                        >
                            Lag et nytt undervisningsopplegg
                        </Button>
                    </Link>
                    <Link to="/">
                        <Button
                            className="w-50 mx-auto my-4"
                            variant="secondary"
                            size="lg"
                        >
                            Til Hovedsiden
                        </Button>
                    </Link>
                </Container>
            </div>
        </BrowserRouter>
    );
}

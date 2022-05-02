import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, BrowserRouter } from "react-router-dom";
export default class RegisteredUserMeny extends Component {
    componentDidMount() {
        if (!localStorage.getItem("userId")) {
            window.location.href = "/login";
        }
    }
    render() {
        return (
            <BrowserRouter>
                <div className="py-5">
                    <Container className="d-flex flex-column">
                        <Button
                            className="w-50 mx-auto my-4"
                            onClick={() => {
                                window.location.href =
                                    "/articlelist/myarticles";
                            }}
                            variant="secondary"
                            size="lg"
                        >
                            Mine undervisningsopplegg
                        </Button>
                        <Link to="/NewArticle">
                            <Button
                                className="w-50 mx-auto my-4"
                                onClick={() => {
                                    window.location.href = "/NewArticle";
                                }}
                                variant="secondary"
                                size="lg"
                            >
                                Lag et nytt undervisningsopplegg
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button
                                className="w-50 mx-auto my-4"
                                onClick={() => {
                                    window.location.href = "/";
                                }}
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
}

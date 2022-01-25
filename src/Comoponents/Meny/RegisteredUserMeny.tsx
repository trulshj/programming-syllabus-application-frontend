import React, { Component } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, BrowserRouter } from "react-router-dom";
import "./RegisteredUserMeny.css";
export default class RegisteredUserMeny extends Component {
    componentDidMount() {
        if (!localStorage.getItem("userId")) {
            window.location.href = "/logginn";
        }
    }
    render() {
        return (
            <BrowserRouter>
                <div className="parent">
                    <Container>
                        <Button
                            style={{
                                width: "50%",
                                marginLeft: "auto",
                                marginRight: "auto",
                                marginTop: "5%",
                            }}
                            onClick={() => {
                                window.location.href =
                                    "/articlelist/myarticles";
                            }}
                            variant="secondary"
                            size="lg"
                            block
                        >
                            Mine undervisningsopplegg
                        </Button>
                        <Link to="/NewArticle">
                            <Button
                                style={{
                                    width: "50%",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: "5%",
                                }}
                                onClick={() => {
                                    window.location.href = "/NewArticle";
                                }}
                                variant="secondary"
                                size="lg"
                                block
                            >
                                Lag et nytt undervisningsopplegg
                            </Button>
                        </Link>
                        <Link to="/">
                            <Button
                                style={{
                                    width: "50%",
                                    marginLeft: "auto",
                                    marginRight: "auto",
                                    marginTop: "5%",
                                }}
                                onClick={() => {
                                    window.location.href = "/";
                                }}
                                variant="secondary"
                                size="lg"
                                block
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

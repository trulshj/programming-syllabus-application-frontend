import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button, Image } from "react-bootstrap";
import ntnu from "../../ntnu.jpg";

type Props = {
    start: any;
};

const Home: React.FC<Props> = ({ start }) => {
    return (
        <>
            <div className="overlay"></div>
            <div className="home h-100 w-100 d-flex flex-column align-items-center justify-content-center">
                <div className="home-content mx-auto text-center">
                    <h1 className="home-title">
                        Gi ditt bidrag for å hjelpe fremtidens utviklere!
                    </h1>
                    <div className="home-text">
                        La deg inspirere av andres undervisningsopplegg
                    </div>
                    <Link to="/articles">
                        <Button className="btn-primary" onClick={start}>
                            Se alle opplegg
                        </Button>
                    </Link>
                </div>
            </div>
        </>
    );
};

export default Home;

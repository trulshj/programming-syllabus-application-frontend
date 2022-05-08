import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

type Props = {
    start: any;
};

const Home: React.FC<Props> = ({ start }) => {
    return (
        <div className="home">
            <div className="overlay">
                <div className="home-content">
                    <h1 className="home-title">
                        Gi ditt bidrag for å hjelpe fremtidens utviklere!
                    </h1>
                    <div className="home-text">
                        La deg inspirere av andres undervisningsopplegg
                    </div>
                    <Link to="/articles">
                        <Button className="btn-primary" onClick={start}>
                            Utforsk
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;

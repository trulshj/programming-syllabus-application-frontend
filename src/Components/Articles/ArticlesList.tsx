import React, { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col, Form, FormGroup } from "react-bootstrap";
import { Article } from "../../types/Article";
import { Link } from "react-router-dom";
import ntnu from "../../ntnu.jpg";
import "./ArticlesList.css";
import {
    fetchArticles,
    fetchArticlesByUser,
    searchArticles,
} from "../../api/article.service";
import { getTimeDiff } from "../../lib/Helpers";

const ArticlesList = ({ match }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const maxTitleLength = 25;
    const maxDescriptionLength = 175;

    useEffect(() => {
        async function fetchData() {
            let newArticles: Article[];
            // deciding the type of articles
            if (window.location.pathname === "/articlelist/myarticles") {
                newArticles = await fetchArticlesByUser(
                    localStorage.getItem("userId") || ""
                );
            } else if (window.location.pathname.startsWith("/search/")) {
                //searching for articles
                newArticles = await searchArticles(match.params.id);
            } else {
                //regular article list view
                newArticles = await fetchArticles();
            }
            setArticles(newArticles);
        }
        fetchData();
    }, [match.params.id]);

    return (
        <div>
            <Container fluid>
                <Row>
                    {/* Filter column */}
                    <Col className="filtercolumn" sm={3} md={3}>
                        <h1 className="mt-4 mb-5 font-weight-light">Filter</h1>
                        <Form >
                            <FormGroup className="mb-5" controlId="yearControl">
                                <Form.Label className="col-md-10 col-sm-10 lead">
                                    Årstrinn
                                </Form.Label>
                                <Form.Select className="col-md-10 col-sm-10 rounded font-weight-light" aria-label="Year">
                                    <option>Velg...</option>
                                    <option value="1">1.klasse</option>
                                    <option value="2">2.klasse</option>
                                    <option value="3">3.klasse</option>
                                </Form.Select>
                            </FormGroup>
                            <FormGroup className="mb-5" controlId="subjectControl">
                                <Form.Label className="col-md-10 col-sm-10 lead">
                                    Fagområde
                                </Form.Label>
                                <Form.Select className="col-md-10 col-sm-10 rounded font-weight-light" aria-label="Subject" >
                                    <option>Velg...</option>
                                    <option value="math">Matematikk</option>
                                    <option value="physics">Fysikk</option>
                                    <option value="chemistry">Kemi</option>
                                </Form.Select>
                            </FormGroup>
                            <FormGroup className="mb-5" controlId="toolControl">
                                <Form.Label className="col-md-10 col-sm-10 lead">
                                    Verktøy
                                </Form.Label>
                                <Form.Select className="col-md-10 col-sm-10 rounded font-weight-light" aria-label="Tools">
                                    <option>Velg...</option>
                                    <option value="python">Python</option>
                                    <option value="js">JavaScript</option>
                                </Form.Select>
                            </FormGroup>
                            <FormGroup className="mb-5" controlId="timeControl">
                                <Form.Label className="col-md-10 col-sm-10 lead">
                                    Tidsbruk
                                </Form.Label>
                                <>
                                    <Form.Range className="col-md-10 col-sm-10" aria-label="Time usage"/>
                                </>
                            </FormGroup>
                        </Form>
                    </Col>

                    {/* Article column */}
                    <Col className="border-left" sm={9} md={9}>
                        <h1 className="mt-4 mb-5 font-weight-light">Undervisningsopplegg</h1>    
                        {!articles
                            ? null
                            : articles.map((article, idx) => (
                                <Row className="col-md-6 m-3" key={idx}>
                                    <Card >
                                        {
                                            <Card.Img
                                                variant={"top"}
                                                src={
                                                    article?.Images[0]
                                                        ? "https://localhost:8080/api/file/" +
                                                            article?.Images[0]
                                                                .fileId
                                                        : ntnu
                                                }
                                                alt={
                                                    article?.Images[0]?.altText ??
                                                    "ingen bilder for dette undervisningsopplegget"
                                                }
                                            />
                                        }
                                        <Card.Body>
                                            <Card.Title aria-label="Card Title">
                                                {article.title.substring(
                                                    0,
                                                    maxTitleLength
                                                ) + " ..."}
                                            </Card.Title>
                                            <Card.Text>
                                                {article.description.substring(
                                                    0,
                                                    maxDescriptionLength
                                                ) + " ..."}
                                            </Card.Text>
                                            <Link
                                                to={`/articlelist/${article.id}`}
                                            >
                                                <Button variant="primary" aria-label="Read more">
                                                    Les mer
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">
                                                Sist oppdatert{" "}
                                                {getTimeDiff(article?.updatedAt)}
                                            </small>
                                        </Card.Footer>
                                    </Card>
                                </Row>
                            ))}
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ArticlesList;

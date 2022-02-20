import { useState, useEffect } from "react";
import { Article } from "../../types/Article";
import { Container, Col, Row, Image, ListGroup } from "react-bootstrap";
import "./ArticleDetails.css";
import ntnu from "../../ntnu.jpg";
import { fetchArticle } from "../../api/article.service";

export default function ArticleDetails({ match }) {
    const fileAPI = "https://localhost:8080/api/file/";
    const [article, setArticle] = useState<Article>({
        article_title: "",
        article_author: "",
        article_description: "",
        publications_date: "string",
        article_change_date: "string",
        time_to_complete: 0,
        grade_levels: [],
        subjects: [
            {
                id: "",
                name: "",
            },
        ],
        files: [
            {
                id: "",
                name: "",
            },
        ],
        images: [
            {
                id: "",
                alt_text: "",
            },
        ],
        article_id: 0,
    });

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchArticle(
                    match.params.id,
                    localStorage.getItem("userId")
                ).then((newArticle) => setArticle(newArticle.article));
            } catch (error) {
                console.log("fetch article error:", error);
            }
        }
        fetchData();
    }, [match.params.id]);

    return (
        <div>
            <h1 key={article.article_id}> </h1>
            <Container fluid>
                <Row className="row">
                    <Col className="col" xs={4} md={4}>
                        {
                            <Image
                                className="image"
                                src={
                                    article?.images[0]
                                        ? fileAPI + article.images[0].id
                                        : ntnu
                                }
                                alt={
                                    article?.images[0]
                                        ? article.images[0].alt_text
                                        : "ingen bilder for dette undervisningsopplegget"
                                }
                                rounded
                            />
                        }
                    </Col>
                    <Col xs={6} md={6}>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                {" "}
                                <h4>Oppgavetittel :</h4>
                                <span>{article.article_title}</span>{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Oppgavebeskrivelse :</h4>{" "}
                                <span>{article.article_description}</span>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {" "}
                                <h4>Fagkode : </h4>
                                {article.subjects!.map((subject, index) => {
                                    return (
                                        <span key={index}>{subject.id}, </span>
                                    );
                                })}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Fag : </h4>{" "}
                                {article.subjects!.map((subject, index) => {
                                    return (
                                        <span key={index}>
                                            {subject.name},{" "}
                                        </span>
                                    );
                                })}
                            </ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

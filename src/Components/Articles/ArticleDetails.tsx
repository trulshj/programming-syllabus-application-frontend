import { useState, useEffect } from "react";
import { Article } from "../../types/Article";
import { Container, Col, Row, Image, ListGroup } from "react-bootstrap";
import "./ArticleDetails.css";
import ntnu from "../../ntnu.jpg";
import { fetchArticle } from "../../api/article.service";

export default function ArticleDetails({ match }) {
    const fileAPI = "https://localhost:8080/files/";
    const [article, setArticle] = useState<Article>({
        id: 0,
        title: "",
        authorId: "",
        description: "",
        timeToComplete: 0,
        Files: [],
        Tags: [],
        published: false,
        viewCounter: 0,
        createdAt: "",
        updatedAt: "",
    });

    useEffect(() => {
        async function fetchData() {
            try {
                await fetchArticle(
                    match.params.id,
                    localStorage.getItem("userId")
                ).then((newArticle) => setArticle(newArticle));
            } catch (error) {
                console.log("fetch article error:", error);
            }
        }
        fetchData();
    }, [match.params.id]);

    return (
        <div>
            <h1 key={article.id}> </h1>
            <Container fluid>
                <Row className="row">
                    <Col className="col" xs={4} md={4}>
                        {
                            <Image
                                className="image"
                                src={
                                    article?.Files[0]
                                        ? fileAPI + article.Files[0].id
                                        : ntnu
                                }
                                alt={
                                    article?.Files[0]
                                        ? article.Files[0].altText
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
                                <h4>{article.title}</h4>{" "}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h5>{article.description}</h5>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {" "}
                                <h4>Klassetrinn : </h4>
                                {article.Tags.filter(
                                    (x) => x.tagType === "grade"
                                ).map((tag, index) => {
                                    return <span key={index}>{tag.name}</span>;
                                })}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {" "}
                                <h4>Fag: </h4>
                                {article.Tags.filter(
                                    (x) => x.tagType === "subject"
                                ).map((tag, index) => {
                                    return <span key={index}>{tag.name}</span>;
                                })}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {" "}
                                <h4>Tema:</h4>
                                {article.Tags.filter(
                                    (x) => x.tagType === "theme"
                                ).map((tag, index) => {
                                    return <span key={index}>{tag.name}</span>;
                                })}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {" "}
                                <h4>Verktøy:</h4>
                                {article.Tags.filter(
                                    (x) => x.tagType === "tool"
                                ).map((tag, index) => {
                                    return <span key={index}>{tag.name}</span>;
                                })}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <h4>Fag : </h4>{" "}
                                {article.Tags!.map((subject, index) => {
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

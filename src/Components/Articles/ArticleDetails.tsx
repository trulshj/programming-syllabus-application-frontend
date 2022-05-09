import { useState, useEffect } from "react";
import { Article, File } from "../../types/Article";
import { Container, Col, Row, Image, Button } from "react-bootstrap";
import ntnu from "../../ntnu.jpg";
import { fetchArticle } from "../../api/article.service";
import { BASE_API_URL } from "../../lib/config";
import { formatTime, getTimeDiff } from "../../lib/helpers";
import ArticleTags from "./ArticleTags";
import { Link } from "react-router-dom";

export default function ArticleDetails({ match }) {
    const [article, setArticle] = useState<Article>({
        id: -1,
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

    const [thumbnail, setThumbnail] = useState<File>();
    const [userId, setUserId] = useState<string>();

    useEffect(() => {
        async function fetchData() {
            setUserId(localStorage.getItem("userId") ?? "");
            fetchArticle(match.params.id, localStorage.getItem("userId") ?? "")
                .then((newArticle) => {
                    setArticle(newArticle);

                    const newThumbnail = newArticle.Files.find(
                        (x) => x.altText != null
                    );
                    setThumbnail(newThumbnail);
                })
                .catch((err) => {
                    console.error(err);
                });
        }
        fetchData();
    }, [match.params.id]);

    return (
        <>
            <Container fluid className="w-100 px-3 mt-5">
                <Row>
                    <Col md={4} sm={12}>
                        {
                            <Image
                                className="image"
                                src={
                                    thumbnail
                                        ? `${BASE_API_URL}files/${thumbnail.id}`
                                        : ntnu
                                }
                                alt={
                                    thumbnail
                                        ? thumbnail.altText
                                        : "ingen bilder for dette undervisningsopplegget"
                                }
                                rounded
                                fluid
                            />
                        }
                    </Col>
                    <Col md={8} sm={12} className="text-left mt-3 mt-md-0">
                        <div
                            id="dates"
                            className="w-100 d-flex justify-content-between text-muted"
                        >
                            <span>
                                Publisert: {formatTime(article.createdAt)}
                            </span>
                            <span>
                                Sist oppdatert: {getTimeDiff(article.updatedAt)}
                            </span>
                        </div>

                        <h1 className="text-center">{article.title}</h1>

                        <div id="description">
                            <h3>Beskrivelse:</h3>
                            <p className="mx-3">{article.description}</p>
                        </div>

                        <hr />

                        <div id="files">
                            <h3>Filer:</h3>
                            <ul>
                                {article.Files.map((file) => (
                                    <li key={file.id}>
                                        <a
                                            href={`${BASE_API_URL}files/${file.id}`}
                                            download
                                        >
                                            {file.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <hr />

                        <ArticleTags tags={article.Tags} />

                        {article.authorId !== userId ? null : (
                            <>
                                <hr />
                                <div className="w-100">
                                    <Link to={`/articles/${article.id}/edit`}>
                                        <Button className="mx-auto">
                                            Rediger
                                        </Button>
                                    </Link>
                                </div>
                            </>
                        )}
                    </Col>
                </Row>
            </Container>
        </>
    );
}

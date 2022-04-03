import React, { useEffect, useState } from "react";
import { Card, Container, Button, Row, Col } from "react-bootstrap";
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
            <Container>
                <Row>
                    {!articles
                        ? null
                        : articles.map((article, idx) => (
                              <Col key={idx} sm={12} md={6}>
                                  <Card className="ArticlesList">
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
                                          <Card.Title>
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
                                              <Button variant="primary">
                                                  Gå til egenside
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
                              </Col>
                          ))}
                </Row>
            </Container>
        </div>
    );
};

export default ArticlesList;

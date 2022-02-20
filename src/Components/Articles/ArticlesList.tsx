import React, { useEffect, useState } from "react";
import { Card, CardColumns, Container, Button } from "react-bootstrap";
import { Article } from "../../types/Article";
import { Link } from "react-router-dom";
import ntnu from "../../ntnu.jpg";
import "./ArticlesList.css";
import {
    fetchArticles,
    fetchArticlesByUser,
    searchArticles,
} from "../../api/article.service";

const ArticlesList = ({ match }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const maxTitleLenght = 25;
    const maxDescriptionLenght = 175;

    function getTimeDiff(inputTime) {
        const time = new Date();
        const mmsDiff = time.getTime() - inputTime.getTime();
        // older than one day
        if (mmsDiff > 24 * 60 * 60 * 1000) {
            const diffDays =
                (time.getTime() - inputTime.getTime()) / (24 * 60 * 60 * 1000);
            return diffDays.toString().split(".")[0] + " dager siden";
        } else if (mmsDiff > 60 * 60 * 1000) {
            const diffDays =
                (time.getTime() - inputTime.getTime()) / (60 * 60 * 1000);
            return diffDays.toString().split(".")[0] + " timer siden";
        } else if (mmsDiff > 60 * 1000) {
            const diffMinues =
                (time.getTime() - inputTime.getTime()) / (60 * 1000);
            return diffMinues.toString().split(".")[0] + " minutter siden";
        }
    }

    useEffect(() => {
        async function fetchData() {
            let newArticles;
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
            setArticles(newArticles.article);
        }
        fetchData();
    }, [match.params.id]);

    return (
        <React.Fragment>
            <div>
                <Container>
                    <CardColumns>
                        {articles
                            ? articles.map((article, key) => (
                                  <Card className="ArticlesList" key={key}>
                                      {
                                          <Card.Img
                                              variant={"top"}
                                              src={
                                                  article?.images["0"]
                                                      ? "https://localhost:8080/api/file/" +
                                                        article.images["0"].id
                                                      : ntnu
                                              }
                                              alt={
                                                  article?.images["0"]
                                                      ? article.images["0"]
                                                            .alt_text
                                                      : "ingen bilder for dette undervisningsopplegget"
                                              }
                                          />
                                      }
                                      <Card.Body>
                                          <Card.Title>
                                              {article.article_title
                                                  .toString()
                                                  .substr(0, maxTitleLenght) +
                                                  " ..."}
                                          </Card.Title>
                                          <Card.Text>
                                              {article.article_description
                                                  .toString()
                                                  .substr(
                                                      0,
                                                      maxDescriptionLenght
                                                  ) + " ..."}
                                          </Card.Text>
                                          <Link
                                              to={`/articlelist/${article.article_id}`}
                                          >
                                              <Button variant="primary">
                                                  Gå til egenside
                                              </Button>
                                          </Link>
                                      </Card.Body>
                                      <Card.Footer>
                                          <small className="text-muted">
                                              Sist oppdatert{" "}
                                              {getTimeDiff(
                                                  new Date(
                                                      article?.article_change_date as string
                                                  )
                                              )}
                                          </small>
                                      </Card.Footer>
                                  </Card>
                              ))
                            : null}
                    </CardColumns>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ArticlesList;

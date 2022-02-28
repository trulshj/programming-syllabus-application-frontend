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

    function getTimeDiff(input: string) {
        const inputTime = new Date(input);
        const time = new Date();
        const mmsDiff = time.getTime() - inputTime.getTime();

        // older than one day
        if (mmsDiff > 24 * 60 * 60 * 1000) {
            const diffDays = mmsDiff / (24 * 60 * 60 * 1000);
            return diffDays.toString().split(".")[0] + " dager siden";
        }
        if (mmsDiff > 60 * 60 * 1000) {
            const diffDays = mmsDiff / (60 * 60 * 1000);
            return diffDays.toString().split(".")[0] + " timer siden";
        }

        const diffMinues = (time.getTime() - inputTime.getTime()) / (60 * 1000);
        return diffMinues.toString().split(".")[0] + " minutter siden";
    }

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
                                                  article?.Images["0"]
                                                      ? "https://localhost:8080/api/file/" +
                                                        article.Images["0"]
                                                            .fileId
                                                      : ntnu
                                              }
                                              alt={
                                                  article?.Images["0"]
                                                      ? article.Images["0"]
                                                            .altText
                                                      : "ingen bilder for dette undervisningsopplegget"
                                              }
                                          />
                                      }
                                      <Card.Body>
                                          <Card.Title>
                                              {article.title
                                                  .toString()
                                                  .substr(0, maxTitleLenght) +
                                                  " ..."}
                                          </Card.Title>
                                          <Card.Text>
                                              {article.description
                                                  .toString()
                                                  .substr(
                                                      0,
                                                      maxDescriptionLenght
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
                              ))
                            : null}
                    </CardColumns>
                </Container>
            </div>
        </React.Fragment>
    );
};

export default ArticlesList;

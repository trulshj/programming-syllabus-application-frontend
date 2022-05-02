import { useEffect, useState } from "react";
import {
    Card,
    Container,
    Button,
    Row,
    Col,
    Form,
    FormGroup,
} from "react-bootstrap";
import { Article, Tag } from "../../types/Article";
import { Link } from "react-router-dom";
import ntnu from "../../ntnu.jpg";
import "./ArticlesList.css";
import {
    fetchArticles,
    fetchArticlesByUser,
    searchArticles,
} from "../../api/article.service";
import { getTimeDiff } from "../../lib/Helpers";
import { fetchTags } from "../../api/tag.service";

const ArticlesList = ({ match }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

    const [subjects, setSubjects] = useState<Tag[]>([]);
    const [grades, setGrades] = useState<Tag[]>([]);
    const [tools, setTools] = useState<Tag[]>([]);

    const maxTitleLength = 30;
    const maxDescriptionLength = 175;

    const cutString = (maxLength: number, str: string) => {
        return (
            str.substring(0, maxLength) + (str.length > maxLength ? " ..." : "")
        );
    };

    const handleFilter = (event) => {
        event.preventDefault();

        const gradeFilter = parseInt(event.currentTarget.gradeControl.value);
        const subjectFilter = parseInt(
            event.currentTarget.subjectControl.value
        );
        const toolFilter = parseInt(event.currentTarget.toolControl.value);

        setFilteredArticles(
            articles.filter(
                (x) =>
                    (gradeFilter === -1 ||
                        x.Tags.some((t) => t.id === gradeFilter)) &&
                    (subjectFilter === -1 ||
                        x.Tags.some((t) => t.id === subjectFilter)) &&
                    (toolFilter === -1 ||
                        x.Tags.some((t) => t.id === toolFilter))
            )
        );
    };

    useEffect(() => {
        async function fetchData() {
            fetchTags().then((res) => {
                setGrades(res.filter((x) => x.tagType === "grade"));
                setSubjects(res.filter((x) => x.tagType === "subject"));
                setTools(res.filter((x) => x.tagType === "tool"));
            });

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
            setFilteredArticles(newArticles);
        }
        fetchData();
    }, [match.params.id]);

    return (
        <div>
            <Container fluid>
                <Row>
                    {/* Filter column */}

                    <Col className="filtercolumn" lg={3}>
                        <h1 className="mt-4 mb-5 font-weight-light">Filter</h1>
                        <Form onChange={handleFilter}>
                            <FormGroup
                                className="mb-5"
                                controlId="gradeControl"
                            >
                                <Form.Label className="col-md-10 col-sm-10 lead">
                                    Årstrinn
                                </Form.Label>
                                <Form.Select
                                    className="col-md-10 col-sm-10 rounded font-weight-light"
                                    aria-label="Year"
                                >
                                    <option value="-1">Velg...</option>
                                    {grades.map((grade) => (
                                        <option key={grade.id} value={grade.id}>
                                            {grade.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FormGroup>
                            <FormGroup
                                className="mb-5"
                                controlId="subjectControl"
                            >
                                <Form.Label className="col-md-10 col-sm-10 lead">
                                    Fagområde
                                </Form.Label>
                                <Form.Select
                                    className="col-md-10 col-sm-10 rounded font-weight-light"
                                    aria-label="Subject"
                                >
                                    <option value="-1">Velg...</option>
                                    {subjects.map((subject) => (
                                        <option
                                            key={subject.id}
                                            value={subject.id}
                                        >
                                            {subject.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FormGroup>
                            <FormGroup className="mb-5" controlId="toolControl">
                                <Form.Label className="col-md-10 col-sm-10 lead">
                                    Verktøy
                                </Form.Label>
                                <Form.Select
                                    className="col-md-10 col-sm-10 rounded font-weight-light"
                                    aria-label="Tools"
                                >
                                    <option value="-1">Velg...</option>
                                    {tools.map((tool) => (
                                        <option key={tool.id} value={tool.id}>
                                            {tool.name}
                                        </option>
                                    ))}
                                </Form.Select>
                            </FormGroup>
                            <FormGroup className="mb-5" controlId="timeControl">
                                <Form.Label className="col-md-10 col-sm-10 lead">
                                    Tidsbruk
                                </Form.Label>
                                <>
                                    <Form.Range
                                        className="col-md-10 col-sm-10"
                                        aria-label="Time usage"
                                    />
                                </>
                            </FormGroup>
                        </Form>
                    </Col>

                    {/* Article column */}

                    <Col className="border-left" lg={true}>
                        <h1 className="mt-4 mb-5 font-weight-light">
                            Undervisningsopplegg
                        </h1>
                        <Row>
                            {filteredArticles.map((article, idx) => (
                                <Col key={idx} xl={4} lg={6} md={12}>
                                    <Card>
                                        {
                                            <Card.Img
                                                variant={"top"}
                                                src={
                                                    article?.Files[0]
                                                        ? "https://localhost:8080/files/" +
                                                          article.Files[0].id
                                                        : ntnu
                                                }
                                                alt={
                                                    article?.Files[0]
                                                        ?.altText ??
                                                    "ingen bilder for dette undervisningsopplegget"
                                                }
                                            />
                                        }
                                        <Card.Body>
                                            <Card.Title aria-label="Card Title">
                                                {cutString(
                                                    maxTitleLength,
                                                    article.title
                                                )}
                                            </Card.Title>
                                            <Card.Text>
                                                {cutString(
                                                    maxDescriptionLength,
                                                    article.description
                                                )}
                                            </Card.Text>
                                            <Link
                                                to={`/articlelist/${article.id}`}
                                            >
                                                <Button
                                                    variant="primary"
                                                    aria-label="Read more"
                                                >
                                                    Les mer
                                                </Button>
                                            </Link>
                                        </Card.Body>
                                        <Card.Footer>
                                            <small className="text-muted">
                                                Sist oppdatert{" "}
                                                {getTimeDiff(
                                                    article?.updatedAt
                                                )}
                                            </small>
                                        </Card.Footer>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ArticlesList;

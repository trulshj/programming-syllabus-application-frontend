import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, FormGroup } from "react-bootstrap";
import { Article, Tag } from "../../types/Article";
import "./ArticlesList.css";
import {
    fetchArticles,
    fetchArticlesByUser,
    searchArticles,
} from "../../api/article.service";
import { fetchTags } from "../../api/tag.service";
import ArticleCard from "./ArticleCard";
import { compareAges, compareTitles } from "../../lib/helpers";

const ArticlesList = ({ match }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);

    const [subjects, setSubjects] = useState<Tag[]>([]);
    const [grades, setGrades] = useState<Tag[]>([]);
    const [tools, setTools] = useState<Tag[]>([]);

    const [loaded, setLoaded] = useState(false);

    const handleFilter = (event) => {
        event.preventDefault();

        const gradeFilter = parseInt(event.currentTarget.gradeControl.value);
        const subjectFilter = parseInt(
            event.currentTarget.subjectControl.value
        );
        const toolFilter = parseInt(event.currentTarget.toolControl.value);

        setFilteredArticles(
            filterArticles(articles, gradeFilter, subjectFilter, toolFilter)
        );
    };

    const filterArticles = (
        articles: Article[],
        gradeFilter: number = -1,
        subjectFilter: number = -1,
        toolFilter: number = -1
    ) => {
        return articles.filter(
            (x) =>
                (gradeFilter === -1 ||
                    x.Tags.some((t) => t.id === gradeFilter)) &&
                (subjectFilter === -1 ||
                    x.Tags.some((t) => t.id === subjectFilter)) &&
                (toolFilter === -1 || x.Tags.some((t) => t.id === toolFilter))
        );
    };

    const handleSort = (event: any) => {
        const sortedArticles = sortArticles(articles, event.target.value);

        const sortedFilteredArticles = sortArticles(
            filteredArticles,
            event.target.value
        );

        setArticles(sortedArticles);
        setFilteredArticles(sortedFilteredArticles);
    };

    const sortArticles = (
        articles: Article[],
        sortingDirection: "age-old" | "age-new" | "title-az" | "title-za"
    ) => {
        let compareFunction: (a: Article, b: Article) => number;
        let reverse: boolean;

        switch (sortingDirection) {
            case "age-old":
                compareFunction = compareAges;
                reverse = true;
                break;
            case "age-new":
                compareFunction = compareAges;
                reverse = false;
                break;
            case "title-za":
                compareFunction = compareTitles;
                reverse = true;
                break;
            default:
                compareFunction = compareTitles;
                reverse = false;
        }
        let sortedArticles = [...articles].sort(compareFunction);

        if (reverse) {
            return sortedArticles.reverse();
        }

        return sortedArticles;
    };

    useEffect(() => {
        async function fetchData() {
            fetchTags().then((res) => {
                setGrades(res.filter((x) => x.tagType === "grade"));
                setSubjects(res.filter((x) => x.tagType === "subject"));
                setTools(res.filter((x) => x.tagType === "tool"));
            });

            let newArticles: Article[];

            if (window.location.pathname === "/user/articles") {
                newArticles = await fetchArticlesByUser(
                    localStorage.getItem("userId") || ""
                );
            } else if (window.location.search) {
                newArticles = await searchArticles(window.location.search);
            } else {
                newArticles = await fetchArticles();
            }

            let sortedArticles = sortArticles(newArticles, "title-az");

            setArticles(sortedArticles);
            setFilteredArticles(sortedArticles);

            setLoaded(true);
        }
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.id, loaded, window.location.search]);

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
                        <div className="sortingBar w-100 text-left">
                            <FormGroup>
                                <Form.Label className="lead mr-2">
                                    Sortering
                                </Form.Label>
                                <Form.Select onChange={handleSort}>
                                    <option value="title-az">
                                        Tittel A til Å
                                    </option>
                                    <option value="title-za">
                                        Tittel Å til A
                                    </option>
                                    {/*<option value="age-new">
                                        Nyeste først
                                    </option>
                                    <option value="age-old">
                                        Eldste først
                                    </option>*/}
                                </Form.Select>
                            </FormGroup>
                        </div>
                        <Row className="mt-3">
                            {filteredArticles.map((article, idx) => (
                                <Col
                                    key={idx}
                                    xl={4}
                                    lg={6}
                                    md={12}
                                    className="mb-3"
                                >
                                    <ArticleCard article={article} />
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

import { useEffect, useRef, useState } from "react";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import {
    createNewArticle,
    fetchArticle,
    updateArticle,
} from "../../api/article.service";
import { fetchTags } from "../../api/tag.service";
import { BASE_API_URL } from "../../lib/config";
import { Article, Tag } from "../../types/Article";
import "./NewArticle.css";

const NewArticle = () => {
    const formRef = useRef<HTMLFormElement>(null);
    const history = useHistory();
    const { id } = useParams<{ id: string }>();

    const [loaded, setLoaded] = useState(false);

    const [files, setFiles] = useState<FileList>();
    const [thumbnail, setThumbnail] = useState<FileList>();

    const [activeTags, setActiveTags] = useState<number[]>([]);
    const [tags, setTags] = useState<Tag[]>([]);
    const [subjects, setSubjects] = useState<Tag[]>([]);
    const [grades, setGrades] = useState<Tag[]>([]);
    const [tools, setTools] = useState<Tag[]>([]);

    const handleCheckboxChange = (event: any) => {
        if (event.target.checked) {
            setActiveTags([...activeTags, parseInt(event.target.id)]);
        } else {
            setActiveTags(
                activeTags.filter((x) => x !== parseInt(event.target.id))
            );
        }
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();

        const formData = new FormData(event.target);

        const article: Partial<Article> = {
            id: parseInt(id ?? -1),
            title: event.target.title.value,
            description: event.target.description.value,
            authorId: localStorage.getItem("userId") || "",
            Tags: tags.filter((x) => activeTags.includes(x.id)),
        };

        formData.append("body", JSON.stringify(article));

        if (files) {
            for (let i = 0; i < (files?.length ?? 0); i++) {
                formData.append(`file`, files[i], files[i].name);
            }
        }

        if (thumbnail) {
            formData.append("thumbnail", thumbnail[0], thumbnail[0].name);
        }

        if (id) {
            updateArticle(id, formData).then((res) => {
                if (res) {
                    history.push(`/articles/${res.id}`);
                } else {
                    console.error("Could not update article");
                }
            });
        } else {
            createNewArticle(formData).then((res) => {
                if (res) {
                    history.push(`/articles/${res.id}`);
                } else {
                    console.error("Could not create article");
                }
            });
        }
    };

    useEffect(() => {
        if (loaded) {
            return;
        }

        async function fetchData() {
            fetchTags().then((res) => {
                setTags(res);
                setGrades(res.filter((x) => x.tagType === "grade"));
                setSubjects(res.filter((x) => x.tagType === "subject"));
                setTools(res.filter((x) => x.tagType === "tool"));
            });

            if (id) {
                fetchArticle(id, localStorage.getItem("userId") ?? "").then(
                    async (res) => {
                        const form = formRef.current as any;

                        form.title.value = res.title;
                        form.description.value = res.description;

                        setActiveTags(res.Tags.map((x) => x.id));

                        const filesList = new DataTransfer();
                        const thumbnailList = new DataTransfer();

                        for (let file of res.Files) {
                            const fileRes = await fetch(
                                BASE_API_URL + "files/" + file.id
                            );
                            const fileBlob = await fileRes.blob();

                            if (file.altText) {
                                thumbnailList.items.add(
                                    new File([fileBlob], file.name)
                                );
                            } else {
                                filesList.items.add(
                                    new File([fileBlob], file.name)
                                );
                            }
                        }

                        form.files.files = filesList.files;
                        setFiles(filesList.files);
                        form.image.files = thumbnailList.files;
                        setThumbnail(thumbnailList.files);
                    }
                );
            }

            setLoaded(true);
        }
        fetchData();
    }, [id, loaded]);

    return (
        <Container>
            <h1 className="my-3">Nytt undervisningsopplegg</h1>
            <Form onSubmit={handleSubmit} ref={formRef}>
                <Row>
                    <Col md={6} className="mx-auto">
                        <Form.Group controlId="title" className="mb-3">
                            <Form.Label>Tittel</Form.Label>
                            <Form.Control required />
                        </Form.Group>

                        <Form.Group controlId="description" className="mb-3">
                            <Form.Label>Beskrivelse</Form.Label>
                            <Form.Control as="textarea" rows={3} required />
                        </Form.Group>
                        <Form.Group controlId="grades" className="mb-3">
                            <Form.Label>Klassetrinn</Form.Label>
                            <div className="tagList">
                                {grades.map((tag) => (
                                    <Form.Check
                                        key={tag.id}
                                        id={tag.id.toString()}
                                        label={tag.name}
                                        onChange={handleCheckboxChange}
                                        checked={activeTags.includes(tag.id)}
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group controlId="grades" className="mb-3">
                            <Form.Label>Fag</Form.Label>
                            <div className="tagList">
                                {subjects.map((tag) => (
                                    <Form.Check
                                        key={tag.id}
                                        id={tag.id.toString()}
                                        label={tag.name}
                                        onChange={handleCheckboxChange}
                                        checked={activeTags.includes(tag.id)}
                                    />
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group controlId="grades" className="mb-3">
                            <Form.Label>Verktøy</Form.Label>
                            <div className="tagList">
                                {tools.map((tag) => (
                                    <Form.Check
                                        key={tag.id}
                                        id={tag.id.toString()}
                                        label={tag.name}
                                        onChange={handleCheckboxChange}
                                        checked={activeTags.includes(tag.id)}
                                    />
                                ))}
                            </div>
                        </Form.Group>
                        <Form.Group controlId="image" className="mb-3">
                            <Form.Label>Last opp thumbnail</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(newFiles: any) => {
                                    setThumbnail(newFiles.target.files);
                                }}
                            />
                        </Form.Group>

                        <Form.Group controlId="files" className="mb-3">
                            <Form.Label>Last opp filer</Form.Label>
                            <Form.Control
                                type="file"
                                multiple
                                onChange={(newFiles: any) => {
                                    setFiles(newFiles.target.files);
                                }}
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <div className="mt-3">
                    <Button
                        className="mr-3"
                        variant="secondary"
                        onClick={() => window.history.back()}
                    >
                        Tilbake
                    </Button>
                    <Button type="submit">Lagre</Button>
                </div>
            </Form>
        </Container>
    );
};

export default NewArticle;

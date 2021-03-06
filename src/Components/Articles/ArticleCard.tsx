import { Article } from "../../types/Article";
import ntnu from "../../ntnu.jpg";
import { MAX_DESCRIPTION_LENGTH, MAX_TITLE_LENGTH } from "../../lib/config";
import { cutString, getTimeDiff } from "../../lib/helpers";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

interface ArticleCardProps {
    article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
    const thumbnail = article.Files.find((x) => x.altText);

    return (
        <Card className="h-100" id={`articleCard${article.id}`}>
            {
                <Card.Img
                    variant={"top"}
                    src={
                        thumbnail
                            ? "https://localhost:8080/files/" + thumbnail.id
                            : ntnu
                    }
                    alt={
                        thumbnail?.altText ??
                        "ingen bilder for dette undervisningsopplegget"
                    }
                />
            }
            <Card.Body>
                <Card.Title aria-label="Card Title">
                    {cutString(MAX_TITLE_LENGTH, article.title)}
                </Card.Title>
                <Card.Text>
                    {cutString(MAX_DESCRIPTION_LENGTH, article.description)}
                </Card.Text>
                <Link to={`/articles/${article.id}`}>
                    <Button variant="primary" aria-label="Read more">
                        Les mer
                    </Button>
                </Link>
            </Card.Body>
            <Card.Footer>
                <small className="text-muted">
                    Sist oppdatert {getTimeDiff(article?.updatedAt)}
                </small>
            </Card.Footer>
        </Card>
    );
}

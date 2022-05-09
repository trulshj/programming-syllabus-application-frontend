import { Tag } from "../../types/Article";

interface ArticleTagsProps {
    tags: Tag[];
}

export default function ArticleTags({ tags }: ArticleTagsProps) {
    return (
        <div
            id="tags"
            className="d-flex flex-md-row flex-column justify-content-md-around flex-wrap"
        >
            {tags.filter((x) => x.tagType === "grade").length === 0 ? null : (
                <div className="d-flex">
                    <span className="font-weight-bold">Klasse:</span>
                    &nbsp;
                    {tags
                        .filter((x) => x.tagType === "grade")
                        .map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                </div>
            )}

            {tags.filter((x) => x.tagType === "subject").length === 0 ? null : (
                <div className="d-flex">
                    <span className="font-weight-bold">Fag:</span>
                    &nbsp;
                    {tags
                        .filter((x) => x.tagType === "subject")
                        .map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                </div>
            )}

            {tags.filter((x) => x.tagType === "theme").length === 0 ? null : (
                <div className="d-flex">
                    <span className="font-weight-bold">Tema:</span>
                    &nbsp;
                    {tags
                        .filter((x) => x.tagType === "theme")
                        .map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                </div>
            )}

            {tags.filter((x) => x.tagType === "tool").length === 0 ? null : (
                <div className="d-flex">
                    <span className="font-weight-bold">Verktøy:</span>
                    &nbsp;
                    {tags
                        .filter((x) => x.tagType === "tool")
                        .map((tag) => (
                            <span key={tag.id}>{tag.name}</span>
                        ))}
                </div>
            )}
        </div>
    );
}

import { Tag, tag1, tag2, tag3, tag4, tag5, tag6 } from "./tags";

export type Article = {
    id: number;
    title: string;
    description: string;
    authorId: string;
    published: boolean;
    timeToComplete: number;
    viewCounter: number;
    createdAt: string;
    updatedAt: string;
    Files: File[];
    Tags: Tag[];
};

export type File = {
    id: number;
    hash: string;
    name: string;
    altText: string | undefined;
};

const article1: Article = {
    id: 1,
    title: "1",
    description: "1",
    authorId: "bob",
    published: true,
    timeToComplete: 10,
    viewCounter: 0,
    createdAt: "",
    updatedAt: "",
    Files: [],
    Tags: [tag1, tag3, tag5],
};

const article2: Article = {
    id: 2,
    title: "2",
    description: "2",
    authorId: "bob",
    published: true,
    timeToComplete: 10,
    viewCounter: 0,
    createdAt: "",
    updatedAt: "",
    Files: [],
    Tags: [tag2, tag4, tag6],
};

const articles: Article[] = [article1, article2];

export function mockArticles() {
    return cy
        .intercept("https://localhost:8080/articles", articles)
        .as("articles");
}

export function mockArticleSearch(searchText: string) {
    return cy
        .intercept(`https://localhost:8080/articles?search=${searchText}`, [
            article1,
        ])
        .as("articleSearch");
}

export function mockArticle(articleId: number) {
    return cy.intercept(
        `https://localhost:8080/articles/${articleId}`,
        articleId === 1 ? article1 : article2
    );
}

import { mockArticles, mockArticleSearch } from "../fixtures/articles";
import { get } from "../fixtures/helper";
import { mockTags } from "../fixtures/tags";

describe("Article list tests", () => {
    it("Loads properly", () => {
        mockArticles();
        mockTags();

        cy.visit("/articles");
        cy.wait("@tags");
        cy.wait("@articles");
    });

    it("Can filter articles", () => {
        mockArticles();
        mockTags();

        cy.visit("/articles");
        cy.wait("@tags");
        cy.wait("@articles");

        get("gradeControl").select(1);
        get("subjectControl").select(1);
        get("toolControl").select(1);

        get("articleCard1");
    });

    it("Can search for articles", () => {
        mockArticles();
        mockTags();
        mockArticleSearch("1");

        cy.visit("/articles");

        get("searchText").type("1{enter}");

        cy.wait("@articleSearch");

        get("articleCard1");
    });

    it("Can create new articles", () => {
        mockTags();
        mockArticles();

        cy.visit("/articles/new");

        get("title").type("3");
        get("description").type("3");

        get("1").check();
        get("4").check();
        get("5").check();

        cy.get("[type=submit]:last").click();
    });
});

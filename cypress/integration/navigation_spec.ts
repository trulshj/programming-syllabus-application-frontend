import { mockArticles } from "../fixtures/articles";
import { mockTags } from "../fixtures/tags";

describe("Navigation tests", () => {
    it("Can load the home page properly", () => {
        cy.visit("/");
    });

    it("Can navigate to the article list", () => {
        mockArticles();
        mockTags();

        cy.visit("/");
        cy.get("[id=allArticlesBtn]").click();

        cy.wait("@tags");
        cy.wait("@articles");
    });

    it("Can load the registration page", () => {
        cy.visit("/");

        cy.get("[id=registrationBtn]").click();
    });

    it("Can navigate to the login page", () => {
        cy.visit("/");

        cy.get("[id=loginBtn]").click();
    });
});

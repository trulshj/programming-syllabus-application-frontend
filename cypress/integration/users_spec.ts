import { get } from "../fixtures/helper";
import { mockLogin, mockRegistration, mockUser } from "../fixtures/users";

describe("User tests", () => {
    it("Can go to and use the registration page", () => {
        mockRegistration();

        cy.visit("/registration");

        get("username").type("bob");
        get("email").type("bob@email.com");
        get("password").type("Eplekake123!");
        get("passwordConfirm").type("Eplekake123!");

        cy.get("form button:last").click();
    });

    it("Can go to and use the login page", () => {
        mockLogin();

        cy.visit("/login");

        get("email").type("bob@email.com");
        get("password").type("Eplekake123!");

        cy.get("form button:last").click();
    });

    it("Can go to and use the user edit page", () => {
        mockLogin();
        mockUser("bob");

        cy.visit("/login");

        get("email").type("bob@email.com");
        get("password").type("Eplekake123!");

        cy.get("form button:last").click();

        cy.visit("/user/edit");

        mockUser("bob");

        get("email").clear().type("robert@email.com");
        cy.get("form button:last").click();
    });
});

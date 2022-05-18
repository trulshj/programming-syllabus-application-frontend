export interface User {
    id: string;
    username: string;
    email: string;
    roleId: number;
    updatedAt: Date;
}

const user1: User = {
    id: "bob",
    username: "bob",
    email: "bob@email.com",
    roleId: 0,
    updatedAt: new Date(),
};

export function mockLogin() {
    return cy.intercept("https://localhost:8080/login", user1).as("login");
}

export function mockUser(userId: string) {
    return cy
        .intercept(`https://localhost:8080/users/${userId}`, user1)
        .as("user");
}

export function mockRegistration() {
    return cy
        .intercept("https://localhost:8080/registration", user1)
        .as("registration");
}

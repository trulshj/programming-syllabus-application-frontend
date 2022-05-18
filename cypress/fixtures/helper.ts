export function get(id: string) {
    return cy.get(`[id=${id}]`);
}

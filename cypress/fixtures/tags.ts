export type Tag = {
    id: number;
    name: string;
    tagType: "grade" | "subject" | "tool" | "theme";
};

export const tag1: Tag = {
    id: 1,
    name: "1",
    tagType: "grade",
};

export const tag2: Tag = {
    id: 2,
    name: "2",
    tagType: "grade",
};

export const tag3: Tag = {
    id: 3,
    name: "3",
    tagType: "subject",
};

export const tag4: Tag = {
    id: 4,
    name: "4",
    tagType: "subject",
};

export const tag5: Tag = {
    id: 5,
    name: "5",
    tagType: "tool",
};

export const tag6: Tag = {
    id: 6,
    name: "6",
    tagType: "tool",
};

const tags: Tag[] = [tag1, tag2, tag3, tag4, tag5, tag6];

export function mockTags() {
    return cy.intercept("https://localhost:8080/tags", tags).as("tags");
}

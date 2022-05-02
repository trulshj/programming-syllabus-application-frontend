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

export type Tag = {
    id: number;
    name: string;
    tagType: "grade" | "subject" | "tool" | "theme";
};

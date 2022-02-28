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
    Grades: Grade[];
    Subjects: Subject[];
    Files: File[];
    Images: Image[];
    Themes: Theme[];
    Tools: Tool[];
};

export type File = {
    id: string;
    name: string;
};

export type Image = {
    fileId: string;
    altText: string;
};

export type Subject = {
    id: number;
    name: string;
};

export type Grade = {
    id: number;
    name: string;
};

export type Theme = {
    id: number;
    name: string;
};

export type Tool = {
    id: number;
    name: string;
};

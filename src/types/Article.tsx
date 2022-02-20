export type Article = {
    article_title: string;
    article_author: string;
    article_description: string;
    publications_date?: string;
    article_change_date?: string;
    time_to_complete: number;
    article_id: number;
    grade_levels: GradeLevel[];
    subjects: Subject[];
    files: File[];
    images: Image[];
};

export type Subject = {
    id: string;
    name: string;
};

export type File = {
    id: string;
    name: string;
};

export type Image = {
    id: string;
    alt_text: string;
};

export type GradeLevel = {
    grade_name: string;
};

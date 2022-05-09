import { Article } from "../types/Article";
import axios, { AxiosResponse } from "axios";
import { BASE_API_URL } from "../lib/config";

const articlesUrl = BASE_API_URL + "articles";

export const fetchArticles = async () => {
    const data = await axios
        .get<Article[]>(articlesUrl)
        .catch((err) => console.error(err));

    if (data) {
        return data.data;
    }

    return [];
};

export const searchArticles = async (searchString: string) => {
    const data = await axios
        .get<Article[]>(articlesUrl + searchString)
        .catch((error) => {
            console.error(error);
        });

    if (data) {
        return data.data;
    }
    return [];
};

export const fetchArticlesByUser = async (userId: string) => {
    const endpoint = `${BASE_API_URL}users/${userId}/articles`;

    let data = await axios
        .get<Article[]>(endpoint)
        .catch((err) => console.error(err));

    return data?.data ?? [];
};

export const newArticle = async (article, files) => {
    let requestBody = new FormData();
    let response;

    requestBody.append("body", JSON.stringify(article));
    files.map((oneFile) => requestBody.append("file", oneFile, oneFile.name));

    response = await axios
        .post(articlesUrl, requestBody)
        .catch((err) => console.error("api newArticle:", err));

    return response?.status === 200;
};

export const createNewArticle = async (formData: FormData) => {
    let data = await axios.post<FormData, AxiosResponse<Article>>(
        articlesUrl,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );

    return data?.status === 200 ? data.data : undefined;
};

export const updateArticle = async (articleId: string, formData: FormData) => {
    let data = await axios.put<FormData, AxiosResponse<Article>>(
        `${articlesUrl}/${articleId}`,
        formData,
        {
            headers: { "Content-Type": "multipart/form-data" },
        }
    );

    return data?.status === 200 ? data.data : undefined;
};

export const fetchArticle = async (
    articleId: string,
    userId: string
): Promise<Article> => {
    let data: any = await axios
        .get(articlesUrl + "/" + articleId, {
            headers: {
                user_id: userId,
            },
        })
        .catch((err) => console.error("Error fetchArticle", err));
    return data?.status === 200 ? data.data : undefined;
};

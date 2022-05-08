import { Article } from "../types/Article";
import { baseUrl } from "./baseApi";
import axios from "axios";

const articlesUrl = baseUrl + "articles";

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
    const endpoint = `${baseUrl}users/${userId}/articles`;

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

export const fetchArticle = async (id, userId) => {
    let data: any = await axios
        .get(articlesUrl + "/" + id, {
            headers: {
                user_id: userId,
            },
        })
        .catch((err) => console.error("Error fetchArticle", err));
    return data?.status === 200 ? data.data : undefined;
};

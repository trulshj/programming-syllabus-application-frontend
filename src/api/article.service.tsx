import { Article } from "../types/Article";
import { baseUrl } from "./baseApi";
import axios from "axios";

const articlesUrl = baseUrl + "articles";

export const fetchArticles = async () => {
    let data: any;
    data = await axios
        .get<Article[]>(articlesUrl)
        .catch((error) => console.error(error));
    return data?.data ?? [];
};

export const searchArticles = async (searchString: string) => {
    let data: any = await axios
        .get<Article[]>(articlesUrl, {
            headers: { query: searchString },
        })
        .catch((error) => {
            console.error(error);
        });

    return data?.data ?? [];
};

export const fetchArticlesByUser = async (userid: string) => {
    let data: any = await axios
        .get(articlesUrl, {
            headers: {
                "query-type": "byUser",
                userID: userid,
            },
        })
        .catch((error) => console.error(error));

    return data?.data ?? [];
};

export const newArticle = async (article, files) => {
    let requestBody = new FormData();
    let response;

    requestBody.append("body", JSON.stringify(article));
    files.map((oneFile) => requestBody.append("file", oneFile, oneFile.name));

    response = await axios
        .post(articlesUrl, requestBody)
        .catch((error: any) => console.error("api newArticle:", error));

    return response?.status === 200;
};

export const fetchArticle = async (id, userId) => {
    let data: any = await axios
        .get(articlesUrl + "/" + id, {
            headers: {
                user_id: userId,
            },
        })
        .catch((err: any) => console.error("Error fetchArticle", err));
    return data?.status === 200 ? data.data : undefined;
};

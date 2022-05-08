import axios from "axios";
import { Tag } from "../types/Article";
import { baseUrl } from "./baseApi";

const tagUrl = baseUrl + "tags";

export const fetchTags = async () => {
    const data = await axios
        .get<Tag[]>(tagUrl)
        .catch((error) => console.error(error));

    if (data) {
        return data.data;
    }

    return [];
};

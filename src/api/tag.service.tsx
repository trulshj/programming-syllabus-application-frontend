import axios from "axios";
import { BASE_API_URL } from "../lib/config";
import { Tag } from "../types/Article";

const tagUrl = BASE_API_URL + "tags";

export const fetchTags = async () => {
    const data = await axios
        .get<Tag[]>(tagUrl)
        .catch((error) => console.error(error));

    if (data) {
        return data.data;
    }

    return [];
};

import { baseUrl } from "./baseApi";
import axios, { AxiosResponse } from "axios";
import { User } from "../types/User";

export const login = async (email: string, password: string) => {
    const endpoint = baseUrl + "login";

    let data: any = await axios
        .post<{ email: string; password: string }, AxiosResponse<User>>(
            endpoint,
            {
                email: email,
                password: password,
            }
        )
        .catch((error) => {
            console.error(error);
        });

    return data?.status === 200 ? data.data : undefined;
};

export const logout = () => {
    localStorage.clear();
    window.location.href = "/";
};

export const registration = async (
    username: string,
    email: string,
    password: string
) => {
    const endpoint = baseUrl + "users";

    if (!email || !password || !username) {
    }

    let data: any = await axios.post<
        { email: string; username: string; password: string },
        AxiosResponse<string>
    >(endpoint, {
        email: email,
        username: username,
        password: password,
    });

    return data?.status === 200 ? data.data : data?.error;
};

export async function getUser(userId: string) {
    const endpoint = baseUrl + "users/" + userId;

    const data = await axios.get<User>(endpoint);
    return data.data;
}

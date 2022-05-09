import { BASE_API_URL } from "../lib/config";
import axios, { AxiosResponse } from "axios";
import { User } from "../types/User";

export const login = async (email: string, password: string) => {
    const endpoint = BASE_API_URL + "login";

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
    const endpoint = BASE_API_URL + "users";

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
    const endpoint = BASE_API_URL + "users/" + userId;

    const data = await axios.get<User>(endpoint);
    return data.data;
}

export async function updateUser(
    userId: string,
    newUsername: string | undefined,
    newEmail: string | undefined,
    newPassword: string | undefined
) {
    const endpoint = BASE_API_URL + "users/" + userId;
    const data = await axios.put(endpoint, {
        newUsername: newUsername,
        newEmail: newEmail,
        newPassword: newPassword === "" ? undefined : newPassword,
    });
    return data.data;
}

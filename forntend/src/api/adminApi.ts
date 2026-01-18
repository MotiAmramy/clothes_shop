import client from "./client";

export interface User {
    _id: string;
    name: string;
    email: string;
    role: "user" | "admin";
}

export const fetchUsers = async (): Promise<User[]> => {
    return client.get("/users/");
};

export const updateUser = async (userId: string, body: Partial<User>) => {
    return client.put(`/users/${userId}`, body);
};

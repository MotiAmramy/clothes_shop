import client from "./client";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    role: "user" | "admin";
}

export const fetchUsers = async (): Promise<User[]> => {
    return client.get("/users/");
};

export const updateUser = async (userId: string, user: Partial<User>): Promise<User> => {
    return client.put(`users/${userId}`, user);
};

export const deleteUser = async (userId: string): Promise<void> => {
    return client.delete(`users/${userId}`);
};

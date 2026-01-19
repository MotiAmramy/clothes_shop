import client from "./client";
import { User } from "./adminApi";

export const updateUser = async (_id: string | undefined, data: { name?: string; password?: string }) => {
    // Assuming the backend endpoint is PUT /users/profile
    return client.put<User>(`/users/${_id}`, data) as unknown as Promise<User>;
};

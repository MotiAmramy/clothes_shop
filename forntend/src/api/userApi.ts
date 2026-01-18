import client from "./client";
import { User } from "./adminApi";

export const updateProfile = async (data: { name?: string; password?: string }) => {
    // Assuming the backend endpoint is PUT /users/profile
    return client.put<User>("/users/profile", data) as unknown as Promise<User>;
};

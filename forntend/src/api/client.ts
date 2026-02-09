import axios from "axios";
import { useAuthStore } from "../store/logginStore";

const client = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add a request interceptor to attach the token
client.interceptors.request.use(
    (config) => {
        const { user } = useAuthStore.getState();
        const token = user?.token;

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Add a response interceptor to handle common errors
client.interceptors.response.use(
    (response) => response.data,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            const message = error.response.data?.message || error.response.data?.error || "An error occurred";
            return Promise.reject(new Error(message));
        } else if (error.request) {
            // The request was made but no response was received
            return Promise.reject(new Error("No response from server"));
        } else {
            // Something happened in setting up the request that triggered an Error
            return Promise.reject(new Error(error.message));
        }
    }
);

export default client;

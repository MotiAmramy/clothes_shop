import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb://localhost:27017/products-db",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};
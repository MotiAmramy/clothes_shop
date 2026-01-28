import dotenv from "dotenv";
dotenv.config();

export const env = {
  PORT: process.env.PORT || 5000,
  MONGO_URI: process.env.MONGO_URI || "mongodb+srv://motiamramy_db_user:nTi7h7E2ztWN4P7R@moticluster.tvttusv.mongodb.net/products-db?appName=motiCluster",
  JWT_SECRET: process.env.JWT_SECRET || "secret",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
};
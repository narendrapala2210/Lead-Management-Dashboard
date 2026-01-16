import "dotenv/config";

export const config = {
  port: Number(process.env.PORT) || 3000,
  dbUri: (process.env.DB_URI as string) || "",
  jwtSecretKey: process.env.JWT_SECRET_KEY as string,
};

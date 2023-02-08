import dotenv from 'dotenv';

dotenv.config();

export const port = process.env.PORT;
export const basePath = process.env.API_BASE_PATH;
export const dbConnectionString = process.env.DB_CONNECTION;
export const jwtSecret = process.env.JWT_SECRET;
export const env = process.env.ENVIRONMENT || 'development';

export default { port, basePath, dbConnectionString, jwtSecret, env };

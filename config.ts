import dotenv from 'dotenv';

dotenv.config();

export const DB_URI = process.env.MONGO_URI || ''
export const DB_NAME = process.env.MONGO_DB || ''
import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();
const sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USER,
    process.env.DATABASE_PASSWORD,
    {
        dialect:'postgres',
        host: process.env.DATABASE_HOST,
        port: process.env.DATABASE_PORT
    }
)

export default sequelize;
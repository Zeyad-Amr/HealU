import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.DATABASE_URL!, 
    {
        dialect: 'postgres',
        storage: './session.postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        }
    }
);

const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

testDatabaseConnection();

export default {sq: sequelize}
import { Sequelize } from "sequelize";
import 'dotenv/config';

const sequelize = new Sequelize(
    process.env.DATABASE_URL || 'postgres://mdima:bQgjMJAbXvICqOCYaTIX09FbARyTj19w@dpg-clpnhn946foc73dchs8g-a.frankfurt-postgres.render.com/docstorage',
    {
        dialect: 'postgres',
        storage: './session.postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
        logging: false,
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

export default sequelize

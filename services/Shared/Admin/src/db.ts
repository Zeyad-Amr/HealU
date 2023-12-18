import { Sequelize } from "sequelize";
import sync from "./models";

const sequelize = new Sequelize(
    'postgres://mdima:bQgjMJAbXvICqOCYaTIX09FbARyTj19w@dpg-clpnhn946foc73dchs8g-a.frankfurt-postgres.render.com/docstorage',
    {
        dialect: 'postgres',
        storage: './session.postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        logging: false
    }
);

const testDatabaseConnection = async () => {
    try {
        await sequelize.authenticate();
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }
};

testDatabaseConnection().then(r => console.log('Connection has been established successfully.'));

export default sequelize

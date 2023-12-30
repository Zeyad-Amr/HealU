import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { get_analytics } from "./controllers/analyticsController";

dotenv.config()

const app: Express = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', get_analytics)

const PORT = 4000;

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
});
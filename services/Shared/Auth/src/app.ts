import express, { Express } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/authRouter";


dotenv.config()

const app: Express = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', authRouter)

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(
        (process.env.DB_URI as string)
    );
    console.log("***Connected to database***");
}


const PORT = 4000;

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`);
});
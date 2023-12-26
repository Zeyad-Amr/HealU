import express, { Express } from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRouter from "./routes/authRouter";
import { proxies } from "./config";
import { createProxyMiddleware } from "http-proxy-middleware";
import { alwaysAllow, protect } from "./services";


const app: Express = express();

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect(
        (process.env.DB_URI as string)
    );
    console.log("***Connected to database***");
}

app.use('/api', authRouter)


Object.keys(proxies).forEach((path) => {
    const { isProtected, ...options } = (proxies[path] as any);
    const check = isProtected ? protect : alwaysAllow;
    app.use(`/api${path}`, check, createProxyMiddleware(options));
})


const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
});
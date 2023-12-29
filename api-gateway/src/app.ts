import express, { Express } from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
import clinicRouter from "./routes/dataRouter";
import { proxies } from "./config";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { alwaysAllow, protect } from "./services";


const app: Express = express();

app.use(cors());

Object.keys(proxies).forEach((path) => {
    const { isProtected, ...options } = (proxies[path] as any);
    const check = isProtected ? protect : alwaysAllow;
    app.use(`/api${path}`, check, createProxyMiddleware({
        ...options, on: {
            // proxyReq: fixRequestBody,

        }, logLevel: process.env.PROXY_LOG_LEVEL
    }));
})


app.use('/api', express.json(), authRouter)
app.use('/api', clinicRouter)

const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
});
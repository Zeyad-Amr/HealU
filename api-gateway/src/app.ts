import express, { Express } from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
import clinicRouter from "./routes/clinicRouter";
import { proxies } from "./config";
import { createProxyMiddleware, fixRequestBody } from "http-proxy-middleware";
import { alwaysAllow, protect } from "./services";


const app: Express = express();

app.use(cors());

app.use('/api', authRouter)
app.use('/api', clinicRouter)


Object.keys(proxies).forEach((path) => {
    const { isProtected, ...options } = (proxies[path] as any);
    const check = isProtected ? protect : alwaysAllow;
    app.use(`/api${path}`, check, createProxyMiddleware({
        ...options, on: {
            proxyReq: fixRequestBody,

        }, logLevel: process.env.PROXY_LOG_LEVEL
    }));
})


const PORT = process.env.PORT ?? 4000;

app.listen(PORT, () => {
    console.log(`listening to port: ${PORT}`)
});
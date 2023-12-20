import express, {Application, Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import hpp from 'hpp';
import clinicRouter from './routes/clinicRoutes';
import clinicServiceRouter from './routes/clinicServicesRoutes';
import databaseTablesSync from "./models";

const app : express.Application = express();

// serving static files
app.use(express.static(`${__dirname}/public`));

// set security HTTP headers
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
        "img-src": ["'self'", "https: data:", "http"],
    }
}));

// limit requests from same IP
const limiter = rateLimit({
    max: 100,
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});

app.use('/api', limiter);

// development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));

app.use(hpp({
    whitelist: [
        // @TODO add whitelist
    ]
}))

app.use("/api/v1/clinic", clinicRouter);
app.use("/api/v1/clinicService", clinicServiceRouter);

databaseTablesSync().then(r => {
    console.log("Database tables synced successfully!");
});

// handle undefined routes
app.all('*', (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

export default app;

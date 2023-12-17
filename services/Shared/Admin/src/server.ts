import app from './app';
import dotenv from 'dotenv';

// handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

// set up environment variables
dotenv.config({ path: './.env' });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`Server started & App running on port ${port}`);
    console.log(`Running on Environment: ${process.env.NODE_ENV}`);
});

// handle unhandled rejections
process.on('unhandledRejection', (err: Error) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => {
        process.exit(1);
    });
});

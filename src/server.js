import 'dotenv/config';
import process from 'node:process';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pino from 'pino';
import { initMongoConnection } from './db/initMongoConnection.js';
import contactsRouter from './routers/contacts.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';

const logger = pino();

export const setupServer = async () => {
    await initMongoConnection();

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(pinoHttp({ logger }));

    app.use('/contacts', contactsRouter);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

setupServer();

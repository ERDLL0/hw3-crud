import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pinoHttp from 'pino-http';
import pino from 'pino';
import { initMongoConnection } from './db/initMongoConnection.js';
import { Contact } from './db/models/Contact.js';

const logger = pino();

const setupServer = async () => {
    await initMongoConnection();

    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(pinoHttp({ logger }));

    app.get('/contacts', async (req, res) => {
        const contacts = await Contact.find();

        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return res.status(404).json({
                status: 404,
                message: 'Contact not found',
            });
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    });

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

setupServer();

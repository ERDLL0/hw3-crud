import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';

export const getContactsController = async (req, res, next) => {
    try {
        const { page, perPage, sortBy, sortOrder, isFavourite, type } = req.query;

        // Filtreleri oluştur
        const filter = {};
        if (isFavourite !== undefined) {
            filter.isFavourite = isFavourite === 'true';
        }
        if (type) {
            filter.contactType = type;
        }

        const contactsData = await contactServices.getAllContacts({
            page,
            perPage,
            sortBy,
            sortOrder,
            filter,
        });

        res.status(200).json({
            status: 200,
            message: 'Successfully found contacts!',
            data: contactsData,
        });
    } catch (error) {
        next(error);
    }
};

export const getContactByIdController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const contact = await contactServices.getContactById(contactId);

        if (!contact) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 200,
            message: `Successfully found contact with id ${contactId}!`,
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export const createContactController = async (req, res, next) => {
    try {
        const contact = await contactServices.createContact(req.body);

        res.status(201).json({
            status: 201,
            message: 'Successfully created a contact!',
            data: contact,
        });
    } catch (error) {
        next(error);
    }
};

export const updateContactController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactServices.updateContact(contactId, req.body);

        if (!result) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(200).json({
            status: 200,
            message: 'Successfully updated a contact!',
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const deleteContactController = async (req, res, next) => {
    try {
        const { contactId } = req.params;
        const result = await contactServices.deleteContact(contactId);

        if (!result) {
            throw createHttpError(404, 'Contact not found');
        }

        res.status(204).send();
    } catch (error) {
        next(error);
    }
};

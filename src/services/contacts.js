import { Contact } from '../db/models/contact.js';

export const getAllContacts = async ({
    page = 1,
    perPage = 10,
    sortOrder = 'asc',
    sortBy = '_id',
    filter = {},
}) => {
    const limit = parseInt(perPage, 10);
    const skip = (parseInt(page, 10) - 1) * limit;

    // Sıralama yönünü belirle
    const sortDirection = sortOrder === 'desc' ? -1 : 1;

    // Toplam veri sayısını bul (filtreye göre)
    const totalItems = await Contact.countDocuments(filter);

    // Verileri çek
    const contacts = await Contact.find(filter)
        .sort({ [sortBy]: sortDirection })
        .skip(skip)
        .limit(limit);

    const totalPages = Math.ceil(totalItems / limit);

    return {
        data: contacts,
        page: parseInt(page, 10),
        perPage: limit,
        totalItems,
        totalPages,
        hasPreviousPage: page > 1,
        hasNextPage: page < totalPages,
    };
};

export const getContactById = async (contactId) => {
    return await Contact.findById(contactId);
};

export const createContact = async (payload) => {
    return await Contact.create(payload);
};

export const updateContact = async (contactId, payload) => {
    return await Contact.findByIdAndUpdate(contactId, payload, { new: true });
};

export const deleteContact = async (contactId) => {
    return await Contact.findByIdAndDelete(contactId);
};

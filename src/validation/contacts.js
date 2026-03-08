import Joi from 'joi';

export const createContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).required().messages({
        'string.min': 'Name must have at least 3 characters',
        'string.max': 'Name must have at most 20 characters',
        'any.required': 'Name is a required field'
    }),
    phoneNumber: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid('work', 'home', 'personal').required()
});

export const updateContactSchema = Joi.object({
    name: Joi.string().min(3).max(20).optional(),
    phoneNumber: Joi.string().min(3).max(20).optional(),
    email: Joi.string().email().optional(),
    isFavourite: Joi.boolean().optional(),
    contactType: Joi.string().valid('work', 'home', 'personal').optional()
});

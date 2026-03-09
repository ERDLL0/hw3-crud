import { Router } from 'express';
import {
    getContactsController,
    getContactByIdController,
    createContactController,
    updateContactController,
    deleteContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import { createContactSchema, updateContactSchema } from '../validation/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

const router = Router();

// Tüm kontakları getir (Sayfalandırma, sıralama, filtreleme dahil)
router.get('/', ctrlWrapper(getContactsController));

// Tek bir kontak getir (isValidId eklendi)
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

// Yeni kontak ekle (validateBody eklendi)
router.post('/', validateBody(createContactSchema), ctrlWrapper(createContactController));

// Kontağı güncelle (isValidId ve validateBody eklendi)
router.patch(
    '/:contactId',
    isValidId,
    validateBody(updateContactSchema),
    ctrlWrapper(updateContactController)
);

// Kontağı sil (isValidId eklendi)
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;

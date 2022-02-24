const express = require('express');
const router = express.Router();
const {tokenVerify} = require("../../middlewares")

const {
  contacts: {
    getAllContacts,
    showContactById,
    addNewContact,
    deleteContact,
    changeContact,
    updateStatusContact
  }
} = require('../../controllers')

router.get('/', tokenVerify, getAllContacts);

router.get('/:contactId', tokenVerify, showContactById);

router.post('/', tokenVerify, addNewContact);

router.delete('/:contactId', tokenVerify, deleteContact);

router.put('/:contactId', tokenVerify, changeContact);

router.patch('/:contactId/favorite', tokenVerify, updateStatusContact);

module.exports = router;

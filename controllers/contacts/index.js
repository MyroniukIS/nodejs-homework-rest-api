const getAllContacts = require('./getAllContacts')
const showContactById = require('./showContactById')
const addNewContact = require('./addNewContact')
const deleteContact = require('./deleteContact')
const changeContact = require('./changeContact')
const updateStatusContact = require('./updateStatusContact')

module.exports = {
    getAllContacts,
    showContactById,
    addNewContact,
    deleteContact,
    changeContact,
    updateStatusContact
};
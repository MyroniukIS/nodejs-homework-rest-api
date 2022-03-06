const CreateError = require('http-errors');
const {contact: {Contact, joiSchema}} = require('../../models')

const addNewContact = async (req, res, next) => {
const {_id} = req.user
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) throw new CreateError(400, error.message);
    const newContact = await Contact.create({ ...req.body, owner: _id});
    console.log(newContact);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  };
};

module.exports = addNewContact;
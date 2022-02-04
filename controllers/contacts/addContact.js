const createError = require("http-errors");

const { Contact, contactScheme } = require("../../models/contacts");

const addContact = async (req, res, next) => {
  try {
    const { error } = contactScheme.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
};

module.exports = addContact;

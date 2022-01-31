const createError = require("http-errors");

const { Contact, contactScheme } = require("../../models/contacts");

const changeContactById = async (req, res, next) => {
  try {
    const { error } = contactScheme.validate(req.body);
    if (error) {
      throw new createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw new createError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = changeContactById;

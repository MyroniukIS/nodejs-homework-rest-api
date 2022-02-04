const createError = require("http-errors");

const { Contact, favoriteScheme } = require("../../models/contacts");

const updateStatusContact = async (req, res, next) => {
  try {
    const { error } = favoriteScheme.validate(req.body);
    if (error) {
      throw new createError(400, (error.message = "missing field favorite"));
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

module.exports = updateStatusContact;

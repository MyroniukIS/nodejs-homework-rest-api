const createError = require("http-errors");
const { Contact } = require("../../models/contacts");

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    if (!result) {
      throw new createError(404, "Not Found");
    }
    res.json({ message: "Contact deleted" });
    // res.json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = deleteContact;

const { Contact } = require("../../models/contacts");

const getAllContacts = async (req, res, next) => {
  try {
    const {page = 1, limit = 20} = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const result = await Contact.find(
      {owner: _id},
       "-createdAt -updatedAt", {skip, limit: +limit}).populate("owner", "email");
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAllContacts;

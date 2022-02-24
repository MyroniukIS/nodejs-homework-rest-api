const CreateError = require('http-errors');
const {contact: {Contact}} = require('../../models')

const deleteContact = async (req, res, next) => {
  const{_id} = req.user
  const { contactId } = req.params
  try {
    const result = await Contact.findOneAndDelete({$and: [{_id: contactId}, {owner:_id}]});
    if (!result) throw new CreateError(404, 'Not found');
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  };
};

module.exports = deleteContact;
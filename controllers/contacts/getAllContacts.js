const { contact: { Contact } } = require('../../models')
const { BadRequest} = require('http-errors')

const getAllContacts = async (req, res, next) => {
  const { _id } = req.user
  let { page = 1, limit = 20, favorite } = req.query
  limit = Number(limit) > 20 ? 20 : Number(limit)
  const skip = (page - 1) * limit
  try {
    if (favorite === 'true' || favorite === 'false') {
      const dbContacts = await Contact.find({ $and: [{ owner: _id }, { favorite: favorite }] }, "", { skip, limit: Number(limit) }).populate("owner", "_id email")
      return res.json(dbContacts);
    }

    if (favorite !== 'true' && favorite !== 'false' && favorite) {
      throw new BadRequest('The value must be true or false')
    }

    const dbContacts = await Contact.find({ owner: _id }, "", { skip, limit: Number(limit) }).populate("owner", "_id email")
    res.json(dbContacts)
    
  } catch (error) {
    next(error);
  };
};

module.exports = getAllContacts;
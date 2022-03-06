const CreateError = require('http-errors');
const { contact: { Contact, favoriteJoiSchema } } = require('../../models')

const updateStatusContact = async (req, res, next) => {
    const { contactId } = req.params
    const {_id} = req.user
    try {
        const { error } = favoriteJoiSchema.validate(req.body);
        if (error) throw new CreateError(400, error.message = "missing field favorite");
        const { favorite } = req.body
        const result = await Contact.findOneAndUpdate({$and: [{_id: contactId}, {owner: _id}]}, { favorite }, { new: true });
        if (!result) throw new CreateError(404, 'Not found');
        res.json(result);
    } catch (error) {
        next(error);
    };
};

module.exports = updateStatusContact;
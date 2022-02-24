const CreateError = require('http-errors');
const {contact: {Contact, joiSchema}} = require('../../models')

const changeContact = async (req, res, next) => {
    const { contactId } = req.params;
    const { _id } = req.user;
    try {
        const { error } = joiSchema.validate(req.body);
        if (error) throw new CreateError(400, error.message);
        const result = await Contact.findOneAndUpdate({$and: [{_id: contactId}, {owner: _id}]}, req.body, {new: true});
        if (!result) throw new CreateError(404, 'Not found');
        res.json(result);
    } catch (error) {
        next(error);
    };
};

module.exports = changeContact;
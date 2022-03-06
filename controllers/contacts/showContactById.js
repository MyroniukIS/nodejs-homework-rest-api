const CreateError = require('http-errors');
const {contact: {Contact}} = require('../../models')

const showContactById = async (req, res, next) => {
    const {_id} = req.user
    const{contactId} = req.params
    try {
        const result = await Contact.find({$and: [{_id: contactId}, {owner:_id}]}).populate("owner", "_id email")
        if (!result) throw new CreateError(404, 'Not found');
        res.json(result);
    } catch (error) {
        next(error);
    };
};

module.exports = showContactById;
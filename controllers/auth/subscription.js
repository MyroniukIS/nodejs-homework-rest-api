const { BadRequest, NotFound} = require('http-errors')
const {user: {User, joiSubscriptionSchema}} = require("../../models")

async function subscriptions(req, res, next) {
    const { _id } = req.user
    try {
        const { error } = joiSubscriptionSchema.validate(req.body)
        if (error) throw new BadRequest(error.message)
        
        const { subscription } = req.body
        const result = await User.findOneAndUpdate(_id, { subscription }, { new: true })
        if (!result) throw new NotFound('Not found')
        res.json(result);
    } catch (error) {
        next(error)
    }
};

module.exports = subscriptions
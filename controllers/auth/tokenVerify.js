const { user: { User } } = require("../../models")
const {NotFound} = require('http-errors')

const tokenVerification = async (req, res, next) => {
try {
    const { verificationToken } = req.params;
    const user = await User.findOne({verificationToken})

    if (!user) throw NotFound('User not found')

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: ''})

    res.json({message: 'Verification successful'})
} catch (error) {
    next(error)
}
}

module.exports = tokenVerification
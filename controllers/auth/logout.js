const { user: { User } } = require('../../models')

async function logout(req, res, next) {
    const { _id } = req.user;
    console.log("object");
    await User.findByIdAndUpdate({_id: _id} , { token: null })
    res.status(204).json()
}

module.exports = logout;
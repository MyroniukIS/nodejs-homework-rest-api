const { user: {User, joiEmailVerifySchema } } = require('../../models')
const { BadRequest } = require('http-errors')
const {sendMail} = require('../../helpers')

const emailVerify = async (req, res, next) => {
    try {
        const { error } = joiEmailVerifySchema.validate(req.body)
        if (error) throw BadRequest({ "message": "missing required field email" })
        
        const { email } = req.body
        const user = await User.findOne({ email })
        
        if(user.verify) throw BadRequest ({message: "Verification has already been passed"})
        const mail = {
            to: email,
            subject: "Пдтверждение почты",
            html: `<a target='_blank' href='http://localhost:3000/api/users/${user.verificationToken}'>Go to link</a>`
        }

        await sendMail(mail)

        res.json({message: "Verification has already been passed"})
    } catch (error) {
        next(error)
    }
}

module.exports = emailVerify
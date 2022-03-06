const { user: { User, joiLoginSchema } } = require('../../models')
const { BadRequest, Unauthorized } = require('http-errors')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const {SECRET_KEY} = process.env

const login = async (req, res, next) => {
    try {
        const { error } = joiLoginSchema.validate(req.body)
        if (error) {
            throw new BadRequest({ message: error.message })
        }

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user.verify) {
            throw Unauthorized('Email is not verify')
        }
    
        const passCompare = bcrypt.compareSync(password, user.password)

        if (!user || !passCompare) {
            throw new Unauthorized("Email or password is wrong")
        }

        const payload = {
            id: user._id
        }
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" })
        await User.findByIdAndUpdate(user._id, { token })
        res.json({
            "token": token,
            "user": {
                "email": email,
            }
        })

    } catch (error) {
        next(error)
    }
}

module.exports = login
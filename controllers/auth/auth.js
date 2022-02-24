const {Conflict, BadRequest} = require('http-errors')
const { user: { User, joiSchema } } = require('../../models')
const {v4} = require('uuid')
const bcrypt = require('bcryptjs')
const { sendMail } = require('../../helpers')

const gravatar = require('gravatar');

const register = async (req, res, next) => {
    try {
        const { error } = joiSchema.validate(req.body);
        if (error) {
            throw new BadRequest(error.message)
        };

        const { email, password} = req.body;
        const user = await User.findOne({ email });
        if (user) {
            throw new Conflict({"message": "Email in use"});
        }
        const haschPass = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        const avatarURL = gravatar.url('email')
        const verificationToken = v4()
        await User.create({ email, password: haschPass, avatarURL, verificationToken })
        
        const mail = {
            to: email,
            subject: "Пдтверждение почты",
            html: `<a target='_blank' href='http://localhost:3000/api/users/verify/${verificationToken}'>Go to link</a>`
        }

        await sendMail(mail)
        
        res.status(201).json({
            "user": { "email": email }
        });

    } catch (error) {
        next(error)
    }
};

module.exports = register;


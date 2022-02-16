const createError = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar"); 

const {User, schemas} = require("../../models/users");

const signup = async(req, res, next) => {
    try {
        const {error} = schemas.register.validate(req.body);
        if (error) {
            throw new createError(400, error.message);
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (user) {
            throw new createError(409, "Email in use");
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const avatarURL = gravatar.url(email);
        const result = await User.create({
            email, 
            avatarURL,
            password: hashPassword, 
        });
        console.log("create")

        const {subscription} = result;
        
        res.status(201).json({
            user: {
                email,
                subscription,
            }
        })
    } catch (error) {
        next(error)
    }
};

module.exports = signup;
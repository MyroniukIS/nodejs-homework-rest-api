const express = require("express");
const createError = require("http-errors");
const bcrypt = require("bcryptjs");

const {User, schemas} = require("../../models/users");

const router = express.Router();

router.post("/signup", async(req, res, next) => {
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
        const result = await User.create({
            email, 
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
});

router.post("/login", async(req, res, next) => {
    try {
        const {error} = schemas.register.validate(req.body);
        if (error) {
            throw new createError(400, error.message);
        }
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if (!user) {
            throw new createError(401, "Email or password is wrong");
        }
        const compareResult = await bcrypt.compare(password, user.password);
        if (!compareResult) {
            throw new createError(401, "Email or password is wrong");
        }
        const {subscription} = user;
        
        const token = "2345dtd5768.69869tff576r5i.87687rtfgfv78";
        res.json({
            token,
            user: {
                email,
                subscription,
            }
        })
    } catch (error) {
        next(error)
    }
});

module.exports = router; 
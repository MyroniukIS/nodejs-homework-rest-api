const express = require('express')
const router = express.Router()
const {tokenVerify, uploadAvatar} = require("../../middlewares")

const {
    auth: {
        register, 
        login,
        currentUser,
        logout,
        subscriptions,
        avatar,
        tokenVerification,
        emailVerify
    }
} = require('../../controllers');


router.post('/signup', register);
router.post('/login', login)
router.get('/current', tokenVerify, currentUser)
router.get('/logout', tokenVerify, logout)
router.patch('/', tokenVerify, subscriptions)
router.patch('/avatars', tokenVerify, uploadAvatar.single('avatar'), avatar)
router.get('/verify/:verificationToken', tokenVerification);
router.post('/verify', emailVerify);

module.exports = router;
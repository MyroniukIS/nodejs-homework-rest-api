const register = require('./auth')
const login = require('./login')
const currentUser = require('./currentUser')
const logout = require('./logout')
const subscriptions = require('./subscription')
const avatar = require('./avatar')
const tokenVerification = require('./tokenVerify')
const emailVerify = require('./emailVerify')

module.exports = {
    register,
    login,
    currentUser,
    logout,
    subscriptions,
    avatar,
    tokenVerification,
    emailVerify
}
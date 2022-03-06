const currentUser = async (req, res, next) => {
    const {email} = req.user
    console.log(req.user);
    res.json({
        "email": email
    })
}

module.exports = currentUser
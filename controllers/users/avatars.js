const path = require("path");
const fs = require("fs").promises;
const {User} = require("../../models/users");
const {changingSizeAvatar} = require("../../middlewares")

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const avatars = async(req, res, next) => {
    const {_id} = req.user;
    const {path: tempUpload, filename} = req.file;
    try {
        await changingSizeAvatar(tempUpload, tempUpload, 250, 250);
        const [extention] = filename.split(".").reverse();
        const newFileName = `${_id}.${extention}`;
        const resultUpload = path.join(avatarsDir, newFileName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join("avatars", newFileName);
        await User.findByIdAndUpdate(_id, {avatarURL});
        res.json({
            avatarURL
        })
    } catch (error) {
        next(error);
    }
};
module.exports = avatars;
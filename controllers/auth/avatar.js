const path = require('path')
const fs = require('fs/promises')
const { user: { User } } = require('../../models')
const {resizePhoto} = require('../../middlewares')

    
async function avatar(req, res, next) {
    const { path: pathUpload, filename } = req.file
    const { _id } = req.user
    const publicAvatars = path.join(__dirname, '../../', 'public', 'avatars');
    try {
        await resizePhoto(pathUpload, pathUpload, 250, 250)
        const [_, extension] = filename.split('.');
        const newName = `${_id}.${extension}`;
        const newPath = path.join(publicAvatars, newName);
        await fs.rename(pathUpload, newPath);
        const avatarURL = path.join('avatar', newName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({avatarURL})
    } catch (error) {
        next(error)
    }
};

module.exports = avatar
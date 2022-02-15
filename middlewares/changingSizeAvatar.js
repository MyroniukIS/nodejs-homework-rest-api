const jimp = require('jimp')

async function changingSizeAvatar(path, newPath, width = jimp.AUTO, height = jimp.AUTO) {
    const newAvatar = await jimp.read(path)
            await newAvatar.resize(width, height)
            await newAvatar.writeAsync(newPath)
}
module.exports = changingSizeAvatar;
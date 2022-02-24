const Jimp = require('jimp')

async function resizePhoto(path, newPath, width = Jimp.AUTO, height = Jimp.AUTO) {
    const resizeAvatar = await Jimp.read(path)
            await resizeAvatar.resize(width, Jimp.AUTO)
            await resizeAvatar.writeAsync(newPath)
}
module.exports = resizePhoto
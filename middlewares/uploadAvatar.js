const multer = require('multer')
const path = require('path')

const tmpAvatars = path.join(__dirname, '../', 'tmp')   

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(tmpAvatars))
    },
    filename: (req, file, cb) => {
        const [name, extension] = file.originalname.split('.');
        cb(null, `${name}.${extension}`)
    }
})

const uploadAvatar = multer({ storage })

module.exports = uploadAvatar
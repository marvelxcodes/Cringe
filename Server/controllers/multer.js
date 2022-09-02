import multer from 'multer'

const directory = (filename) => {
    return (
        multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "public")
        },
        filename: (req, file, cb) => {
            cb(null, filename)
        }
    })
)}

const upload = (filename) => {
    multer({
        storage: directory(filename)
    }).single("file")
}

export default upload
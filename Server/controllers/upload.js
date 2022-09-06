import multer from 'multer'

const storage = (filename) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
        cb(null, 'public/')
    },
        filename: (req, file, cb) => {
        cb(null, filename+file.originalname.substring(file.originalname.lastIndexOf('.') + 1))
    }
  })
}
  
const upload = (filename) => {
    return multer({ storage: storage(filename) })
}

export default upload
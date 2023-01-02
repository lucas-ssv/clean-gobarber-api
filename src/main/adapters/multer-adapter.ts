import multer, { Multer } from 'multer'

export const adaptMulter = (): Multer => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const filePath = 'uploads/'
        cb(null, filePath)
      },
      filename: (req, file, cb) => {
        const [, extension] = file.mimetype.split('/')
        const fileName = `${Date.now()}.${extension}`
        cb(null, fileName)
      }
    })
  })
}
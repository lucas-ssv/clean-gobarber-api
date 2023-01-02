import multer, { Multer } from 'multer'
import path from 'path'

export const adaptMulter = (): Multer => {
  return multer({
    storage: multer.diskStorage({
      destination: (req, file, cb) => {
        const filePath = 'uploads/'
        cb(null, filePath)
      },
      filename: (req, file, cb) => {
        const [, extension] = file.mimetype.split('/')
        const fileName = `${(new Date().getTime() / 1000 | 0)}.${extension}`
        cb(null, fileName)
      }
    })
  })
}
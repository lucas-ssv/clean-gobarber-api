import { adaptRouteFile } from '../adapters/express-route-file-adapter'
import { makeAddAvatarController } from '../factories/controllers/avatar-controller-factory/avatar-controller-factory'
import { Router } from 'express'
import multer from 'multer'

const upload = multer({ dest: 'uploads/' })

export default (router: Router): void => {
  router.post('/add-avatar', upload.single('avatar'), adaptRouteFile(makeAddAvatarController()))
}
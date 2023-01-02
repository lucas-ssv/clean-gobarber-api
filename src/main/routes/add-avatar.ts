import { adaptMulter } from '../adapters/multer-adapter'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeAddAvatarController } from '../factories/controllers/avatar-controller-factory/avatar-controller-factory'
import { Router } from 'express'

const upload = adaptMulter()

export default (router: Router): void => {
  router.post('/add-avatar', upload.single('avatar'), adaptRoute(makeAddAvatarController()))
}
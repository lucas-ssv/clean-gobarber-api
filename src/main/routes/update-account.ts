import { adaptRoute } from '../adapters/express-route-adapter'
import { makeUpdateAccountController } from '../factories/controllers/update-account-controller-factory/update-account-controller-factory'
import { auth } from '../middlewares/auth/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.put('/update-account/:id', auth, adaptRoute(makeUpdateAccountController()))
}
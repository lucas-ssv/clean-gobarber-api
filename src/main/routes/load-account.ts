import { auth } from '../middlewares/auth/auth'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadAccountController } from '../factories/controllers/load-account-controller-factory/load-account-controller-factory'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/load-account', auth, adaptRoute(makeLoadAccountController()))
}
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeLoadAccountsController } from '../factories/controllers/load-accounts-controller-factory/load-accounts-controller-factory'
import { auth } from '../middlewares/auth/auth'
import { Router } from 'express'

export default (router: Router): void => {
  router.get('/load-accounts', auth, adaptRoute(makeLoadAccountsController()))
}
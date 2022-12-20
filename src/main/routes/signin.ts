import { makeSignInController } from '../factories/controllers/signin-controller-factory/signin-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router) => {
  router.post('/signin', adaptRoute(makeSignInController()))
}
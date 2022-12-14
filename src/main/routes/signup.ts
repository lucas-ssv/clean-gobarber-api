import { makeSignUpController } from '../factories/controllers/signup-controller-factory/signup-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
}
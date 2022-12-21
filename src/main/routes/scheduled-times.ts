import { makeLoadScheduledTimesController } from '../factories/controllers/scheduled-times-controller-factory/scheduled-times-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { Router } from 'express'

export default (router: Router) => {
  router.get('/scheduled-times', adaptRoute(makeLoadScheduledTimesController()))
}
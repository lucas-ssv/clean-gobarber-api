import { makeLoadScheduledTimesController } from '../factories/controllers/scheduled-times-controller-factory/scheduled-times-controller-factory'
import { makeScheduledTimesController } from '../factories/controllers/add-scheduled-times-controller-factory/add-scheduled-times-controller-factory'
import { adaptRoute } from '../adapters/express-route-adapter'
import { auth } from '../middlewares/auth/auth'
import { Router } from 'express'

export default (router: Router) => {
  router.get('/scheduled-times', auth, adaptRoute(makeLoadScheduledTimesController()))
  router.post('/scheduled-times', auth, adaptRoute(makeScheduledTimesController()))
}
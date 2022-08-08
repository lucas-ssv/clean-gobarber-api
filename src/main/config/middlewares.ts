import { bodyParser } from '../middlewares/body-parser/body-parser'
import { contentType } from '../middlewares/content-type/content-type'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
}

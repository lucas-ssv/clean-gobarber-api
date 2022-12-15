import { bodyParser } from '../middlewares/body-parser/body-parser'
import { contentType } from '../middlewares/content-type/content-type'
import { cors } from '../middlewares/cors/cors'
import { Express } from 'express'

export const setupMiddlewares = (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
  app.use(cors)
}
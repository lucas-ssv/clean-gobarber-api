import env from '../../config/env'
import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from 'express'

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authToken = req.headers.authorization
  if (!authToken) {
    return res.status(401).json({ error: 'Token is missing.' })
  }
  const [, token] = authToken.split(' ')
  try {
    jwt.verify(token, env.secret)
    return next()
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token.' })
  }
}
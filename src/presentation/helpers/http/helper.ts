import { EmailInUseError } from '../../errors/email-in-use-error'
import { UnauthorizedError } from '../../errors/unauthorized-error'
import { HttpResponse } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: data
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: error
})

export const emailInUseError = (): HttpResponse => ({
  statusCode: 400,
  body: new EmailInUseError()
})

export const unauthorized = (): HttpResponse => ({
  statusCode: 401,
  body: new UnauthorizedError()
})

import { EmailInUseError } from '../../errors/email-in-use-error'
import { HttpResponse, HttpStatusCode } from '../../protocols/http'

export const ok = (data: any): HttpResponse => ({
  statusCode: HttpStatusCode.ok,
  body: data
})

export const created = (): HttpResponse => ({
  statusCode: HttpStatusCode.created
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: error
})

export const emailInUseError = (): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: new EmailInUseError()
})

export const notFound = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.notFound,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.serverError,
  body: error
})
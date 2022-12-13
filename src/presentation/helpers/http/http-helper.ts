import { HttpResponse, HttpStatusCode } from '../../protocols/http'

export const created = (): HttpResponse => ({
  statusCode: HttpStatusCode.created
})

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: error
})
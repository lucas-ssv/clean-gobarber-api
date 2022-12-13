import { HttpResponse, HttpStatusCode } from '../../protocols/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: HttpStatusCode.badRequest,
  body: error
})
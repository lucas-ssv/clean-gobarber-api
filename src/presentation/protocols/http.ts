export interface HttpRequest {
  body?: any
  file?: any
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: any
}

export enum HttpStatusCode {
  ok = 200,
  created = 201,
  badRequest = 400,
  notFound = 404,
  serverError = 500
}
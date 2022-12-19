export interface HttpRequest {
  body: any
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: any
}

export enum HttpStatusCode {
  created = 201,
  badRequest = 400,
  notFound = 404,
  serverError = 500
}
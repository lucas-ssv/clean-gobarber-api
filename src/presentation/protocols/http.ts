export interface HttpRequest {
  body: any
}

export interface HttpResponse {
  statusCode: HttpStatusCode
  body?: any
}

export enum HttpStatusCode {
  badRequest = 400
}
import { Authentication } from '../../../../domain/usecases/authentication'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoginController implements Controller {
  constructor (private readonly authentication: Authentication) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    await this.authentication.auth(email, password)
    return null
  }
}

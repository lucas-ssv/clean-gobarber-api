import { Authentication } from '../../../../domain/usecases/authentication'
import { badRequest, ok, unauthorized } from '../../../helpers/http/helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class LoginController implements Controller {
  constructor (
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { email, password } = httpRequest.body
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const authAccount = await this.authentication.auth(email, password)
    if (!authAccount) {
      return unauthorized()
    }
    return ok(authAccount)
  }
}

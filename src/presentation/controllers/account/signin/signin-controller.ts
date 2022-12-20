import { Authentication } from '../../../../domain/usecases/authentication'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { badRequest, notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class SignInController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { email, password } = httpRequest.body
      const authAccount = await this.authentication.auth(email, password)
      if (!authAccount) {
        return notFound(new InvalidAccountError())
      }
      return ok(authAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}
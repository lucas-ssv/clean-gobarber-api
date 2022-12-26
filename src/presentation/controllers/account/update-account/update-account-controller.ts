import { UpdateAccount } from '../../../../domain/usecases/update-account'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class UpdateAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateAccount: UpdateAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request = httpRequest.body
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const account = await this.updateAccount.update(request)
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
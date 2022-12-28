import { UpdateAccount } from '../../../../domain/usecases/update-account'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { badRequest, notFound, ok, serverError } from '../../../helpers/http/http-helper'
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
      const { email } = httpRequest.body
      const error = this.validation.validate({ email })
      if (error) {
        return badRequest(error)
      }
      const account = await this.updateAccount.update(httpRequest.body)
      if (!account) {
        return notFound(new InvalidAccountError())
      }
      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
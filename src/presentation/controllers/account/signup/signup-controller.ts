import { AddAccount } from '../../../../domain/usecases/add-account'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'
import { badRequest, created, emailInUseError, serverError } from '../../../helpers/http/helper'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password, isBarber } = httpRequest.body
      const account = await this.addAccount.add({ name, email, password, isBarber })
      if (!account) {
        return emailInUseError()
      }
      return created(account)
    } catch (error) {
      return serverError(error)
    }
  }
}

import { UpdateAccount } from '../../../../domain/usecases/update-account'
import { badRequest } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class UpdateAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateAccount: UpdateAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const request = httpRequest.body
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.updateAccount.update(request)
    return null as any
  }
}
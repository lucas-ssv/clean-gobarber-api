import { LoadAccount } from '../../../../domain/usecases/load-account'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { notFound, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'

export class LoadAccountController implements Controller {
  constructor (private readonly loadAccount: LoadAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id } = httpRequest.params
      const account = await this.loadAccount.load(id)
      if (!account) {
        return notFound(new InvalidAccountError())
      }
      const { password, ...restAccount } = account
      return ok(restAccount)
    } catch (error) {
      return serverError(error)
    }
  }
}
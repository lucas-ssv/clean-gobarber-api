import { LoadAccounts } from '../../../../domain/usecases/load-accounts'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class LoadAccountsController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadAccounts: LoadAccounts
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request = httpRequest.body
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const accounts = await this.loadAccounts.loadAll(request)
      return ok(accounts)
    } catch (error) {
      return serverError(error)
    }
  }
}
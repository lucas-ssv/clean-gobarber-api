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
      const results = await this.loadAccounts.loadAll(request)
      const accounts = results.map(account => {
        const { password, email, isBarber, ...restAccount } = account
        return {
          ...restAccount
        }
      })
      return ok(accounts)
    } catch (error) {
      return serverError(error)
    }
  }
}
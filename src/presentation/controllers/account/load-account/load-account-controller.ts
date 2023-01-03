import { Account } from '../../../../domain/models/account'
import { LoadByEmail } from '../../../../domain/usecases/load-by-email'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { badRequest, notFound } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class LoadAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly loadByEmail: LoadByEmail<Account>
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    const { email } = httpRequest.body
    const account = await this.loadByEmail.loadByEmail(email)
    if (!account) {
      return notFound(new InvalidAccountError())
    }
    return await Promise.resolve(null) as any
  }
}
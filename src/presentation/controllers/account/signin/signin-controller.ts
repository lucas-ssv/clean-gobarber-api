import { Account } from '../../../../domain/models/account'
import { LoadByEmail } from '../../../../domain/usecases/load-by-email'
import { badRequest } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class SignInController implements Controller {
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
    await this.loadByEmail.loadByEmail(email)
    return await Promise.resolve(null) as any
  }
}
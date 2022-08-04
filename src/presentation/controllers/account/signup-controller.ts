import { AddAccount } from '../../../domain/usecases/add-account'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return {
        statusCode: 400,
        body: error
      }
    }
    const { name, email, password, isBarber } = httpRequest.body
    await this.addAccount.add({
      name,
      email,
      password,
      isBarber
    })
    return null
  }
}

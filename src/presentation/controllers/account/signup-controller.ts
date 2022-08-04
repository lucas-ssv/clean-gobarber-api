import { AddAccount } from '../../../domain/usecases/add-account'
import { MissingParamError } from '../../errors/missing-param-error'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class SignUpController implements Controller {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    this.validation.validate(httpRequest.body)
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation', 'isBarber']
    for (const field of requiredFields) {
      if (httpRequest.body[field] === undefined) {
        return {
          statusCode: 400,
          body: new MissingParamError(field)
        }
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

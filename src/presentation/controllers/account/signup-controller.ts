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
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return {
          statusCode: 400,
          body: error
        }
      }
      const { name, email, password, isBarber } = httpRequest.body
      const account = await this.addAccount.add({
        name,
        email,
        password,
        isBarber
      })
      return {
        statusCode: 201,
        body: account
      }
    } catch (error) {
      return {
        statusCode: 500,
        body: error
      }
    }
  }
}

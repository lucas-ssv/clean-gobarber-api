import { AddAccount } from '../../../domain/usecases/add-account'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
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

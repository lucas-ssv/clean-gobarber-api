import { AddAccount } from "../../../../domain/usecases/add-account";
import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { Validation } from "../../../protocols/validation";

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return {
        statusCode: 400,
        body: error
      }
    }
    await this.addAccount.add(httpRequest.body)
    return await Promise.resolve(null) as any
  }
}
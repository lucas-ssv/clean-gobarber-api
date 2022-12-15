import { AddAccount } from "../../../../domain/usecases/add-account";
import { badRequest, created, emailInUseError, serverError } from "../../../helpers/http/http-helper";
import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";
import { Validation } from "../../../protocols/validation";

export class SignUpController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAccount: AddAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const account = await this.addAccount.add(httpRequest.body)
      if (!account) {
        return emailInUseError()
      }
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
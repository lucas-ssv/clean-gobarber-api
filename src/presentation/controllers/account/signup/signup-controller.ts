import { AddAccount } from "../../../../domain/usecases/add-account";
import { Controller } from "../../../protocols/controller";
import { HttpRequest, HttpResponse } from "../../../protocols/http";

export class SignUpController implements Controller {
  constructor (private readonly addAccount: AddAccount) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.addAccount.add(httpRequest.body)
    return await Promise.resolve(null) as any
  }
}
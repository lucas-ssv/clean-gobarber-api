import { UpdateAccount } from '../../../../domain/usecases/update-account'
import { CompareFieldsError } from '../../../errors/compare-fields-error'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { MinLengthFieldError } from '../../../errors/min-length-field-error'
import { RequiredFieldError } from '../../../errors/required-field-error'
import { badRequest, noContent, notFound, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class UpdateAccountController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly updateAccount: UpdateAccount
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request = httpRequest.body
      const { id } = httpRequest.params
      const error = this.validation.validate(request)
      if (error instanceof RequiredFieldError) {
        return badRequest(error)
      }
      if (request.currentPassword) {
        if (error instanceof MinLengthFieldError) {
          return badRequest(error)
        }
      }
      if (request.newPassword) {
        if (error instanceof CompareFieldsError || error instanceof MinLengthFieldError) {
          return badRequest(error)
        }
      }
      const account = await this.updateAccount.update({ id, ...request })
      if (!account) {
        return notFound(new InvalidAccountError())
      }
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
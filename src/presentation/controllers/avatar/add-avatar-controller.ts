import { AddAvatar } from '../../../domain/usecases/add-avatar'
import { InvalidAccountError } from '../../errors/invalid-account-error'
import { badRequest, notFound, ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class AddAvatarController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAvatar: AddAvatar
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request = Object.assign({}, httpRequest.body, {
        url: httpRequest.file.path
      })
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const avatar = await this.addAvatar.add(request)
      if (!avatar) {
        return notFound(new InvalidAccountError())
      }
      return ok(avatar)
    } catch (error) {
      return serverError(error)
    }
  }
}
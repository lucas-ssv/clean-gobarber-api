import { AddAvatar } from '../../../domain/usecases/add-avatar'
import { badRequest, ok } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'
import { Validation } from '../../protocols/validation'

export class AddAvatarController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addAvatar: AddAvatar
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const request = httpRequest.file
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    const avatar = await this.addAvatar.add(request)
    return ok(avatar)
  }
}
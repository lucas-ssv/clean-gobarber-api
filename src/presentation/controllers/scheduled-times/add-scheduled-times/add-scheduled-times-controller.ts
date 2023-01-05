import { AddScheduledTimes } from '../../../../domain/usecases/add-scheduled-times'
import { badRequest } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class AddScheduledTimesController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addScheduledTimes: AddScheduledTimes
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const request = httpRequest.body
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
    await this.addScheduledTimes.add(request)
    return await Promise.resolve(null) as any
  }
}
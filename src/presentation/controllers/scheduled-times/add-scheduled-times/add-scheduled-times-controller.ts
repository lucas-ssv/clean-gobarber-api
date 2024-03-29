import { AddScheduledTimes } from '../../../../domain/usecases/add-scheduled-times'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { badRequest, created, notFound, serverError } from '../../../helpers/http/http-helper'
import { Controller } from '../../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../../protocols/http'
import { Validation } from '../../../protocols/validation'

export class AddScheduledTimesController implements Controller {
  constructor (
    private readonly validation: Validation,
    private readonly addScheduledTimes: AddScheduledTimes
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const request = httpRequest.body
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const scheduledTimes = await this.addScheduledTimes.add(request)
      if (!scheduledTimes) {
        return notFound(new InvalidAccountError())
      }
      return created()
    } catch (error) {
      return serverError(error)
    }
  }
}
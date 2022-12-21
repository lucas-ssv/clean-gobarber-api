import { LoadScheduledTimes } from '../../../domain/usecases/load-scheduled-times'
import { ok, serverError } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoadScheduledTimesController implements Controller {
  constructor (private readonly loadScheduledTimes: LoadScheduledTimes) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const scheduledTimes = await this.loadScheduledTimes.loadAll()
      return ok(scheduledTimes)
    } catch (error) {
      return serverError(error)
    }
  }
}
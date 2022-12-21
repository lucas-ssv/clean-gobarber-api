import { LoadScheduledTimes } from '../../../domain/usecases/load-scheduled-times'
import { ok } from '../../helpers/http/http-helper'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoadScheduledTimesController implements Controller {
  constructor (private readonly loadScheduledTimes: LoadScheduledTimes) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const scheduledTimes = await this.loadScheduledTimes.loadAll()
    return ok(scheduledTimes)
  }
}
import { LoadScheduledTimes } from '../../../domain/usecases/load-scheduled-times'
import { Controller } from '../../protocols/controller'
import { HttpRequest, HttpResponse } from '../../protocols/http'

export class LoadScheduledTimesController implements Controller {
  constructor (private readonly loadScheduledTimes: LoadScheduledTimes) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.loadScheduledTimes.loadAll()
    return null as any
  }
}
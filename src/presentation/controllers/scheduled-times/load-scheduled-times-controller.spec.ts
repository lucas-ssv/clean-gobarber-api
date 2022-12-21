import { mockScheduledTimes } from '../../../domain/tests/scheduled-times/mock-scheduled-times'
import { ok } from '../../helpers/http/http-helper'
import { LoadScheduledTimesStub } from '../../tests/scheduled-times/mock-load-scheduled-times'
import { LoadScheduledTimesController } from './load-scheduled-times-controller'

describe('LoadScheduledTimesController', () => {
  test('Should call LoadScheduledTimes', async () => {
    const loadScheduledTimesStub = new LoadScheduledTimesStub()
    const loadSpy = jest.spyOn(loadScheduledTimesStub, 'loadAll')
    const sut = new LoadScheduledTimesController(loadScheduledTimesStub)
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 if return a list of scheduled times', async () => {
    const loadScheduledTimesStub = new LoadScheduledTimesStub()
    const sut = new LoadScheduledTimesController(loadScheduledTimesStub)
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockScheduledTimes()))
  })
})
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
})
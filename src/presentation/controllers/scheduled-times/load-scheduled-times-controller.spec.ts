import { mockScheduledTimes } from '../../../domain/tests/scheduled-times/mock-scheduled-times'
import { LoadScheduledTimes } from '../../../domain/usecases/load-scheduled-times'
import { ok } from '../../helpers/http/http-helper'
import { LoadScheduledTimesStub } from '../../tests/scheduled-times/mock-load-scheduled-times'
import { LoadScheduledTimesController } from './load-scheduled-times-controller'

type SutTypes = {
  sut: LoadScheduledTimesController
  loadScheduledTimesStub: LoadScheduledTimes
}

const makeSut = (): SutTypes => {
  const loadScheduledTimesStub = new LoadScheduledTimesStub()
  const sut = new LoadScheduledTimesController(loadScheduledTimesStub)
  return {
    sut,
    loadScheduledTimesStub
  }
}

describe('LoadScheduledTimesController', () => {
  test('Should call LoadScheduledTimes', async () => {
    const { sut, loadScheduledTimesStub } = makeSut()
    const loadSpy = jest.spyOn(loadScheduledTimesStub, 'loadAll')
    await sut.handle({})
    expect(loadSpy).toHaveBeenCalled()
  })

  test('Should return 200 if return a list of scheduled times', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(mockScheduledTimes()))
  })
})
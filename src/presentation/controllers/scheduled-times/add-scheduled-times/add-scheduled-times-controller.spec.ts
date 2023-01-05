import { Validation } from '../../../protocols/validation'
import { ValidationStub } from '../../../tests/mock-validation'
import { mockAddScheduledTimesRequest } from '../../../tests/scheduled-times/mock-add-scheduled-times'
import { AddScheduledTimesController } from './add-scheduled-times-controller'

jest.useFakeTimers().setSystemTime(new Date())

type SutTypes = {
  sut: AddScheduledTimesController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new AddScheduledTimesController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('AddScheduledTimesController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockAddScheduledTimesRequest())
    expect(validationSpy).toHaveBeenCalledWith({
      date: new Date(),
      time: '09:00',
      accountId: 'any_account_id'
    })
  })
})
import { ValidationStub } from '../../../tests/mock-validation'
import { AddScheduledTimesController } from './add-scheduled-times-controller'

jest.useFakeTimers().setSystemTime(new Date())

describe('AddScheduledTimesController', () => {
  test('Should call Validation with correct values', async () => {
    const validationStub = new ValidationStub()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const sut = new AddScheduledTimesController(validationStub)
    await sut.handle({
      body: {
        date: new Date(),
        time: '09:00',
        accountId: 'any_account_id'
      }
    })
    expect(validationSpy).toHaveBeenCalledWith({
      date: new Date(),
      time: '09:00',
      accountId: 'any_account_id'
    })
  })
})
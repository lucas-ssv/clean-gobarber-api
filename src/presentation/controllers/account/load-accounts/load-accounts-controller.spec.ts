import { LoadAccountsController } from './load-accounts-controller'
import { ValidationStub } from '../../../tests/mock-validation'

describe('LoadAccountsController', () => {
  test('Should call Validation with correct value', async () => {
    const validationStub = new ValidationStub()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const sut = new LoadAccountsController(validationStub)
    await sut.handle({
      body: {
        isBarber: true
      }
    })
    expect(validationSpy).toHaveBeenCalledWith({ isBarber: true })
  })
})
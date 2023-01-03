import { LoadAccountController } from './load-account-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { mockLoadAccountRequest } from '../../../tests/account/mock-load-account'

describe('LoadAccountController', () => {
  test('Should call Validation with correct values', async () => {
    const validationStub = new ValidationStub()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const sut = new LoadAccountController(validationStub)
    const mockRequest = mockLoadAccountRequest()
    await sut.handle(mockRequest)
    expect(validationSpy).toHaveBeenCalledWith(mockRequest.body)
  })
})
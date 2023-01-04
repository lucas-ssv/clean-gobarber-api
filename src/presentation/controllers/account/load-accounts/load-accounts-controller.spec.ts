import { LoadAccountsController } from './load-accounts-controller'
import { ValidationStub } from '../../../tests/mock-validation'
import { Validation } from '../../../protocols/validation'

type SutTypes = {
  sut: LoadAccountsController
  validationStub: Validation
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const sut = new LoadAccountsController(validationStub)
  return {
    sut,
    validationStub
  }
}

describe('LoadAccountsController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle({
      body: {
        isBarber: true
      }
    })
    expect(validationSpy).toHaveBeenCalledWith({ isBarber: true })
  })
})
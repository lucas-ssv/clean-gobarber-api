import { AddScheduledTimes } from '../../../../domain/usecases/add-scheduled-times'
import { InvalidAccountError } from '../../../errors/invalid-account-error'
import { badRequest, created, notFound, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../../protocols/validation'
import { ValidationStub } from '../../../tests/mock-validation'
import { AddScheduledTimesStub, mockAddScheduledTimesRequest } from '../../../tests/scheduled-times/mock-add-scheduled-times'
import { AddScheduledTimesController } from './add-scheduled-times-controller'

jest.useFakeTimers().setSystemTime(new Date())

type SutTypes = {
  sut: AddScheduledTimesController
  validationStub: Validation
  addScheduledTimesStub: AddScheduledTimes
}

const makeSut = (): SutTypes => {
  const validationStub = new ValidationStub()
  const addScheduledTimesStub = new AddScheduledTimesStub()
  const sut = new AddScheduledTimesController(validationStub, addScheduledTimesStub)
  return {
    sut,
    validationStub,
    addScheduledTimesStub
  }
}

describe('AddScheduledTimesController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    await sut.handle(mockAddScheduledTimesRequest())
    expect(validationSpy).toHaveBeenCalledWith({
      date: new Date(),
      time: 'any_time',
      accountId: 'any_account_id'
    })
  })

  test('Should return 400 if any validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpResponse = await sut.handle(mockAddScheduledTimesRequest())
    expect(httpResponse).toEqual(badRequest(new Error()))
  })

  test('Should call AddScheduledTimes with correct values', async () => {
    const { sut, addScheduledTimesStub } = makeSut()
    const addSpy = jest.spyOn(addScheduledTimesStub, 'add')
    await sut.handle(mockAddScheduledTimesRequest())
    expect(addSpy).toHaveBeenCalledWith({
      date: new Date(),
      time: 'any_time',
      accountId: 'any_account_id'
    })
  })

  test('Should return 404 if no account was found', async () => {
    const { sut, addScheduledTimesStub } = makeSut()
    jest.spyOn(addScheduledTimesStub, 'add').mockReturnValueOnce(Promise.resolve(null) as any)
    const httpResponse = await sut.handle(mockAddScheduledTimesRequest())
    expect(httpResponse).toEqual(notFound(new InvalidAccountError()))
  })

  test('Should return 201 if AddScheduledTimes succeeds', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAddScheduledTimesRequest())
    expect(httpResponse).toEqual(created())
  })

  test('Should return 500 if AddScheduledTimes throws', async () => {
    const { sut, addScheduledTimesStub } = makeSut()
    jest.spyOn(addScheduledTimesStub, 'add').mockImplementationOnce(() => {
      throw new Error()
    })
    const httpResponse = await sut.handle(mockAddScheduledTimesRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
import { Account } from '../../../domain/models/account'
import { mockAccount } from '../../../domain/tests/account/mock-account'
import { mockUpdateAccountParams } from '../../../domain/tests/account/mock-update-account'
import { Compare } from '../../protocols/criptography/compare'
import { LoadByEmailRepository } from '../../protocols/db/load-by-email-repository'
import { UpdateAccountRepository } from '../../protocols/db/update-account-repository'
import { CompareStub } from '../../tests/criptography/mock-compare'
import { UpdateAccountRepositoryStub } from '../../tests/db/mock-update-account-repository'
import { DbUpdateAccount } from './db-update-account'

type SutTypes = {
  sut: DbUpdateAccount
  loadByEmailRepositoryStub: LoadByEmailRepository<Account>
  compareStub: Compare
  updateAccountRepositoryStub: UpdateAccountRepository
}

class LoadByEmailRepositoryStub implements LoadByEmailRepository<Account> {
  async loadByEmail (email: string): Promise<Account> {
    return mockAccount()
  }
}

const makeSut = (): SutTypes => {
  const loadByEmailRepositoryStub = new LoadByEmailRepositoryStub()
  const compareStub = new CompareStub()
  const updateAccountRepositoryStub = new UpdateAccountRepositoryStub()
  const sut = new DbUpdateAccount(loadByEmailRepositoryStub, compareStub, updateAccountRepositoryStub)
  return {
    sut,
    loadByEmailRepositoryStub,
    compareStub,
    updateAccountRepositoryStub
  }
}

describe('DbUpdateAccount usecase', () => {
  test('Should call LoadByEmailRepository with correct value', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    const loadSpy = jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail')
    await sut.update(mockUpdateAccountParams())
    expect(loadSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  test('Should throw if LoadByEmailRepository throws', async () => {
    const { sut, loadByEmailRepositoryStub } = makeSut()
    jest.spyOn(loadByEmailRepositoryStub, 'loadByEmail').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Compare with correct values', async () => {
    const { sut, compareStub } = makeSut()
    const compareSpy = jest.spyOn(compareStub, 'compare')
    await sut.update(mockUpdateAccountParams())
    expect(compareSpy).toHaveBeenCalledWith(mockUpdateAccountParams().currentPassword, 'hashed_password')
  })

  test('Should throw if Compare throws', async () => {
    const { sut, compareStub } = makeSut()
    jest.spyOn(compareStub, 'compare').mockImplementationOnce(() => {
      throw new Error()
    })
    const promise = sut.update(mockUpdateAccountParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call UpdateAccountRepository with correct values', async () => {
    const { sut, updateAccountRepositoryStub } = makeSut()
    const updateSpy = jest.spyOn(updateAccountRepositoryStub, 'update')
    const mockUpdateAccount = mockUpdateAccountParams()
    await sut.update(mockUpdateAccount)
    expect(updateSpy).toHaveBeenCalledWith({
      name: mockUpdateAccount.name,
      currentPassword: mockUpdateAccount.currentPassword,
      newPassword: mockUpdateAccount.newPassword,
      newPasswordConfirmation: mockUpdateAccount.newPasswordConfirmation
    })
  })
})
import { DbAddScheduledTimes } from './db-add-scheduled-times'
import { LoadAccountRepositoryStub } from '../../tests/db/mock-load-account-repository'

describe('DbAddScheduledTimes usecase', () => {
  test('Should call LoadAccountRepository with correct value', async () => {
    const loadAccountRepositoryStub = new LoadAccountRepositoryStub()
    const loadSpy = jest.spyOn(loadAccountRepositoryStub, 'load')
    const sut = new DbAddScheduledTimes(loadAccountRepositoryStub)
    await sut.add({
      date: new Date(),
      time: 'any_time',
      accountId: 'any_account_id'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_account_id')
  })
})
import { DbAddAccount } from '../../../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'
import { AccountRepository } from '../../../../infra/db/account/account-repository'
import { SignUpController } from '../../../../presentation/controllers/account/signup-controller'
import { Controller } from '../../../../presentation/protocols/controller'
import { makeSignUpValidation } from './signup-validations/signup-validations'

export const makeSignUpController = (): Controller => {
  const addAccountRepository = new AccountRepository()
  const encrypter = new BcryptAdapter()
  const addAccount = new DbAddAccount(addAccountRepository, encrypter)
  const signUpController = new SignUpController(addAccount, makeSignUpValidation())
  return signUpController
}

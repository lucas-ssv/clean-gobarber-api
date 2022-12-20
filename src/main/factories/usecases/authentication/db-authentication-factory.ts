import { DbAuthentication } from "../../../../data/usecases/authentication/db-authentication";
import { Authentication } from "../../../../domain/usecases/authentication";
import { BcryptAdapter } from "../../../../infra/criptography/bcrypt-adapter/bcrypt-adapter";
import { JwtAdapter } from "../../../../infra/criptography/jwt-adapter/jwt-adapter";
import { AccountRepository } from "../../../../infra/db/account/account-repository";

export const makeDbAuthentication = (): Authentication => {
  const accountRepository = new AccountRepository()
  const compare = new BcryptAdapter()
  const signer = new JwtAdapter()
  return new DbAuthentication(accountRepository, compare, signer)
}
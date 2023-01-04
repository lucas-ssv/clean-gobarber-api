import { Account } from "../../models/account";

export const mockAccounts = (): Account[] => (
  [{
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    isBarber: true,
  }, {
    id: 'other_id',
    name: 'other_name',
    email: 'other_email@mail.com',
    password: 'other_password',
    isBarber: false,
  }]
)
export interface AddAccount {
  add: (account: AccountParams) => Promise<void>
}

export type AccountParams = {
  name: string
  email: string
  password: string
  isBarber: boolean
}
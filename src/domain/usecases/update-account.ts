export interface UpdateAccount {
  update: (params: UpdateAccount.Params) => Promise<void>
}

export namespace UpdateAccount {
  export type Params = {
    name: string
    currentPassword: string
    newPassword: string
    newPasswordConfirmation: string
  }
}
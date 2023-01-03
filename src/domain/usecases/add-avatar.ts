import { Avatar } from '../models/avatar'

export interface AddAvatar {
  add: (params: AddAvatar.Params) => Promise<Avatar>
}

export namespace AddAvatar {
  export type Params = {
    name: string
    url: string
    accountId: string
  }
}
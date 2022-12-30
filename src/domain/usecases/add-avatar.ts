import { Avatar } from '../models/avatar'

export interface AddAvatar {
  add: (params: AddAvatar.Params) => Promise<Avatar>
}

export namespace AddAvatar {
  export type Params = {
    email: string
    name: string
    url: string
  }
}
import { AccountModel } from '../models/account'

export type AddScheduleParams = {
  description: string
  scheduledTime: Date
  account: Omit<AccountModel, 'imageUrl' | 'password' | 'isBarber' | 'createdAt'>
}

export interface AddSchedule {
  add: (schedule: AddScheduleParams) => Promise<void>
}

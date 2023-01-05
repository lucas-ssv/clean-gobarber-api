import { ScheduledTimeResult } from '../../models/scheduled-time-result'

export const mockScheduledTimes = (): ScheduledTimeResult[] => ([{
  id: 'any_id',
  date: new Date(),
  time: 'any_time',
  account: {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password',
    isBarber: false
  }
}, {
  id: 'other_id',
  date: new Date(),
  time: 'other_time',
  account: {
    id: 'other_id',
    name: 'other_name',
    email: 'other_email@mail.com',
    password: 'other_password',
    isBarber: true
  }
}])
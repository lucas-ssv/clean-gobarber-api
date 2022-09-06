import { AddScheduleParams } from '../../../domain/usecases/add-schedule'

export const mockSchedule = (): AddScheduleParams => ({
  description: 'any_description',
  scheduledTime: new Date(),
  account: {
    id: 'any_id',
    name: 'any_name',
    email: 'any_email@mail.com'
  }
})

import { AddScheduleParams } from '../../../domain/usecases/add-schedule'

export const mockSchedule = (): AddScheduleParams => ({
  description: 'any_description',
  scheduledTime: new Date(),
  accountId: 'any_account_id'
})

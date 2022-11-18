export type AddScheduleParams = {
  description: string
  scheduledTime: Date
  accountId: string
}

export interface AddSchedule {
  add: (schedule: AddScheduleParams) => Promise<void>
}

import { Account } from './account'
import { Column, Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('schedules')
export class Schedule {
  @PrimaryColumn({ generated: 'uuid' })
    id: string

  @Column()
    description: string

  @Column({ name: 'scheduled_time' })
    scheduledTime: Date

  @Column({ name: 'account_id' })
    accountId: string

  @ManyToMany(() => Account)
  @JoinColumn({ name: 'account_id' })
    account: Account

  @Column({ name: 'created_at' })
    createdAt: Date

  @Column({ name: 'updated_at' })
    updatedAt: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

import { Account } from './account'
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('schedules')
export class Schedule {
  @PrimaryColumn({ generated: 'uuid' })
    id: string

  @Column()
    description: string

  @Column({ name: 'scheduled_time', type: 'timestamp with time zone' })
    scheduledTime: Date

  @Column({ name: 'account_id' })
    accountId: string

  @ManyToMany(() => Account)
  @JoinColumn({ name: 'account_id' })
    account: Account

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createdAt: Date

  @CreateDateColumn({ name: 'updated_at', type: 'timestamp with time zone' })
    updatedAt: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

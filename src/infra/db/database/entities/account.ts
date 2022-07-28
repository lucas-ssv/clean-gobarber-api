import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('accounts')
export class Account {
  @PrimaryColumn({ generated: 'uuid' })
    id: string

  @Column()
    name: string

  @Column()
    email: string

  @Column()
    password: string

  @Column({ name: 'is_barber' })
    isBarber: boolean

  @CreateDateColumn({ name: 'created_at' })
    createdAt: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

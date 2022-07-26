import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm'
import { v4 as uuid } from 'uuid'

@Entity('accounts')
export class Account {
  @PrimaryColumn({ generated: 'uuid' })
    id: string

  @Column()
    name: string

  @Column({ name: 'image_url', nullable: true })
    imageUrl: string

  @Column()
    email: string

  @Column()
    password: string

  @Column({ name: 'is_barber' })
    isBarber: boolean

  @Column({ name: 'access_token', nullable: true })
    accessToken: string

  @CreateDateColumn({ name: 'created_at', type: 'timestamp with time zone' })
    createdAt: Date

  constructor () {
    if (!this.id) {
      this.id = uuid()
    }
  }
}

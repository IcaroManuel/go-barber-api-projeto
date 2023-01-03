import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectID,
  ObjectIdColumn,
  UpdateDateColumn,
} from 'typeorm'

@Entity('notifications')
export default class Notification {
  @ObjectIdColumn()
  id: ObjectID

  @Column()
  content: string

  @Column('uuid')
  recipient_id: string

  @Column({ default: false })
  read: boolean

  @CreateDateColumn()
  create_at: Date

  @UpdateDateColumn()
  update_at: Date
}

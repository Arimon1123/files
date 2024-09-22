import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('persons')
export class PersonEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  name: string
  @Column()
  position: string
  @Column()
  area: string
}

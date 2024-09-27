import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { FileEntity } from './file.entity'
import { PersonEntity } from './person.entity'

@Entity('loans')
export class LoanEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  date: Date
  @Column()
  number: number
  @ManyToMany(() => FileEntity)
  @JoinTable()
  files: FileEntity[]
  @ManyToOne(() => PersonEntity)
  @JoinColumn()
  loaner: PersonEntity
  @ManyToOne(() => PersonEntity)
  @JoinColumn()
  borrower: PersonEntity
}

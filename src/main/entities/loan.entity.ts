import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm'
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
  @OneToMany(() => FileEntity, (file) => file.id)
  files: FileEntity[]
  @OneToOne(() => PersonEntity)
  @JoinColumn()
  loaner: PersonEntity
  @OneToOne(() => PersonEntity)
  @JoinColumn()
  borrower: PersonEntity
}

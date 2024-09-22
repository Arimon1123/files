import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  fileNumber: string
  @Column()
  description: string
  @Column()
  area: string
  @Column()
  institution: string
  @Column()
  medium: string
  @Column()
  volume: string
  @Column()
  year: number
}

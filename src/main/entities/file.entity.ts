import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm'

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number
  @Column()
  @Unique('fileNumber', ['fileNumber'])
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

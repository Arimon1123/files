import { ElectronAPI } from '@electron-toolkit/preload'
import { FileEntity } from '../main/entities/file.entity'
import { Result } from '../main/types/types'

declare global {
  interface Window {
    electron: ElectronAPI
    api: {
      saveFile: (file: FileEntity) => Promise<Result<FileEntity>>
      findFiles: () => Promise<Result<FileEntity>>
      filterByName: (number: string) => Promise<Result<FileEntity[]>>
      filterFiles: (filter: string) => Promise<Result<FileEntity[]>>
      updateFile: (file: FileEntity) => Promise<Result<FileEntity>>
      findPersons: () => Promise<Result<PersonEntity>>
      savePerson: (person: PersonEntity) => Promise<Result<string>>
      filterPerson: (filter: string) => Promise<Result<PersonEntity[]>>
      searchPerson: (name: string) => Promise<Result<PersonEntity[]>>
      updatePerson: (person: PersonEntity) => Promise<Result<string>>
      findLoans: () => Promise<Result<LoanEntity>>
      saveLoan: (loan: LoanEntity) => Promise<Result<string>>
      filterLoans: (filter: string) => Promise<Result<LoanEntity[]>>
      searchLoan: (number: number) => Promise<Result<LoanEntity[]>>
      generateDoc: (loan: LoanEntity) => Promise<Result<Buffer>>
    }
  }
}

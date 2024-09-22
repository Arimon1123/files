import { DataSource, ILike } from 'typeorm'
import { FileEntity } from './entities/file.entity'
import { PersonEntity } from './entities/person.entity'
import { LoanEntity } from './entities/loan.entity'

export const dataSource = new DataSource({
  type: 'sqlite',
  database: './file.db',
  synchronize: true,
  entities: [FileEntity, PersonEntity, LoanEntity]
})

// Files repository

const fileRepository = dataSource.getRepository(FileEntity)

export const saveFile = async (file: FileEntity) => {
  try {
    await fileRepository.save(file)
    return { result: 'success', message: 'file saved' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const findFiles = async () => {
  try {
    return { result: 'success', data: await fileRepository.find(), message: 'files retrieved' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const searchFilesByNumber = async (fileNumber: string) => {
  try {
    return {
      result: 'success',
      data: await fileRepository.findBy({ fileNumber: ILike(`%${fileNumber}%`) }),
      message: 'files retrieved'
    }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const filterFiles = async (filter: string) => {
  try {
    return {
      result: 'success',
      data: await fileRepository.findBy({
        fileNumber: ILike(`%${filter}%`),
        area: ILike(`%${filter}%`),
        description: ILike(`%${filter}%`),
        institution: ILike(`%${filter}%`),
        medium: ILike(`%${filter}%`),
        volume: ILike(`%${filter}%`),
        year: parseInt(filter)
      }),
      message: 'files retrieved'
    }
  } catch (e) {
    return { result: 'error', message: `${e.message}` }
  }
}

export const updateFile = async (file: FileEntity) => {
  const { id, ...data } = file
  try {
    await fileRepository.update(id, data)
    return { result: 'success', message: 'file updated' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

// Persons repository

const personRepository = dataSource.getRepository(PersonEntity)

export const savePerson = async (person: PersonEntity) => {
  try {
    await personRepository.save(person)
    return { result: 'success', message: 'person saved' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const findPersons = async () => {
  try {
    return { result: 'success', data: await personRepository.find(), message: 'persons retrieved' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const searchPersonsByName = async (name: string) => {
  try {
    return {
      result: 'success',
      data: await personRepository.findBy({ name: ILike(`%${name}%`) }),
      message: 'persons retrieved'
    }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const filterPersons = async (filter: string) => {
  try {
    return {
      result: 'success',
      data: await personRepository.findBy({
        name: ILike(`%${filter}%`),
        position: ILike(`%${filter}%`),
        area: ILike(`%${filter}%`)
      }),
      message: 'persons retrieved'
    }
  } catch (e) {
    return { result: 'error', message: `${e.message}` }
  }
}

export const updatePerson = async (person: PersonEntity) => {
  const { id, ...data } = person
  try {
    await personRepository.update(id, data)
    return { result: 'success', message: 'person updated' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

// Loans repository

const loanRepository = dataSource.getRepository(LoanEntity)

export const saveLoan = async (loan: LoanEntity) => {
  try {
    await loanRepository.save(loan)
    return { result: 'success', message: 'loan saved' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const findLoans = async () => {
  try {
    return { result: 'success', data: await loanRepository.find(), message: 'loans retrieved' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const searchLoansByNumber = async (number: number) => {
  try {
    return {
      result: 'success',
      data: await loanRepository.findBy({ number }),
      message: 'loans retrieved'
    }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const filterLoans = async (filter: string) => {
  try {
    return {
      result: 'success',
      data: await loanRepository.findBy({
        number: parseInt(filter),
        date: new Date(filter)
      }),
      message: 'loans retrieved'
    }
  } catch (e) {
    return { result: 'error', message: `${e.message}` }
  }
}

export const updateLoan = async (loan: LoanEntity) => {
  const { id, ...data } = loan
  try {
    await loanRepository.update(id, data)
    return { result: 'success', message: 'loan updated' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

export const deleteLoan = async (loan: LoanEntity) => {
  try {
    await loanRepository.delete(loan)
    return { result: 'success', message: 'loan deleted' }
  } catch (e) {
    console.error(e)
    return { result: 'error', message: `${e.message}` }
  }
}

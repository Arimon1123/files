export type File = {
  id: number
  fileNumber: string
  description: string
  area: string
  institution: string
  medium: string
  volume: string
  year: number
}

export type Person = {
  id?: number
  name?: string
  position?: string
  area?: string
}

export type Loan = {
  id?: number
  date?: Date
  number?: number
  files?: File[]
  loaner?: Person
  borrower?: Person
}

export interface Result<T> {
  message: string
  result: 'success' | 'error'
  error?: Error
  data?: T
}

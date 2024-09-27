export interface Result<T> {
  message: string
  result: 'success' | 'error'
  error?: unknown
  data?: T
}

import carbone from 'carbone'
import { LoanEntity } from './entities/loan.entity'
import { Result } from './types/types'
import libre from 'libreoffice-convert'

const options = {
  timezone: 'America/La_paz',
  lang: 'es'
}

export const generateDocument = async (data: LoanEntity): Promise<Result<Buffer>> => {
  try {
    console.table(data.files)
    const template = `template.docx`
    return new Promise((resolve, reject) => {
      carbone.render(template, data, options, (err, result) => {
        console.log('Generating document', result)
        if (err) {
          reject({ result: 'error', message: `${(err as Error).message}` })
        }
        libre.convert(result as Buffer, 'output.pdf', undefined, (err, done) => {
          if (err) {
            reject({ result: 'error', message: `${(err as Error).message}` })
          }
          console.log('Generated PDF', done)
          resolve({ result: 'success', message: 'File generated', data: done })
        })
      })
    })
  } catch (e) {
    return { result: 'error', message: `${(e as Error).message}` }
  }
}

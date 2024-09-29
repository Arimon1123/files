import carbone from 'carbone'
import fs from 'node:fs'
import { LoanEntity } from './entities/loan.entity'
import { Result } from './types/types'

const options = {
  convertTo: 'pdf',
  timezone: 'America/La_paz',
  lang: 'es'
}

export const generateDocument = async (data: LoanEntity): Promise<Result<Buffer>> => {
  try {
    console.table(data.files)
    const template = `template.dock`
    return new Promise((resolve, reject) => {
      carbone.render(template, data, options, (err, result) => {
        console.log('Generating document', result)
        if (err) {
          reject({ result: 'error', message: `${(err as Error).message}` })
        }
        fs.writeFileSync('output.pdf', result)
        const file = fs.readFileSync('output.pdf') ?? Buffer.from('')
        resolve({ result: 'success', message: 'File generated', data: file })
      })
    })
  } catch (e) {
    return { result: 'error', message: `${(e as Error).message}` }
  }
}

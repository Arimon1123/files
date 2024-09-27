import carbone from 'carbone'
import fs from 'node:fs'
import { LoanEntity } from './entities/loan.entity'

const options = {
  timezone: 'America/La_paz',
  lang: 'es'
}

export const generateDocument = async (data: LoanEntity) => {
  try {
    console.table(data.files)
    const template = `template.odt`
    carbone.render(template, data, options, (err, result) => {
      if (err) {
        return console.log(err)
      }
      // write the result
      fs.writeFileSync('result.odt', result)
    })
    return {
      result: 'success',
      message: 'document generated',
      data: `./src/main/documents/loan-${data.number}.pdf`
    }
  } catch (e) {
    return { result: 'error', message: `${(e as Error).message}` }
  }
}

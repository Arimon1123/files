import { SyntheticEvent, useState } from 'react'
import { File, Loan, Person } from '@renderer/types/types'
import { Box, Snackbar, Typography } from '@mui/material'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import useForm from '@renderer/hooks/useForm'
import { FileForm } from '@renderer/views/FileForm'
import { PersonForm } from '@renderer/views/PersonForm'
import { Accordion, AccordionDetails, AccordionSummary } from '@renderer/components/CustomAccordion'
import { FileTable } from './FileList'
import { CustomButton } from '@renderer/components/Button'

export function LoanForm() {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const { form: borrower, onSetHandler: onSetBorrowerHandler } = useForm<Person>('Borrower', false)
  const [pdf, setPdf] = useState<Buffer | null>(null)
  const {
    form: loaner,

    onSetHandler: onSetLoanerHandler
  } = useForm<Person>('Loaner', false)
  const {
    form: files,
    onAddHandler: onAddFileHandler,
    onDeleteHandler: onDeleteHandler
  } = useForm<File>('File', true, 'id')
  const date = new Date()
  const handleClick = async () => {
    const loan = {
      number: 145,
      date: date,
      borrower: borrower,
      files: files,
      loaner: loaner
    } as Loan
    const result = await window.api.saveLoan(loan)
    if (result.result === 'success') {
      setOpenSnackbar(true)
      const resultGenerateDoc = await window.api.generateDoc(loan)
      if (resultGenerateDoc.result === 'success') {
        alert('Document generated')
        setPdf(resultGenerateDoc.data ?? null)
      } else {
        console.error(result.message)
      }
    } else console.error(result.error)
  }
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (panel: string) => (_event: SyntheticEvent, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false)
  }

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="h4" variant="h4">
          Nuevo préstamo
        </Typography>
        <Typography>{date.toLocaleDateString()}</Typography>
      </Box>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Seleccionar prestatario
        </AccordionSummary>
        <AccordionDetails>
          <PersonForm addPersonHandler={onSetBorrowerHandler} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          {' '}
          Agregar Archivos
        </AccordionSummary>
        <AccordionDetails>
          <FileForm addFileHandler={onAddFileHandler} />
          <FileTable files={files} onDeleteHandler={onDeleteHandler} />
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreRoundedIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          Seleccionar Prestador
        </AccordionSummary>
        <AccordionDetails>
          <PersonForm addPersonHandler={onSetLoanerHandler} />
        </AccordionDetails>
      </Accordion>
      <CustomButton onClick={handleClick}>Guardar</CustomButton>
      {pdf && (
        <iframe src={URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }))}>
          Descargar
        </iframe>
      )}
      <Snackbar
        open={openSnackbar}
        message={'Guardado'}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
      ></Snackbar>
    </>
  )
}

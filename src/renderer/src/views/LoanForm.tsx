import { SyntheticEvent, useState } from 'react'
import { File, Loan, Person } from '@renderer/types/types'
import { Box, Dialog, DialogProps, DialogTitle, Snackbar, Typography } from '@mui/material'
import ExpandMoreRoundedIcon from '@mui/icons-material/ExpandMoreRounded'
import useForm from '@renderer/hooks/useForm'
import { FileForm } from '@renderer/views/FileForm'
import { PersonForm } from '@renderer/views/PersonForm'
import { Accordion, AccordionDetails, AccordionSummary } from '@renderer/components/CustomAccordion'
import { FileTable } from './FileList'
import { CustomButton } from '@renderer/components/Button'
import PdfViewer from './PdfViewer'
import { useModal } from 'mui-modal-provider'
import { FileFormDialog } from '@renderer/components/Dialog'
import { Add } from '@mui/icons-material'

export function LoanForm() {
  const { showModal, hideModal } = useModal()
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const { form: borrower, onSetHandler: onSetBorrowerHandler } = useForm<Person>('Borrower', false)
  const [pdf, setPdf] = useState<Blob | null>(null)
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
        console.log(resultGenerateDoc.data)
        setPdf(new Blob([resultGenerateDoc.data as Buffer], { type: 'application/pdf' }))
      } else {
        console.error(result.message)
      }
    } else console.error(result.error)
  }
  const onShowModal = () => {
    const modal = showModal(FileFormDialog, {
      title: 'Agregar archivo',
      addHandler: onAddFileHandler,
      callback: () => {
        modal.hide()
      }
    })
  }
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <Typography component="h4" variant="h4">
          Nuevo préstamo
        </Typography>
        <Typography>{date.toLocaleDateString()}</Typography>
      </Box>

      <Box sx={{ marginY: 1 }}>
        <CustomButton sx={{ px: 1 }} startIcon={<Add />} onClick={onShowModal}>
          Agregar archivos
        </CustomButton>
        <FileTable files={files} onDeleteHandler={onDeleteHandler} />
      </Box>
      <Snackbar
        open={openSnackbar}
        message={'Guardado'}
        autoHideDuration={2500}
        onClose={() => setOpenSnackbar(false)}
      ></Snackbar>
    </>
  )
}

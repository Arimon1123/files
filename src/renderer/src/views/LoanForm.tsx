import { useState } from 'react'
import { FileForm } from './FileForm'
import { PersonForm } from './PersonForm'
import { CustomButton } from '../components/Button'
import { File, Loan, Person } from '@renderer/types/types'
import { FileTable } from './FileList'
import { Box, Snackbar } from '@mui/material'

export function LoanForm() {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [isAddingFile, setIsAddingFile] = useState<boolean>(false)
  const [isAddingBorrower, setIsAddingBorrower] = useState<boolean>(false)
  const [isAddingLoaner, setIsAddingLoaner] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [borrower, setBorrower] = useState<Person>({} as Person)
  const [loaner, setLoaner] = useState<Person>({} as Person)
  const onAddFileHandler = (file: File) => {
    isAddingBorrower ? setIsAddingBorrower(false) : null
    const isInFiles = files.find((f) => f.fileNumber === file.fileNumber)
    if (!isInFiles) {
      setFiles((prevFiles) => {
        console.log(prevFiles)
        return [...prevFiles, file]
      })
      setIsAddingFile(false)
    } else {
      console.log('File already added')
    }
  }
  const onSetBorrowerHandler = (person: Person) => {
    isAddingFile ? setIsAddingFile(false) : null
    setBorrower(person)
    setIsAddingBorrower(false)
  }
  const onSetLoanerHandler = (person: Person) => {
    isAddingFile ? setIsAddingFile(false) : null
    setLoaner(person)
    setIsAddingLoaner(false)
  }
  const handleClose = () => {
    setOpenSnackbar(false)
  }
  const date = new Date()
  const onDeleteHandler = (file: File) => {
    const newFiles = files.filter((item) => item.fileNumber !== file.fileNumber)
    console.log(newFiles)
    setFiles(newFiles)
  }

  const openFileForm = () => {
    setIsAddingBorrower(false)
    setIsAddingFile(true)
  }
  const openBorrowerForm = () => {
    setIsAddingFile(false)
    setIsAddingBorrower(true)
  }
  const openLoanerForm = () => {
    setIsAddingFile(false)
    setIsAddingLoaner(true)
  }

  const handleClick = async () => {
    const loan = {
      number: 145,
      date: date,
      borrower: borrower,
      files: files,
      loaner: loaner
    } as Loan
    console.log(borrower.id)
    const result = await window.api.saveLoan(loan)
    if (result.result === 'success') {
      setOpenSnackbar(true)
      const result = await window.api.generateDoc(loan)
      if (result.result === 'success') {
        alert('Document generated')
      } else {
        console.error(result.message)
      }
    } else console.error(result.error)
  }
  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Nuevo préstamo</h1>
        <span>{date.toLocaleDateString()}</span>
        {borrower.name && (
          <span>{`Nombre: ${borrower.name} Dirección: ${borrower.area} Posición: ${borrower.position}`}</span>
        )}
      </Box>
      <Box
        sx={{ display: 'flex', flexDirection: 'row', width: '50%', marginTop: 2, marginBottom: 2 }}
      >
        <CustomButton onClick={openBorrowerForm} sx={{ marginRight: 2 }}>
          Persona
        </CustomButton>
        <CustomButton onClick={openFileForm} sx={{ marginRight: 2 }}>
          Agregar archivo
        </CustomButton>
        <CustomButton onClick={openLoanerForm}>Persona2</CustomButton>
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        {files.length > 0 && (
          <FileTable files={files} onDeleteHandler={onDeleteHandler}></FileTable>
        )}
      </Box>
      <Box sx={{ marginTop: 2, marginBottom: 2 }}>
        {isAddingFile && <FileForm addFileHandler={onAddFileHandler}></FileForm>}
        {isAddingBorrower && <PersonForm addPersonHandler={onSetBorrowerHandler}></PersonForm>}
        {isAddingLoaner && <PersonForm addPersonHandler={onSetLoanerHandler}></PersonForm>}
      </Box>
      <CustomButton onClick={handleClick}>Guardar préstamo</CustomButton>
      <Snackbar
        open={openSnackbar}
        message={'Guardado'}
        autoHideDuration={2500}
        onClose={handleClose}
      ></Snackbar>
    </>
  )
}

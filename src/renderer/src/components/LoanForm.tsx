import { useState } from 'react'
import { FileForm } from './FileForm'
import { PersonForm } from './PersonForm'
import { CustomButton } from './Button'
import { File, Person } from '@renderer/types/types'
import { FileTable } from './FileList'

export function LoanForm() {
  const [isAddingFile, setIsAddingFile] = useState<boolean>(false)
  const [isAddingPerson, setIsAddingPerson] = useState<boolean>(false)
  const [files, setFiles] = useState<File[]>([])
  const [person, setPerson] = useState<Person>({})
  const onAddFileHandler = (file: File) => {
    isAddingPerson ? setIsAddingPerson(false) : null
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
  const onSetPersonHandler = (person: Person) => {
    isAddingFile ? setIsAddingFile(false) : null
    setPerson(person)
    setIsAddingPerson(false)
  }
  const date = new Date()

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <h1>Nuevo préstamo</h1>
        <span>{date.toLocaleDateString()}</span>
        {person.name && (
          <span>{`Nombre: ${person.name} Dirección: ${person.area} Posición: ${person.position}`}</span>
        )}
      </div>
      <CustomButton onClick={() => setIsAddingFile(!isAddingFile)}>Agregar archivo</CustomButton>
      <CustomButton onClick={() => setIsAddingPerson(!isAddingPerson)}>Persona</CustomButton>

      <FileTable files={files}></FileTable>
      {isAddingFile && <FileForm addFileHandler={onAddFileHandler}></FileForm>}
      {isAddingPerson && <PersonForm addPersonHandler={onSetPersonHandler}></PersonForm>}
    </>
  )
}

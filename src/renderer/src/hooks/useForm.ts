import { useState } from 'react'

// Sobrecargas del hook para manejar los diferentes tipos de retorno
// @ts-ignore
function useForm<T>(
  formName: string,
  isArray: true,
  principalProperty?: string
): {
  form: T[]
  isShowing: boolean
  setIsShowing: (value: boolean) => void
  onAddHandler: (file: T) => void
  onDeleteHandler: (file: T) => void
  openForm: () => void
  closeForm: () => void
}

function useForm<T>(
  formName: string,
  isArray: false,
  principalProperty?: string
): {
  form: T
  isShowing: boolean
  setIsShowing: (value: boolean) => void
  onSetHandler: (person: T) => void
  openForm: () => void
  closeForm: () => void
}

function useForm<T>(formName: string, isArray: boolean, principalProperty?: string) {
  const [isShowing, setIsShowing] = useState<boolean>(false)
  const openForm = () => {
    setIsShowing(true)
  }
  const closeForm = () => {
    setIsShowing(false)
  }
  if (isArray) {
    // Si es un array, manejamos el estado como un array de objetos de tipo T
    const [form, setForm] = useState<T[]>([])
    const onAddHandler = (file: T) => {
      const isAdded = form.find(
        (f) => f[principalProperty ?? 'id'] === file[principalProperty ?? 'id']
      )
      if (!isAdded) {
        setForm((prevFiles) => {
          console.log(prevFiles)
          return [...prevFiles, file]
        })
        setIsShowing(false)
      } else {
        alert(`${formName} already added`)
      }
    }
    const onDeleteHandler = (file: T) => {
      const newFiles = form.filter(
        (item) => item[principalProperty ?? 'id'] !== file[principalProperty ?? 'id']
      )
      console.log(newFiles)
      setForm(newFiles)
    }

    return {
      form,
      isShowing,
      setIsShowing,
      onAddHandler,
      onDeleteHandler,
      openForm,
      closeForm
    }
  } else {
    // Si no es un array, manejamos el estado como un objeto de tipo T
    const [form, setForm] = useState<T>({} as T)
    const onSetHandler = (person: T) => {
      setForm(person)
      setIsShowing(false)
    }

    return { form, setForm, isShowing, setIsShowing, onSetHandler, openForm, closeForm }
  }
}

export default useForm

import {
  Autocomplete,
  Box,
  FormControl,
  Grid2 as Grid,
  SelectChangeEvent,
  TextField
} from '@mui/material'
import { CustomButton } from './Button'
import { ChangeEvent, FormEvent, ReactNode, useState } from 'react'
import { Person, Result } from '@renderer/types/types'
import { AreaSelect } from './AreaSelect'

interface PersonProps {
  addPersonHandler: (person: Person) => void
}

export function PersonForm(props: PersonProps) {
  const [person, setPerson] = useState<Person>({} as Person)
  const [options, setOptions] = useState<Person[]>([])
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(event)
    const formData = new FormData(event.target as HTMLFormElement)
    const person = Object.fromEntries(formData)
    const result = (await window.api.savePerson(person)) as Result<string>
    if (result.result === 'success') {
      //@ts-ignore <is parsed as Person>
      props.addPersonHandler(result.data)
    } else {
      console.error(result.message)
    }
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name
    const newFile = { ...person }
    newFile[name] = event.target.value
    console.table(newFile)
    setPerson(newFile)
  }
  const handleAutocompleteChange = (_event, value) => {
    if (value) setPerson(value)
    else setPerson({} as Person)
  }
  const handleOnKeyDown = async (event) => {
    const value = event.target.value
    const person = await window.api.searchPerson(value)
    setOptions(person.data ?? [])
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChangeSelect = (event: SelectChangeEvent<unknown>, _child: ReactNode) => {
    const name = event.target.name
    const newFile = { ...person }
    newFile[name] = event.target.value
    console.table(newFile)
    setPerson(newFile)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Grid container columnSpacing={2} rowSpacing={4}>
          <Grid size={12}>
            <h2>Datos de la persona</h2>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <Autocomplete
                id="name"
                options={options}
                freeSolo
                inputValue={person ? person.name : ''}
                value={person ? person.name : ''}
                onChange={handleAutocompleteChange}
                onKeyDown={handleOnKeyDown}
                getOptionLabel={(option: string | Person) =>
                  typeof option === 'string' ? option : option.name
                }
                renderInput={(params) => <TextField {...params} name="name" label="Nombre" />}
                renderOption={(params, option: Person) => {
                  const { key, ...optionProps } = params
                  return (
                    <Box sx={{ width: '100%' }} key={key} component="li" {...optionProps}>
                      {option.name}
                    </Box>
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <AreaSelect
                id="area"
                label="Dirección"
                name="area"
                variant="outlined"
                defaultValue={'DTO'}
                required
                value={person.area ? person.area : ''}
                onChange={handleChangeSelect}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <TextField
                id="position"
                label="Cargo"
                name="position"
                required
                value={person.position ? person.position : ''}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <CustomButton type="submit">Guardar</CustomButton>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

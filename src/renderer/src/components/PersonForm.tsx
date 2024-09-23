import { FormControl, Grid2 as Grid, TextField } from '@mui/material'
import { CustomButton } from './Button'
import { FormEvent } from 'react'
import { Person, Result } from '@renderer/types/types'
import { AreaSelect } from './AreaSelect'

interface PersonProps {
  addPersonHandler: (person: Person) => void
}

export function PersonForm(props: PersonProps) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    console.log(event)
    const formData = new FormData(event.target as HTMLFormElement)
    const person = Object.fromEntries(formData)

    const result = (await window.api.savePerson(person)) as Result<string>
    if (result.result === 'success') {
      props.addPersonHandler(person)
    } else {
      console.error(result.message)
    }
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
              <TextField id="name" label="Nombre" name="name" required />
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
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <TextField id="position" label="Cargo" name="position" required />
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

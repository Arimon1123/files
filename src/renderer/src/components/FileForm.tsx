import { useState, FormEvent } from 'react'
import {
  Box,
  FormControl,
  Grid2 as Grid,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField
} from '@mui/material'
import { areas } from '@renderer/constants/constants'
import { CustomButton } from '@renderer/components/Button'

export const FileForm = (): JSX.Element => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const file = Object.fromEntries(formData)
    // @ts-ignore <explanation>
    const result = await window.api.saveData(file)
    console.log(result)
    setOpenSnackbar(true)
  }
  const handleClose = () => {
    setOpenSnackbar(false)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container columnSpacing={1} rowSpacing={3}>
          <Grid size={12}>
            <h2>Registrar archivo</h2>
          </Grid>
          <Grid size={6}>
            <FormControl>
              <TextField
                id="number"
                variant="outlined"
                label="Número de tramite"
                type="text"
                name="number"
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <TextField
                id="description"
                variant="outlined"
                label="Descripción"
                name="description"
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="area"
                variant="outlined"
                label="Age"
                name="area"
                defaultValue={areas[0]}
              >
                {areas.map((area) => {
                  return (
                    <MenuItem value={area} key={area}>
                      {area}
                    </MenuItem>
                  )
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <TextField
                id="institution"
                variant="outlined"
                label="Intitución"
                name="institution"
              />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth>
              <TextField id="medium" variant="outlined" label="Medio" name="medium" />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth>
              <TextField id="volume" variant="outlined" label="Volumen" name="volume" />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth>
              <TextField id="year" variant="outlined" label="Año" name="year" />
            </FormControl>
          </Grid>
          <Grid>
            <CustomButton type="submit">Guardar</CustomButton>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        message={'Guardado'}
        autoHideDuration={6000}
        onClose={handleClose}
      ></Snackbar>
    </Box>
  )
}

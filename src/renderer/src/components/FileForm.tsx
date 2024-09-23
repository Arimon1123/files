import { useState, FormEvent } from 'react'
import { Autocomplete, Box, FormControl, Grid2 as Grid, Snackbar, TextField } from '@mui/material'
import { CustomButton } from '@renderer/components/Button'
import { AreaSelect } from './AreaSelect'
import { File } from '@renderer/types/types'

interface FileFormProps {
  addFileHandler: (file: File) => void
}

export const FileForm = (props: FileFormProps): JSX.Element => {
  const [openSnackbar, setOpenSnackbar] = useState<boolean>(false)
  const [options, setOptions] = useState<File[]>([])
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const file = Object.fromEntries(formData)
    // @ts-ignore <explanation>
    const result = await window.api.saveFile(file)
    const savedFile = result.data
    result.result === 'success' ? setOpenSnackbar(true) : console.error(result.message)
    if (savedFile) {
      props.addFileHandler(savedFile)
    } else {
      console.error('Saved file is undefined')
    }
  }
  const handleClose = () => {
    setOpenSnackbar(false)
  }
  const handleOnChange = async (event) => {
    const value = event.target.value
    const files = await window.api.filterByName(value)
    setOptions(files.data ?? [])
  }
  const handleClick = (event, value) => {
    console.log(value)
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <form onSubmit={handleSubmit}>
        <Grid container columnSpacing={1} rowSpacing={3}>
          <Grid size={12}>
            <h2>Registrar archivo</h2>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth>
              <Autocomplete
                id="fileNumber"
                options={options}
                freeSolo
                onKeyDown={handleOnChange}
                getOptionLabel={(option: string | File) =>
                  typeof option === 'string' ? option : option.fileNumber
                }
                renderInput={(params) => <TextField {...params} label="Número de tramite" />}
                renderOption={(params, option: File) => {
                  const { key, ...optionProps } = params
                  return (
                    <Box
                      key={key}
                      component="li"
                      {...optionProps}
                      onClick={() => {
                        handleClick(event, option)
                      }}
                    >
                      {option.fileNumber}
                    </Box>
                  )
                }}
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
              <AreaSelect
                id="area"
                labelId="label-area"
                variant="outlined"
                label="Dirección"
                name="area"
                defaultValue={'DTO'}
              />
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
        autoHideDuration={250}
        onClose={handleClose}
      ></Snackbar>
    </Box>
  )
}

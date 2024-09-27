import { useState, FormEvent, ChangeEvent, ReactNode } from 'react'
import { Autocomplete, Box, FormControl, Grid2 as Grid, SelectChangeEvent } from '@mui/material'
import { CustomButton } from '@renderer/components/Button'
import { AreaSelect } from '../components/AreaSelect'
import { File } from '@renderer/types/types'
import { BootstrapInput } from '@renderer/components/TextField'
import { CustomLabel } from '@renderer/components/CustomLabel'

interface FileFormProps {
  addFileHandler: (file: File) => void
}

export const FileForm = (props: FileFormProps): JSX.Element => {
  const [options, setOptions] = useState<File[]>([])
  const [file, setFile] = useState<File>({ fileNumber: '' } as File)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.target as HTMLFormElement)
    const file = Object.fromEntries(formData)
    console.table(file)
    // @ts-ignore <explanation>
    const result = await window.api.saveFile(file)
    const savedFile = result.data
    if (savedFile) {
      props.addFileHandler(savedFile)
    } else {
      console.error('Saved file is undefined')
    }
  }

  const handleOnChange = async (event) => {
    const value = event.target.value
    const files = await window.api.filterByName(value)
    setOptions(files.data ?? [])
  }
  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = event.target.name
    const newFile = { ...file }
    newFile[name] = event.target.value
    console.table(newFile)
    setFile(newFile)
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleChangeSelect = (event: SelectChangeEvent<unknown>, _child: ReactNode) => {
    const name = event.target.name
    const newFile = { ...file }
    newFile[name] = event.target.value
    console.table(newFile)
    setFile(newFile)
  }
  const handleAutocompleteChange = (_event, value) => {
    if (value) setFile(value)
    else setFile({} as File)
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
                value={file.fileNumber ? file.fileNumber : ''}
                onChange={handleAutocompleteChange}
                onKeyDown={handleOnChange}
                getOptionLabel={(option: string | File) =>
                  typeof option === 'string' ? option : option.fileNumber
                }
                renderInput={(params) => (
                  <FormControl variant="standard">
                    <CustomLabel shrink>Número de tramite</CustomLabel>
                    <BootstrapInput
                      inputProps={params.inputProps}
                      ref={params.InputProps.ref}
                      name="fileNumber"
                    />
                  </FormControl>
                )}
                renderOption={(params, option: File) => {
                  const { key, ...optionProps } = params
                  return (
                    <Box key={key} component="li" {...optionProps}>
                      {option.fileNumber}
                    </Box>
                  )
                }}
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth variant={'standard'}>
              <CustomLabel htmlFor="description" shrink>
                Descripción
              </CustomLabel>
              <BootstrapInput
                id="description"
                name="description"
                placeholder="Descripción"
                minRows={3}
                multiline
                sx={{ width: '100%' }}
                value={file.description ? file.description : ''}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth variant="standard">
              <AreaSelect
                id="area"
                labelId="label-area"
                variant="outlined"
                label="Dirección"
                name="area"
                value={file.area ? file.area : ''}
                onChange={handleChangeSelect}
              />
            </FormControl>
          </Grid>
          <Grid size={6}>
            <FormControl fullWidth variant="standard">
              <CustomLabel htmlFor="institution" shrink>
                Institución
              </CustomLabel>
              <BootstrapInput
                id="institution"
                name="institution"
                value={file.institution ? file.institution : ''}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth variant="standard">
              <CustomLabel htmlFor="medium" shrink>
                Medio
              </CustomLabel>
              <BootstrapInput
                id="medium"
                name="medium"
                value={file.medium ? file.medium : ''}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth variant="standard">
              <CustomLabel htmlFor="volume">Volumen</CustomLabel>
              <BootstrapInput
                id="volume"
                name="volume"
                value={file.volume ? file.volume : ''}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid size={4}>
            <FormControl fullWidth variant="standard">
              <CustomLabel htmlFor="year">Fecha</CustomLabel>
              <BootstrapInput
                id="year"
                name="year"
                value={file.year ? file.year : ''}
                onChange={handleChange}
              />
            </FormControl>
          </Grid>
          <Grid>
            <CustomButton type="submit">Guardar</CustomButton>
          </Grid>
        </Grid>
      </form>
    </Box>
  )
}

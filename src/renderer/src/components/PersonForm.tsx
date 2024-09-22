import { FormControl, Grid2 as Grid, TextField } from '@mui/material'

export function PersonForm() {
  return (
    <form>
      <Grid container columnSpacing={2} rowSpacing={4}>
        <Grid size={12}>
          <FormControl fullWidth>
            <TextField id="name" label="Nombre" required />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <TextField id="area" label="Dirección" required />
          </FormControl>
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <TextField id="position" label="Cargo" required />
          </FormControl>
        </Grid>
      </Grid>
    </form>
  )
}

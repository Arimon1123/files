import { InputLabel, MenuItem, Select, SelectProps } from '@mui/material'
import { areas } from '@renderer/constants/constants'

export function AreaSelect(props: SelectProps) {
  const { labelId, label } = props
  return (
    <>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select {...props}>
        {areas.map((area) => {
          return (
            <MenuItem value={area} key={area} style={{ width: '100%' }}>
              {area}
            </MenuItem>
          )
        })}
      </Select>
    </>
  )
}

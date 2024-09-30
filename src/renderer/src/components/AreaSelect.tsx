import { MenuItem, Select, SelectProps } from '@mui/material'
import { areas } from '@renderer/constants/constants'
import { CustomLabel } from './CustomLabel'
import { BootstrapInput } from './TextField'

export function AreaSelect(props: SelectProps) {
  const { labelId, label } = props
  return (
    <>
      <CustomLabel id={labelId} shrink>
        {label}
      </CustomLabel>
      <Select {...props} input={<BootstrapInput></BootstrapInput>} sx={{ margin: 0 }}>
        {areas.map((area) => {
          return (
            <MenuItem
              value={area.value}
              key={area.value}
              disabled={area.disabled}
              style={{ width: '100%' }}
            >
              {area.label}
            </MenuItem>
          )
        })}
      </Select>
    </>
  )
}

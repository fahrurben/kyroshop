import {
  FormControl, FormControlLabel,
  FormGroup, FormHelperText,
  InputLabel, MenuItem,
  OutlinedInput, Select,
} from '@mui/material'
import { Controller } from 'react-hook-form'


function SelectBoxFieldElement({name, label, options, control, ...props}) {
  return (
    <Controller
      name={name}
      label={label}
      control={control}
      {...props}
      render={({ field, fieldState }) => (
        <FormControl sx={{ minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-helper-label">{label}</InputLabel>
          <Select
            size="small"
            label={label}
            {...field}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {
              options?.map((row) => {
                return <MenuItem value={row.value}>{row.label}</MenuItem>
              })
            }
          </Select>
          {
            fieldState.error?.message && <FormHelperText>{fieldState.error?.message}</FormHelperText>
          }
        </FormControl>
      )}
    />
  )
}

export default SelectBoxFieldElement
import {
  FormControl, FormControlLabel,
  FormGroup, FormHelperText,
  InputLabel, MenuItem,
  OutlinedInput, Select,
} from '@mui/material'
import { Controller } from 'react-hook-form'
import Box from '@mui/material/Box'


function SelectBoxFieldElement({name, label, options, control, ...props}) {
  return (
    <Controller
      name={name}
      label={label}
      control={control}
      defaultValue=""
      {...props}
      render={({ field, fieldState }) => (
        <Box sx={{ minWidth: 120, marginTop: "0.5rem" }}>
          <InputLabel id={name}>{label}</InputLabel>
          <Select
            size="small"
            label={label}
            labelId={name}
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
        </Box>
      )}
    />
  )
}

export default SelectBoxFieldElement
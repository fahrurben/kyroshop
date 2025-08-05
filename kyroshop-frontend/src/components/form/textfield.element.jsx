import { FormControl, InputLabel, OutlinedInput } from '@mui/material'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'

function TextFieldElement({name, label, control, type='text', ...props}) {
 return (
   <Controller
     name={name}
     label={label}
     control={control}
     {...props}
     render={({ field, fieldState }) => (
       <TextField
         label={label}
         error={!!fieldState.error}
         helperText={fieldState.error?.message}
         type={type}
         {...field}
       />
     )}
   />
 )
}

export default TextFieldElement
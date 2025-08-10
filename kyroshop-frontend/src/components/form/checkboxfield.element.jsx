import {
  FormControl, FormControlLabel,
  FormGroup,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import TextField from '@mui/material/TextField'
import { Controller } from 'react-hook-form'
import Checkbox from '@mui/material/Checkbox';

function CheckBoxFieldElement({name, label, control, ...props}) {
 return (
   <Controller
     name={name}
     label={label}
     control={control}
     {...props}
     render={({ field, fieldState }) => (
       <FormGroup>
         <FormControlLabel control={<Checkbox checked={field.value} {...field} />} label={label} />
       </FormGroup>
     )}
   />
 )
}

export default CheckBoxFieldElement
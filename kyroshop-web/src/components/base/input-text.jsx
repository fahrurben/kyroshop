import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'

function InputText ({
  name,
  field,
  label = '',
  placeholder = '',
  className= '',
  type = 'text',
}) {
  return (
    <FormItem className={className}>
      {label !== ''
        ? <FormLabel>{<label htmlFor={name}>{label}</label>}</FormLabel>
        : null}
      <FormControl>
        <Input type={type} placeholder={placeholder} {...field} />
      </FormControl>
      <FormMessage/>
    </FormItem>
  )
}

export default InputText
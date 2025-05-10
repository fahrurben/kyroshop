import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Checkbox } from '../ui/checkbox.js'
import { cn } from '../../helpers/cn.js'

function CheckBoxInput({
  name,
  field,
  label = '',
}) {
  return (
    <FormItem className="flex flex-row items-start">
      <FormControl>
        <Checkbox
          checked={field.value}
          onChange={(checked) => {
            field.onChange(!checked)
          }}
          onClick={() => {
            field.onChange(!field.value)
          }}
        />
      </FormControl>
      {
        label !== ''
          ? <FormLabel>{label}</FormLabel>
            : null
      }
      <FormMessage/>
    </FormItem>
  )
}

export default CheckBoxInput
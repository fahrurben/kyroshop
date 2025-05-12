import { cn } from '../../helpers/cn.js'
import { Button } from '../../components/ui/button.js'
import { Plus, TrashIcon } from 'lucide-react'
import DataTable from '../../components/base/data-table.jsx'
import { z } from 'zod'
import { useQueryClient } from '@tanstack/react-query'
import { useFieldArray, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormField } from '../../components/ui/form.js'
import InputText from '../../components/base/input-text.jsx'
import CheckBoxInput from '../../components/base/check-box-input.jsx'
import Combobox from '../../components/base/combo-box.jsx'
import {
  useCreateCategory,
  useGetCategory,
} from '../../api-hooks/use-category.api.js'
import { Textarea } from '../../components/ui/textarea.js'
import InputTextarea from '../../components/base/input-textarea.jsx'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '../../components/ui/card.js'
import { toast } from 'sonner'
import { show_form_error_message } from '../../helpers/error_message.js'
import { useNavigate } from 'react-router'
import { useCreateProduct } from '../../api-hooks/use-product.api.js'
import UploadFormField from '../../components/base/upload-input.jsx'

const variantSchema = z.object({
  name: z.string().max(255),
  stock: z.coerce.number(),
})

const imageSchema = z.object({
  filename: z.string(),
})

const formSchema = z.object({
  name: z.string().min(2).max(255),
  category_id: z.coerce.string(),
  price: z.coerce.number(),
  is_active: z.boolean(),
  variants: z.array(variantSchema),
  images: z.array(imageSchema),
})

function ProductForm({initialData = {}}) {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {...initialData}
  })

  const { data: {data: {results: categories} = {} } = {} } = useGetCategory(true)

  const categoryOptions = categories ? categories.map((category) => ({label: category.name, value: category.id.toString()})) : []
  const { fields: variantFields, append: appendVariant, remove: removeVariant } = useFieldArray({ control: form.control, name: "variants" });
  const { fields: imageFields, append: appendImage, remove: removeImage } = useFieldArray({ control: form.control, name: "images" });

  const createMutation = useCreateProduct({
    onSuccess: () => {
      toast('Product save successfully')
      navigate('/products')
    },
    onError: (errors) => {
      show_form_error_message(form, errors)
    }
  })

  const addVariant = () => {
    appendVariant({
      id: null,
      name: '',
      stock: '0',
    })
  }

  const addImage = () => {
    appendImage({
      id: null,
      filename: '',
    })
  }

  const onSubmit = (data) => {
    createMutation.mutate(data)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <InputText name="name" label="Name" placeholder="Name" field={field}/>
          )}
        />
        <FormField
          control={form.control}
          name="category_id"
          render={({ field }) => (
            <Combobox name="category_id" field={field} label="Parent" options={categoryOptions} />
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <InputTextarea name="description" label="Description" field={field} />
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <InputText name="price" label="Price" placeholder="Price" type="number" field={field}/>
          )}
        />
        <FormField
          control={form.control}
          name="is_active"
          render={({ field }) => (
            <CheckBoxInput name="is_active" label="Is Active" field={field} />
          )}
        />
        <Card>
          <CardHeader>
            <CardTitle className="w-full flex">
              <h5 className="font-bold">Images</h5>
              <Button className="ml-auto" type="button" onClick={addImage}><Plus
                ize={12}/></Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {imageFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 my-4 py-2">
                <UploadFormField field={field} name={`images.${index}.filename`} label="Image"
                                 required={true} />
                <Button type="button" onClick={() => removeVariant(index)}><TrashIcon
                  size={12}/></Button>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="w-full flex">
              <h5 className="font-bold">Variants</h5>
              <Button className="ml-auto" type="button" onClick={addVariant}><Plus
                ize={12}/></Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {variantFields.map((field, index) => (
              <div key={field.id} className="flex gap-4 my-4 py-2">
                <FormField
                  control={form.control}
                  name={`variants.${index}.name`}
                  render={({ field }) => (
                    <InputText name="name" label="Name" placeholder="Name" field={field} className="flex-grow"/>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`variants.${index}.stock`}
                  render={({ field }) => (
                    <InputText name="stock" label="Stock" placeholder="Stock" type="number" field={field} className="flex-grow"/>
                  )}
                />
                <Button type="button" onClick={() => removeVariant(index)}><TrashIcon
                  size={12}/></Button>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className={'flex justify-end gap-2'}>
          <Button type="submit">
            Submit
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProductForm
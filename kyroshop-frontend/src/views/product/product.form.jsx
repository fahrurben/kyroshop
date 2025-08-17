import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import TextFieldElement from '../../components/form/textfield.element.jsx'
import CheckBoxFieldElement
  from '../../components/form/checkboxfield.element.jsx'
import SelectBoxFieldElement
  from '../../components/form/selectboxfield.element.jsx'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import UploadFieldElement from '../../components/form/uploadfield.element.jsx'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Button from '@mui/material/Button'
import { toast } from 'mui-sonner'

import {
  useCreateProduct,
  useUpdateProduct,
} from '../../hooks/use-product.api.js'
import { show_form_error_message } from '../../helpers/form.helpers.js'
import { useNavigate } from 'react-router'
import { useEffect } from 'react'

const variantSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().max(255),
  stock: z.coerce.number(),
})

const imageSchema = z.object({
  id: z.coerce.number().optional(),
  filename: z.string(),
})

const formSchema = z.object({
  name: z.string().min(3),
  category_id: z.coerce.number().optional(),
  description: z.string(),
  price: z.coerce.number(),
  is_active: z.boolean(),
  variants: z.array(variantSchema),
  images: z.array(imageSchema),
})

const initialData = {
  'name': '',
  'description': '',
  'category_id': null,
  'price': 0,
  'is_active': null,
  'variants': [],
  'images': [],
}

function ProductForm ({ id = null, categoryOptions, productData = null }) {
  const navigate = useNavigate()

  const { control, reset, register, handleSubmit, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  })
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({ control: control, name: 'variants' })
  const {
    fields: imageFields,
    append: appendImage,
    remove: removeImage,
  } = useFieldArray({ control: control, name: 'images' })

  useEffect(() => {
    reset({ ...productData })
  }, [productData])

  const addImage = () => appendImage({
    id: null,
    filename: '',
  })

  const addVariant = () => appendVariant({
    id: null,
    name: '',
    stock: 0,
  })

  let createMutation = useCreateProduct({
    onSuccess: () => {
      toast('Product save successfully')
      navigate('/products')
    },
    onError: (errors) => {
      show_form_error_message(errors, setError)
    },
  })

  let updateMutation = useUpdateProduct({
    id:id,
    onSuccess: () => {
      toast('Product save successfully')
      navigate('/products')
    },
    onError: (errors) => {
      show_form_error_message(errors, setError)
    },
  })

  let formMutation = id ? updateMutation : createMutation

  const onSubmit = (data) => {
    if (id===null) {
      if (data.variants) {
        data.variants = data.variants.map((item) => {
          delete item.id
          return item
        })
      }
      if (data.images) {
        data.images = data.images.map((item) => {
          delete item.id
          return item
        })
      }
    }

    formMutation.mutate(data)
  }

  return (
    <box>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <CardHeader title="Details"/>
            <TextFieldElement name="name" label="Name" control={control}/>
            <SelectBoxFieldElement name="category_id" label="Category"
                                   control={control}
                                   options={categoryOptions}/>
            <TextFieldElement name="description" label="Description"
                              control={control} multiline={true}/>
            <TextFieldElement name="price" label="Price" control={control}
                              type="number"/>
            <CheckBoxFieldElement name="is_active" label="Is Active"
                                  control={control}/>
          </CardContent>
        </Card>

        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <CardHeader action={
              <IconButton aria-label="add" onClick={addImage}>
                <AddIcon/>
              </IconButton>
            } title="Images"/>
            {imageFields.map((field, index) => (
              <>
                <Box key={index} display="flex" flexDirection="row"
                     justifyContent="space-between"
                     sx={{ marginTop: 2, paddingY: 2 }}>
                  <UploadFieldElement control={control}
                                      name={`images.${index}.filename`}
                                      label="Image"
                                      required={true}/>
                  <IconButton aria-label="delete"
                              onClick={() => removeImage(index)}>
                    <DeleteIcon/>
                  </IconButton>
                </Box>
                <Divider></Divider>
              </>
            ))}
          </CardContent>
        </Card>

        <Card sx={{ marginTop: 4 }}>
          <CardContent>
            <CardHeader action={
              <IconButton aria-label="add" onClick={addVariant}>
                <AddIcon/>
              </IconButton>
            } title="Variants"/>
            {
              variantFields.map((field, index) => (
                <>
                  <Box key={index} display="flex" flexDirection="row"
                       justifyContent="space-between" gap={2}
                       sx={{ marginTop: 1, paddingY: 2 }}>
                    <TextFieldElement name={`variants.${index}.name`}
                                      label="Name"
                                      control={control}/>
                    <TextFieldElement name={`variants.${index}.stock`}
                                      label="Stock"
                                      type="number"
                                      control={control}/>
                    <IconButton aria-label="delete"
                                onClick={() => removeVariant(index)}>
                      <DeleteIcon/>
                    </IconButton>
                  </Box>
                  <Divider></Divider>
                </>
              ))
            }
          </CardContent>
        </Card>

        <Box display="flex" flexDirection="row" justifyContent="flex-end"
             sx={{ marginTop: 2 }} gap={2}>
          <Button onClick={() => navigate("/products")}>Cancel</Button>
          <Button variant="contained" type="submit">Save</Button>
        </Box>
      </form>
    </box>
  )
}

export default ProductForm
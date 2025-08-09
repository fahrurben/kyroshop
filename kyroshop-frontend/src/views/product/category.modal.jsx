import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useEffect, useState } from 'react'
import TextFieldElement from '../../components/form/textfield.element.jsx'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import CheckBoxFieldElement
  from '../../components/form/checkboxfield.element.jsx'
import {
  useGetCategory,
  useCreateCategory,
} from '../../hooks/use-category.api.js'
import SelectBoxFieldElement
  from '../../components/form/selectboxfield.element.jsx'
import Box from '@mui/material/Box'
import { Snackbar } from '@mui/material'
import { toast } from "mui-sonner"
import { useQueryClient } from '@tanstack/react-query'
import { show_form_error_message } from '../../helpers/form.helpers.js'

const formSchema = z.object({
  name: z.string().min(3),
  is_active: z.boolean(),
  parent_id: z.coerce.number().optional(),
})

function CategoryModal ({ open, setOpen, refreshPage, mode = 'create' }) {
  const queryClient = useQueryClient()

  const { data: categoriesData, refetch } = useGetCategory('', true)
  const categoryOptions = categoriesData?.results?.map(
    (row) => ({ value: row.id, label: row.name }))

  useEffect(() => {
    if (open) {
      refetch()
    }
  }, [open])

  const { control, handleSubmit, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      'name': '',
      'is_active': false,
      'parent_id': null,
    },
  })

  const createMutation = useCreateCategory({
    onSuccess: () => {
      toast('Category created succesfully')
      refreshPage()
    },
    onError: (errorResponse) => {
      show_form_error_message(errorResponse, setError)
    },
  })

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (data) => {
    if (data.parent_id === 0) {
      delete data.parent_id
    }

    createMutation.mutate(data)
  }

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth={true}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Category</DialogTitle>
          <DialogContent>
            <Box>
              <TextFieldElement name="name" label="Name" control={control}/>
              <CheckBoxFieldElement name="is_active" label="Is Active"
                                    control={control}/>
              <SelectBoxFieldElement name="parent_id" label="Parent"
                                     control={control}
                                     options={categoryOptions}/>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
)
}

export default CategoryModal
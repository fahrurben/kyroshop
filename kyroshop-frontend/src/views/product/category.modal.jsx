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
  useCreateCategory, useUpdateCategory,
} from '../../hooks/use-category.api.js'
import SelectBoxFieldElement
  from '../../components/form/selectboxfield.element.jsx'
import Box from '@mui/material/Box'
import { Snackbar } from '@mui/material'
import { toast } from 'mui-sonner'
import { useQueryClient } from '@tanstack/react-query'
import { show_form_error_message } from '../../helpers/form.helpers.js'

const formSchema = z.object({
  name: z.string().min(3),
  is_active: z.boolean(),
  parent_id: z.coerce.number().optional(),
})

function CategoryModal ({
  open,
  setOpen,
  refreshPage,
  categoryOptions = [],
  id = null,
  initialData = null,
}) {
  const queryClient = useQueryClient()

  const { control, handleSubmit, reset, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: { ...initialData },
  })

  const createMutation = useCreateCategory({
    onSuccess: () => {
      toast('Category created successfully')
      refreshPage()
    },
    onError: (errorResponse) => {
      show_form_error_message(errorResponse, setError)
    },
  })

  const updateMutation = useUpdateCategory({
    id: id,
    onSuccess: () => {
      toast('Category updated successfully')
      refreshPage()
    },
    onError: (errorResponse) => {
      show_form_error_message(errorResponse, setError)
    }
  })

  useEffect(() => {
    reset({ ...initialData })
  }, [open, initialData])

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmit = (data) => {
    data.parent_id = data.parent_id ? data.parent_id : null
    if (id !== null) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
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
import { cn } from '../../helpers/cn'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog"

import {
  Form,
  FormField,
} from '../../components/ui/form'
import { useEffect } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'
import { useNavigate } from 'react-router'
import { show_form_error_message } from '../../helpers/error_message'
import InputText from '../../components/base/input-text'
import { API_URL  } from '../../helpers/constant'

import Combobox from '../../components/base/combo-box'
import { Loader2 } from 'lucide-react'
import CheckBoxInput from '../../components/base/check-box-input'
import {
  useCreateCategory,
  useUpdateCategory,
} from '../../api-hooks/use-category.api.js'
import { Button } from '../../components/ui/button.js'

const formSchema = z.object({
  name: z.string().min(2).max(255),
  is_active: z.boolean(),
  parent_id: z.coerce.string().optional(),
})

function CategoryModal({categories = [], initialData = {}, open, setOpen}) {
  const queryClient = useQueryClient()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {...initialData},
  })

  // console.log(form.getValues())
  // console.log(form.formState.errors)

  const createMutation = useCreateCategory({
    onSuccess: () => {
      toast('Category save successfully')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setOpen(false)
    },
    onError: (errors) => {
      show_form_error_message(form, errors)
    }
  })

  const updateMutation = useUpdateCategory({
    id: initialData?.id,
    onSuccess: () => {
      toast('Category save successfully')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      setOpen(false)
    },
    onError: (errors) => {
      show_form_error_message(form, errors)
    }
  })

  useEffect(() => {
    form.reset({ ...initialData })
  }, [open, initialData])

  const onSubmit = (data) => {
    if (initialData?.id !== null) {
      data.id = initialData.id
    }
    data.parent_id = Number.parseInt(data.parent_id)
    if (initialData?.id !== null) {
      updateMutation.mutate(data)
    } else {
      createMutation.mutate(data)
    }
  }

  const categoryOptions = categories ? categories.map((category) => ({label: category.name, value: category.id.toString()})) : []
  categoryOptions.unshift({value:"", label: "- No Parent -"})

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={cn("mb-4")}>
              {'id' in initialData && initialData?.id !== null ? "Edit" : "New"}
            </DialogTitle>
            <DialogDescription>
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
                    name="is_active"
                    render={({ field }) => (
                      <CheckBoxInput name="is_active" label="Is Active" field={field} />
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="parent_id"
                    render={({ field }) => (
                      <Combobox name="parent_id" field={field} label="Parent" options={categoryOptions} />
                    )}
                  />
                  <div className={'flex justify-end gap-2'}>
                    <Button type="button" variant="secondary" onClick={() => setOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit">
                      Submit
                    </Button>
                  </div>
                </form>
              </Form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default CategoryModal
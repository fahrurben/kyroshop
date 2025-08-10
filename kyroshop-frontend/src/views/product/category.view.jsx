import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AddIcon from '@mui/icons-material/Add';
import CategoryTable from './category.table.jsx'
import {
  useDeleteCategory,
  useGetCategory,
  useGetCategoryAll, useGetCategoryById,
} from '../../hooks/use-category.api.js'
import { Fab, Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { useEffect, useState } from 'react'
import CategoryNav from './category.nav.jsx'
import Grid from '@mui/material/Grid'
import CategoryModal from './category.modal.jsx'
import { useQueryClient } from '@tanstack/react-query'
import { toast } from 'mui-sonner'
import { show_form_error_message } from '../../helpers/form.helpers.js'

const formSchema = z.object({
  search: z.string(),
})

const categoryInitialData = {
  name: "",
  is_active: false,
  parent_id: null,
}

function CategoryView() {
  const queryClient = useQueryClient()

  const { control, register, handleSubmit, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "search": "",
    },
  })
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [ formInitialData, setFormInitialData ] = useState({...categoryInitialData})
  const [ selectedId, setSelectedId ] = useState(null)

  const { data, refetch } = useGetCategory(search, true)
  const { data: { results: categoryResults = []} = {}, refetch: refetchAllCategory} = useGetCategoryAll(true)
  const categoryOptions = categoryResults?.map(
    (row) => ({ value: row.id, label: row.name }))
  const { data: selectedCategory, refetch: refetchCategory } = useGetCategoryById(selectedId)

  useEffect(() => {
    if (selectedCategory) {
      setFormInitialData({...selectedCategory})
    }
  }, [selectedCategory])

  const onSubmit = (formData) => {
    setSearch(formData.search)
  }

  const refreshPage = () => {
    setOpen(false)
    setSelectedId(null)
    queryClient.invalidateQueries({ queryKey: ['categories', search] })
    queryClient.invalidateQueries({ queryKey: ['categories_all'] })
    refetchCategory()
  }

  const deleteMutation = useDeleteCategory({
    onSuccess: () => {
      toast('Category deleted successfully')
      refreshPage()
    },
    onError: (errorResponse) => {
      show_form_error_message(errorResponse, setError)
    }
  })

  const handleClick = () => {
    setSelectedId(null)
    setFormInitialData({...categoryInitialData})
    setOpen(true)
  }

  const showEditModal = (id) => {
    setSelectedId(id)
    setOpen(true)
  }

  const deleteCategory = (id) => {
    deleteMutation.mutate({ id })
  }

  return (
    <Box>
      <CategoryNav />
      <Grid container spacing={2} direction="row" sx={{ marginTop: 4 }}>
        <Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack direction="row" spacing={2} alignItems="start" sx={{ marginTop: 1 }}>
              <TextField label="Search" variant="outlined"
                         size="small" {...register("search")}
                         sx={{ width: "20rem" }}/>
              <IconButton aria-label="search" type="submit">
                <SearchIcon/>
              </IconButton>
            </Stack>
          </form>
        </Box>
        <Box sx={{ marginLeft: 'auto' }}>
          <Fab color="primary" aria-label="add" onClick={handleClick}>
            <AddIcon/>
          </Fab>
        </Box>
      </Grid>

      <CategoryTable
        data={data?.results}
        showEditModal={showEditModal}
        deleteCategory={deleteCategory}
      />
      <CategoryModal
        open={open}
        setOpen={setOpen}
        categoryOptions={categoryOptions}
        refreshPage={refreshPage}
        id={selectedId}
        initialData={formInitialData}
      />

    </Box>
  )
}

export default CategoryView
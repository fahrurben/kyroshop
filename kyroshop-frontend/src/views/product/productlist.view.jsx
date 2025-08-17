import CategoryNav from './category.nav.jsx'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Fab, Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import ProductTable from './product.table.jsx'
import { useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { z } from 'zod'
import {
  useDeleteCategory,
  useGetCategoryAll,
} from '../../hooks/use-category.api.js'
import { useDeleteProduct, useGetProduct } from '../../hooks/use-product.api.js'
import { useNavigate } from 'react-router'
import { toast } from 'mui-sonner'
import { show_form_error_message } from '../../helpers/form.helpers.js'

const formSchema = z.object({
  search: z.string(),
})

function ProductListView() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [search, setSearch] = useState("")

  const { control, register, handleSubmit, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "search": "",
    },
  })

  const { data: { results: productResults = []} = {}, refetch: refetchAllCategory} = useGetProduct(search,true)

  const refreshPage = () => {
    queryClient.invalidateQueries({ queryKey: ['products', search] })
  }

  const deleteMutation = useDeleteProduct({
    onSuccess: () => {
      toast('Product deleted successfully')
      refreshPage()
    },
    onError: (errorResponse) => {
      show_form_error_message(errorResponse, setError)
    }
  })

  const onSubmit = (formData) => {
    console.log(formData.search)
    setSearch(formData.search)
  }

  const deleteProduct = (id) => {
    deleteMutation.mutate({ id })
    refreshPage()
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
          <Fab color="primary" aria-label="add" onClick={() => navigate("/products/create")}>
            <AddIcon/>
          </Fab>
        </Box>
      </Grid>

      <ProductTable
        data={productResults}
        deleteProduct={deleteProduct}
      />
    </Box>
  )
}

export default ProductListView
import CategoryNav from './category.nav.jsx'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { useQueryClient } from '@tanstack/react-query'
import {
  useGetCategoryAll,
} from '../../hooks/use-category.api.js'
import ProductForm from './product.form.jsx'


function ProductCreate() {
  const queryClient = useQueryClient()

  const { data: { results: categoryResults = []} = {}, refetch: refetchAllCategory} = useGetCategoryAll(true)
  const categoryOptions = categoryResults?.map(
    (row) => ({ value: row.id, label: row.name }))

  return (
    <Box>
      <CategoryNav />
      <Grid container spacing={2} direction="row" sx={{ marginTop: 4 }}>
        <Box sx={{width: "100%"}}>
          <ProductForm categoryOptions={categoryOptions} />
        </Box>
      </Grid>
    </Box>
  )
}

export default ProductCreate
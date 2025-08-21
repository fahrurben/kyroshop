import CategoryNav from './category.nav.jsx'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { useQueryClient } from '@tanstack/react-query'
import {
  useGetCategoryAll,
} from '../../hooks/use-category.api.js'
import ProductForm from './product.form.jsx'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'


function ProductcreateView() {
  const queryClient = useQueryClient()

  const { data: { results: categoryResults = []} = {}, refetch: refetchAllCategory} = useGetCategoryAll(true)
  const categoryOptions = categoryResults?.map(
    (row) => ({ value: row.id, label: row.name }))

  return (
    <Card sx={{padding: 1}}>
      <CardContent>
        <CategoryNav />
        <Grid container spacing={2} direction="row" sx={{ marginTop: 4 }}>
          <Box sx={{width: "100%"}}>
            <ProductForm categoryOptions={categoryOptions} />
          </Box>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProductcreateView
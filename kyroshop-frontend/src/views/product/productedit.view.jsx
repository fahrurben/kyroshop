import CategoryNav from './category.nav.jsx'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'

import { useQueryClient } from '@tanstack/react-query'
import {
  useGetCategoryAll,
} from '../../hooks/use-category.api.js'
import ProductForm from './product.form.jsx'
import { useParams } from 'react-router'
import { useGetProductById } from '../../hooks/use-product.api.js'
import { useEffect } from 'react'


function ProductEditView() {
  const { id } = useParams()
  const queryClient = useQueryClient()

  const { data: {data: product } = {}, refetch: refetchProduct } = useGetProductById(id)

  useEffect(() => {
    refetchProduct()
  }, [])

  const { data: { results: categoryResults = []} = {}, refetch: refetchAllCategory} = useGetCategoryAll(true)
  const categoryOptions = categoryResults?.map(
    (row) => ({ value: row.id, label: row.name }))

  return (
    <Box>
      <CategoryNav />
      <Grid container spacing={2} direction="row" sx={{ marginTop: 4 }}>
        <Box sx={{width: "100%"}}>
          <ProductForm id={id} categoryOptions={categoryOptions} productData={{...product}} />
        </Box>
      </Grid>
    </Box>
  )
}

export default ProductEditView
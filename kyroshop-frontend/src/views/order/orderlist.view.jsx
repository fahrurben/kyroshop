import CategoryNav from '../product/category.nav.jsx'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import { Fab, Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import ProductTable from '../product/product.table.jsx'
import { z } from 'zod'
import { useNavigate } from 'react-router'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import OrderNav from './order.nav.jsx'
import { useGetProduct } from '../../hooks/use-product.api.js'
import { useGetOrders } from '../../hooks/use-orders.api.js'
import OrderTable from './order.table.jsx'
import SelectBoxFieldElement
  from '../../components/form/selectboxfield.element.jsx'
import { ORDER_STATUS_OPTIONS } from '../../helpers/constant.js'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'

const formSchema = z.object({
  status: z.string(),
})
function OrderlistView() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const [status, setStatus] = useState("")

  const { control, register, handleSubmit, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "status": null,
    },
  })

  const { data: { results: orderResults = []} = {}, refetch: refetchAllOrders} = useGetOrders(status,true)


  const onSubmit = (formData) => {
    console.log(formData)
    setStatus(formData.status)
  }

  return (
    <Card sx={{padding: 1}}>
      <CardContent>
        <OrderNav />
        <Grid container spacing={2} direction="row" sx={{ marginTop: 4 }}>
          <Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" spacing={2} alignItems="start" sx={{ marginTop: 1 }}>
                <SelectBoxFieldElement name="status"
                                       control={control}
                                       options={ORDER_STATUS_OPTIONS}
                                       sx={{ width: "50rem" }}/>
                <IconButton aria-label="search" type="submit">
                  <SearchIcon/>
                </IconButton>
              </Stack>
            </form>
          </Box>
        </Grid>

        <OrderTable data={orderResults} />
      </CardContent>
    </Card>
  )
}

export default OrderlistView
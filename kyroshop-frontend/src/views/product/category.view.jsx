import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import AddIcon from '@mui/icons-material/Add';
import CategoryTable from './category.table.jsx'
import { useGetCategory } from '../../hooks/use-category.api.js'
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

const formSchema = z.object({
  search: z.string(),
})


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

  const { data } = useGetCategory(search, true)

  const onSubmit = (formData) => {
    setSearch(formData.search)
  }

  const refreshPage = () => {
    setOpen(false)
    queryClient.invalidateQueries({ queryKey: ['categories', search] })
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
          <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
            <AddIcon/>
          </Fab>
        </Box>
      </Grid>

      <CategoryTable data={data?.results}/>
      <CategoryModal open={open} setOpen={setOpen} refreshPage={refreshPage}/>

    </Box>
  )
}

export default CategoryView
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import CategoryTable from './category.table.jsx'
import { useGetCategory } from '../../hooks/use-category.api.js'
import { Stack } from '@mui/material'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import SearchIcon from '@mui/icons-material/Search'
import { useState } from 'react'
import CategoryNav from './category.nav.jsx'

const formSchema = z.object({
  search: z.string(),
})


function CategoryView() {
  const { control, register, handleSubmit, setError } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      "search": "",
    },
  })
  const [search, setSearch] = useState("")

  const { data } = useGetCategory(search, true)

  const onSubmit = (formData) => {
    setSearch(formData.search)
  }

  return (
    <Box>
      <CategoryNav />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack direction="row" spacing={2} alignItems="start" sx={{marginTop: 4}}>
          <TextField label="Search" variant="outlined" size="small" {...register("search")} sx={{width: "20rem"}} />
          <IconButton aria-label="search" type="submit">
            <SearchIcon/>
          </IconButton>
        </Stack>
      </form>

      <CategoryTable data={data?.results}/>

    </Box>
  )
}

export default CategoryView
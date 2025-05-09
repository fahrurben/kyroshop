import { cn } from '../../helpers/cn'
import { Button } from '../../components/ui/button'
import { Plus } from 'lucide-react'
import { useGetCategory } from '../../api-hooks/use-category.api'
import DataTable from '../../components/base/data-table'
import CategoryModal from './category-modal'
import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'

function CategoryPage() {
  const categoryInitialData = {
    name: "",
    is_active: true,
    parent_id: "",
  }

  const queryClient = useQueryClient()

  const { data } = useGetCategory()
  const { data: {data: {results: categories} = {} } = {} } = useGetCategory()
  const [ formInitialData, setFormInitialData ] = useState({...categoryInitialData})

  const [open, setOpen] = useState(false)

  const columns = [
    {
      accessorKey: "name",
      header: "Name",
      filterFn: "includesString",
    },
    {
      accessorKey: "slug",
      header: "Slug",
    },
    {
      accessorKey: "full_name",
      header: "Hierarchy",
    },
    {
      accessorFn: row => `${row.is_active ? 'Yes' : 'No'}`,
      header: "Is Active",
      meta: {
        align: 'center'
      },
    },
  ]

  const btnAddClicked = () => {
    setFormInitialData({...categoryInitialData})
    setOpen(true)
  }

  return (
    <>
      <div className={cn("flex")}>
        <h1 className={cn('text-lg font-bold mb-4')}>Category</h1>
        <Button size="icon" className={cn("ml-auto")} onClick={btnAddClicked}>
          <Plus/>
        </Button>
      </div>
      <DataTable columns={columns} data={categories ?? []}/>
      <CategoryModal categories={categories} initialData={formInitialData} open={open} setOpen={setOpen} />
    </>
  )
}

export default CategoryPage
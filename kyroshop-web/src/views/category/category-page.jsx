import { cn } from '../../helpers/cn'
import { Button } from '../../components/ui/button'
import { MoreHorizontal, Plus } from 'lucide-react'
import {
  useCreateCategory, useDeleteCategory,
  useGetCategory,
  useGetCategoryById, useUpdateCategory,
} from '../../api-hooks/use-category.api'
import DataTable from '../../components/base/data-table'
import CategoryModal from './category-modal'
import { useEffect, useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu"
import { API_URL } from '../../helpers/constant.js'
import axios from 'axios'
import ConfirmationDialog from '../../components/custom/confirmation-dialog.jsx'
import { toast } from 'sonner'
import { show_form_error_message } from '../../helpers/error_message.js'

function CategoryPage() {
  const categoryInitialData = {
    name: "",
    is_active: false,
    parent_id: "",
  }

  const queryClient = useQueryClient()

  const [ selectedId, setSelectedId ] = useState(null)
  const [ deletedId, setDeletedId ] = useState(null)

  const [open, setOpen] = useState(false)
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState("")

  const { data: {data: {results: categories} = {} } = {} } = useGetCategory(true)
  const { data: {data: selectedCategory } = {}, refetch: refetchCategory } = useGetCategoryById(selectedId)
  const [ formInitialData, setFormInitialData ] = useState({...categoryInitialData})

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
    {
      id: "actions",
      cell: ({ row }) => {
        const id = row.original.id
        const name = row.original.name

        return (
          <DropdownMenu>
            <DropdownMenuTrigger >
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => showEditModal(id)}
              >
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => showDeleteConfirmationModal(id, name)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const deleteMutation = useDeleteCategory({
    id: deletedId,
    onSuccess: () => {
      toast('Category deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
    onError: (errors) => {
    }
  })

  useEffect(() => {
    if (selectedCategory) {
      let category = {...selectedCategory, parent_id: selectedCategory.parent_id?.toString() }
      setFormInitialData(category)
      setOpen(true)
    }
  }, [selectedCategory])

  const btnAddClicked = () => {
    setFormInitialData({...categoryInitialData})
    setOpen(true)
  }

  const showEditModal = async (id) => {
    await setSelectedId(id)
    await refetchCategory()
  }

  const closeEditModal = (isOpen) => {
    setOpen(isOpen)
    setSelectedId(null)
  }

  const showDeleteConfirmationModal = (id, name) => {
    setDeletedId(id)
    setConfirmMsg(`Are you sure to delete "${name}" ?`)
    setShowDeleteConfirmation(true)
  }

  const deleteCategory = () => {
    deleteMutation.mutate()
  }

  return (
    <>
      <div className={cn("flex")}>
        <h1 className={cn('text-lg font-bold mb-4')}>Category</h1>
        <Button size="icon" className={cn("ml-auto")} onClick={btnAddClicked}>
          <Plus/>
        </Button>
      </div>
      <DataTable columns={columns} data={categories ?? []} />
      <CategoryModal categories={categories} initialData={formInitialData} open={open} setOpen={closeEditModal} />
      <ConfirmationDialog show={showDeleteConfirmation} setShow={setShowDeleteConfirmation} message={confirmMsg} onConfirm={deleteCategory} />
    </>
  )
}

export default CategoryPage
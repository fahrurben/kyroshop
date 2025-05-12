import { cn } from '../../helpers/cn'
import { Button } from '../../components/ui/button'
import { MoreHorizontal, Plus } from 'lucide-react'
import DataTable from '../../components/base/data-table'
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
import CategoryModal from '../category/category-modal.jsx'
import {
  useDeleteProduct,
  useGetProduct,
} from '../../api-hooks/use-product.api.js'
import { useNavigate } from 'react-router'
import { useDeleteCategory } from '../../api-hooks/use-category.api.js'

function ProductList() {

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
      accessorFn: row => `${row.is_active ? 'Yes' : 'No'}`,
      header: "Is Active",
      meta: {
        align: 'center'
      },
    },
    {
      accessorKey: "category.name",
      header: "Category",
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
                onClick={() => navigate(`/products/edit/${id}`)}
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
  const queryClient = useQueryClient()

  const [ deletedId, setDeletedId ] = useState(null)

  const navigate = useNavigate()
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const [confirmMsg, setConfirmMsg] = useState("")

  const { data: { data: {results: products} = {} } = {} } = useGetProduct(true)

  const deleteMutation = useDeleteProduct({
    id: deletedId,
    onSuccess: () => {
      toast('Product deleted successfully')
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (errors) => {
    }
  })

  const btnAddClicked = () => {
    navigate("/products/create")
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
        <h1 className={cn('text-lg font-bold mb-4')}>Product</h1>
        <Button size="icon" className={cn("ml-auto")} onClick={btnAddClicked}>
          <Plus/>
        </Button>
      </div>
      <DataTable columns={columns} data={products ?? []} />
      <ConfirmationDialog show={showDeleteConfirmation} setShow={setShowDeleteConfirmation} message={confirmMsg} onConfirm={deleteCategory} />
    </>
  )
}

export default ProductList
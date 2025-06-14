import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu.js'
import { Button } from '../../components/ui/button.js'
import { MoreHorizontal, Plus } from 'lucide-react'
import { cn } from '../../helpers/cn.js'
import DataTable from '../../components/base/data-table.jsx'
import { useGetOrders } from '../../api-hooks/use-orders.api.js'
import { useState } from 'react'
import OrderModal from './order-modal.jsx'

function OrderPage() {
  const [ selectedId, setSelectedId ] = useState(null)
  const { data: {data: {results: orders} = {} } = {} } = useGetOrders(true)

  const [ open, setOpen ] = useState(false)
  const [ order, setOrder ] = useState()

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
      filterFn: "includesString",
    },
    {
      accessorKey: "customer.full_name",
      header: "Customer Name",
      filterFn: "includesString",
    },
    {
      accessorKey: "customer.address.address",
      header: "Address",
      filterFn: "includesString",
    },
    {
      accessorKey: "customer.address.city_display",
      header: "City",
      filterFn: "includesString",
    },
    {
      accessorKey: "total",
      header: "Total",
    },
    {
      accessorKey: "status",
      header: "Status",
    },
    {
      accessorKey: "created_at",
      header: "Created At",
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
                onClick={() => showViewModal(id)}
              >
                View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const showViewModal = (id) => {
    let order = orders.find((el) => el.id === id)
    setOrder(order)
    setOpen(true)
  }

  return (
    <>
      <div className={cn("flex")}>
        <h1 className={cn('text-lg font-bold mb-4')}>Orders</h1>
      </div>
      <DataTable columns={columns} data={orders ?? []}/>
      <OrderModal order={order} open={open} setOpen={setOpen} />
    </>
  )
}

export default OrderPage
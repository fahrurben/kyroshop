import {
  Dialog,
  DialogContent, DialogDescription,
  DialogHeader, DialogTitle,
} from '../../components/ui/dialog.js'
import { cn } from '../../helpers/cn.js'
import { Button } from '../../components/ui/button.js'
import DataTable from '../../components/base/data-table.jsx'

function OrderModal({order, open, setOpen}) {
  const columns = [
    {
      accessorKey: "variant.product_display",
      header: "Product",
      filterFn: "includesString",
    },
    {
      accessorKey: "variant.name",
      header: "Variant",
      filterFn: "includesString",
    },
    {
      accessorKey: "qty",
      header: "Qty",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "subtotal",
      header: "Subtotal",
    },
  ]

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={cn("mb-4")}>
              {'Order Details'}
            </DialogTitle>
            <DialogDescription>
              <p className="flex my-2">
                <span className="block w-40">Full Name</span>
                <span>{order?.customer?.full_name}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Email</span>
                <span>{order?.customer?.email}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Province</span>
                <span>{order?.customer?.address?.province_display}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">City/Regency</span>
                <span>{order?.customer?.address?.city_display}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Address</span>
                <span>{order?.customer?.address?.address}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Postal Code</span>
                <span>{order?.customer?.address?.postal_code}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Phone Number</span>
                <span>{order?.customer?.address?.phone_number}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Total</span>
                <span>{order?.total}</span>
              </p>
              <DataTable columns={columns} data={order?.orderline_set ?? []}/>
              <div className={'flex justify-end gap-2'}>
                <Button type="button" variant="secondary"
                        onClick={() => setOpen(false)}>
                  Cancel
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default OrderModal
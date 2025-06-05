import {
  Dialog,
  DialogContent, DialogDescription,
  DialogHeader, DialogTitle,
} from '../../components/ui/dialog.js'
import { cn } from '../../helpers/cn.js'
import { Button } from '../../components/ui/button.js'

function CustomerModal({customer, open, setOpen}) {
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className={cn("mb-4")}>
              {'Customer Details'}
            </DialogTitle>
            <DialogDescription>
              <p className="flex my-2">
                <span className="block w-40">Email</span>
                <span>{customer?.email}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Full Name</span>
                <span>{customer?.full_name}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Birth Day</span>
                <span>{customer?.birthday}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Address</span>
                <span>{customer?.address?.address}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Postal Code</span>
                <span>{customer?.address?.postal_code}</span>
              </p>
              <p className="flex my-2">
                <span className="block w-40">Phone Number</span>
                <span>{customer?.address?.phone_number}</span>
              </p>
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

export default CustomerModal
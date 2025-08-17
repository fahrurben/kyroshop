import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import TableBody from '@mui/material/TableBody'
import TableContainer from '@mui/material/TableContainer'
import { useState } from 'react'
import { TableFooter, TablePagination } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import { useConfirm } from 'material-ui-confirm'
import { useNavigate } from 'react-router'

function OrderTable ({ data = null}) {
  const navigate = useNavigate()
  const confirm = useConfirm()

  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  return (
    <TableContainer component={Paper} sx={{ marginTop: 2 }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Customer</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Total</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
              ? data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : data
          )?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.customer.full_name}
              </TableCell>
              <TableCell align="left">{row.customer.address.address}</TableCell>
              <TableCell align="center">{row.total}</TableCell>
              <TableCell align="center">{row.status}</TableCell>
              <TableCell align="center">
                <IconButton color="primary" size="small" onClick={() => {}}>
                  <EditIcon fontSize="inherit" />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={5}
              count={data?.length}
              rowsPerPage={rowsPerPage}
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default OrderTable
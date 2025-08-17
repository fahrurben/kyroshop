import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useLocation, useNavigate } from 'react-router'

function OrderNav() {
  let location = useLocation()
  let navigate = useNavigate()

  let activeNav = 0
  switch (location.pathname) {
    case "/orders":
      activeNav = 0
      break
    default:
      activeNav = 1
  }

  const handleChange = (e, newValue) => {
    let navigateTo = "/products"
    switch (newValue) {
      case 1:
        navigateTo = "/orders"
        break
      default:
        navigateTo = "/orders"
    }

    navigate(navigateTo)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeNav} onChange={handleChange}>
          <Tab label="Orders"/>
        </Tabs>
      </Box>
    </Box>
  )
}

export default OrderNav
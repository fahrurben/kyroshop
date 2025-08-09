import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { useLocation, useNavigate } from 'react-router'

function CategoryNav() {
  let location = useLocation()
  let navigate = useNavigate()

  console.log(location)
  let activeNav = 0
  switch (location.pathname) {
    case "/categories":
      activeNav = 1
      break
    default:
      activeNav = 0
  }

  const handleChange = (e, newValue) => {
    let navigateTo = "/products"
    switch (newValue) {
      case 1:
        navigateTo = "/categories"
        break
      default:
        navigateTo = "/products"
    }

    navigate(navigateTo)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={activeNav} onChange={handleChange}>
          <Tab label="Products"/>
          <Tab label="Category"/>
        </Tabs>
      </Box>
    </Box>
  )
}

export default CategoryNav
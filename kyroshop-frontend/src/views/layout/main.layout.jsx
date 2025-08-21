import * as React from 'react'
import { Outlet, useNavigate } from 'react-router'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import CssBaseline from '@mui/material/CssBaseline'
import Divider from '@mui/material/Divider'
import Drawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import MenuIcon from '@mui/icons-material/Menu'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import useAuth from '../../hooks/use-auth.js'
import { ListItemIcon, Menu, MenuItem } from '@mui/material'
import AccountCircle from '@mui/icons-material/AccountCircle'
import DashboardIcon from '@mui/icons-material/Dashboard'
import InventoryIcon from '@mui/icons-material/Inventory'
import ListAltIcon from '@mui/icons-material/ListAlt'
import LogoutIcon from '@mui/icons-material/Logout'

import {
  actions as authActions,
  store as authStore,
} from '../../stores/auth.store.js'

const drawerWidth = 240
const navItems = [
  { 'label': 'Home', 'route': '/', 'icon': <DashboardIcon />},
  { 'label': 'Products', 'route': '/products', 'icon': <InventoryIcon />},
  { 'label': 'Orders', 'route': '/orders', 'icon': <ListAltIcon /> },
]

function MainLayout (props) {
  const { user } = useAuth()
  const { window } = props
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null)
  const [mobileOpen, setMobileOpen] = React.useState(false)
  const isMenuOpen = Boolean(anchorEl)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState)
  }

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    authActions.removeToken()
    navigate('/login')
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </Menu>
  )

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Kyroshop
      </Typography>
      <Divider/>
      <List>
        {navItems.map((item) => (
          <ListItem key={item.label} disablePadding>
            <ListItem key={item.label} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.label}
                              onClick={() => navigate(item.route)} />
              </ListItemButton>
            </ListItem>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  const container = window !== undefined
    ? () => window().document.body
    : undefined

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon/>
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Kyroshop
          </Typography>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Box sx={{paddingTop: 1.5, marginLeft: 1}}>
              {`${user.username}`}
            </Box>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle/>
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Box component="main" sx={{ backgroundColor: "#F0F2F5", minWidth: '100%', minHeight: '100vh' }}>
        <Toolbar/>
        <Box sx={{p: 4}}>
          <Outlet/>
        </Box>
      </Box>
    </Box>
  )
}

export default MainLayout
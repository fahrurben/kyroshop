import { Outlet } from 'react-router';
import useAuth from '../../hooks/use-auth.js'


function MainLayout () {
  useAuth()

  return (
    <>
      <Outlet/>
    </>
  )
}

export default MainLayout
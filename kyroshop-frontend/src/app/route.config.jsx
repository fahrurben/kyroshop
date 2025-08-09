import { createBrowserRouter } from 'react-router'
import HomeView from '../views/home/home.view.jsx'
import LoginView from '../views/login/login.view.jsx'
import MainLayout from '../views/layout/main.layout.jsx'
import CategoryView from '../views/product/category.view.jsx'

const routeConfig = createBrowserRouter([
  {
    path: '/login',
    element: <LoginView/>,
  },
  {
    // again, no path, just a component for the layout
    Component: MainLayout,
    children: [
      { path: '/', element: <HomeView/> },
      { path: '/categories', element: <CategoryView/> },
    ],
  },
])

export default routeConfig
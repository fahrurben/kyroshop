import { createBrowserRouter } from 'react-router'
import HomeView from '../views/home/home.view.jsx'
import LoginView from '../views/login/login.view.jsx'
import MainLayout from '../views/layout/main.layout.jsx'
import CategoryView from '../views/product/category.view.jsx'
import ProductcreateView from '../views/product/productcreate.view.jsx'
import ProductEditView from '../views/product/productedit.view.jsx'

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
      { path: '/product/create', element: <ProductcreateView/> },
      { path: '/product/edit/:id', element: <ProductEditView/> },
    ],
  },
])

export default routeConfig
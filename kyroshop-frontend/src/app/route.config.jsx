import { createBrowserRouter } from 'react-router'
import HomeView from '../views/home/home.view.jsx'
import LoginView from '../views/login/login.view.jsx'
import MainLayout from '../views/layout/main.layout.jsx'
import CategoryView from '../views/product/category.view.jsx'
import ProductcreateView from '../views/product/productcreateView.jsx'
import ProductEditView from '../views/product/productedit.view.jsx'
import ProductListView from '../views/product/productlist.view.jsx'

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
      { path: '/products', element: <ProductListView/> },
      { path: '/products/create', element: <ProductcreateView/> },
      { path: '/products/edit/:id', element: <ProductEditView/> },
    ],
  },
])

export default routeConfig
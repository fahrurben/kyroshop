import { BrowserRouter, Route, Routes } from 'react-router'
import { Toaster } from "@/components/ui/sonner"

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { SidebarProvider } from "@/components/ui/sidebar"
import LoginPage from './views/login/login-page'
import HomePage from './views/home/home-page.jsx'
import MainLayout from './views/main-layout.jsx'
import CategoryPage from './views/category/category-page.jsx'
import useAuth from './hooks/use-auth.js'
import ProductList from './views/product/product-list.jsx'
import ProductCreate from './views/product/product-create.jsx'
import ProductEdit from './views/product/product-edit.jsx'
import CustomerPage from './views/customer/customer-page.jsx'


const queryClient = new QueryClient()

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <SidebarProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage/>}/>
            <Route element={<MainLayout />}>
              <Route path="/categories" element={<CategoryPage />}/>
              <Route path="/products/create" element={<ProductCreate />}/>
              <Route path="/products/edit/:id" element={<ProductEdit />}/>
              <Route path="/products" element={<ProductList />}/>
              <Route path="/customers" element={<CustomerPage />}/>
              <Route path="/" element={<HomePage />}/>
            </Route>
          </Routes>
          <Toaster />
        </BrowserRouter>
      </SidebarProvider>
    </QueryClientProvider>
  )
}

export default App

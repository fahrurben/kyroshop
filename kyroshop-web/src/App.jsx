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

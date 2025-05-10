import React from 'react';
import { Outlet } from 'react-router';
import { cn } from '../helpers/cn'
import { AppSidebar } from '../components/custom/app-sidebar'
import { SidebarTrigger } from '../components/ui/sidebar'
import useAuth from '../hooks/use-auth.js'

function MainLayout() {
  useAuth()

  return (
    <div className={cn("flex flex-row w-full")}>
      <AppSidebar/>
      <main className={cn("grow")}>
        <div className={cn('w-full min-h-screen p-[20px] relative')}>
          <SidebarTrigger/>
          <Outlet/>
        </div>
      </main>
    </div>
  )
}

export default MainLayout
import React from 'react';
import { Outlet } from 'react-router';
import { cn } from '../../helpers/cn.js'
import { AppSidebar } from '../../components/custom/AppSidebar.jsx'
import { SidebarTrigger } from '../../components/ui/sidebar.js'

function RootLayout() {
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

export default RootLayout
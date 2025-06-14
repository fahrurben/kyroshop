import {
  Home,
  Settings,
  LayoutGrid,
  CirclePower,
  ChevronUp,
  Users,
  ShoppingCart,
} from 'lucide-react'

import { Link } from 'react-router'

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '../../lib/utils.js'
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible.js'
import {
  SidebarFooter,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from '../ui/sidebar.js'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu'
import { useSnapshot } from 'valtio/react'
import { useNavigate } from 'react-router'

import authStore from '../../stores/auth-store.js'

// Menu items.
const items = [
  {
    title: 'Home',
    url: '',
    icon: Home,
  },
]

export function AppSidebar () {
  const navigate = useNavigate()

  const { user } = useSnapshot(authStore.state)
  const { clearToken } = authStore.actions

  const signOut = () => {
    clearToken()
    navigate('/login')
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel><h1 className={cn("font-bold text-xl")}>Kyroshop</h1></SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon/>
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <Collapsible defaultOpen className="group/collapsible">
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton>
                      <LayoutGrid/>
                      <span>Products</span>
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton>
                          <Link to="/products">
                            <span>Manage Products</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                      <SidebarMenuSubItem>
                        <SidebarMenuButton>
                          <Link to="/categories">
                            <span>Categories</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
                <SidebarMenuItem key="customers">
                  <SidebarMenuButton asChild>
                    <Link to="/customers">
                      <Users/>
                      <span>{"Customers"}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem key="customers">
                <SidebarMenuButton asChild>
                  <Link to="/orders">
                    <ShoppingCart/>
                    <span>{"Orders"}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {`${user?.first_name} ${user?.last_name}`}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => signOut()}>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
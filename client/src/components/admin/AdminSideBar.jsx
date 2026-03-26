import {
  LayoutGrid,
  Home,
  Inbox,
  Users,
  Package,
  Store,
  LogOut
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader
} from "@/components/ui/sidebar"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { cn } from "../../lib/utils"
import { Separator } from "../ui/separator"
import { Button } from "../ui/button"
import useAuthStore from "../../zustand/useAuth"
import toast from "react-hot-toast"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/dashboard/main",
    icon: Home
  },
  {
    title: "Product",
    url: "/dashboard/product/list",
    icon: Inbox
  },
  {
    title: "Category",
    url: "/dashboard/category/list",
    icon: LayoutGrid
  },
  {
    title: "User",
    url: "/dashboard/user/list",
    icon: Users
  },
  {
    title: "Order",
    url: "/dashboard/order/list",
    icon: Package
  }
]

const AdminSidebar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const {clearUser} = useAuthStore()

  const handleLogout = () => {
    clearUser()
    toast.success("Logout successfull.")
    navigate("/")
  }

  return (
    <Sidebar className="border-none">
      <SidebarHeader className=" py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-800 text-primary-foreground">
            <Store className="h-5 w-5" />
          </div>

          <div className="leading-tight">
            <h1 className="text-base font-bold tracking-tight">
              E-<span className="text-primary">Shop</span>
            </h1>
            <p className="text-xs text-muted-foreground">Admin Dashboard</p>
          </div>
        </div>
        <Button
          variant="ghost"
          className="w-fit mt-2 text-primary hover:text-primary"
          onClick={handleLogout}
        >
          <LogOut /> Logout
        </Button>
      </SidebarHeader>
      <Separator className="my-4" />
      <SidebarContent className="px-1">
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                className={cn(
                  "py-5 font-semibold",
                  location.pathname === item.url &&
                    "bg-slate-800 text-white hover:bg-slate-800 hover:text-white shadow-xs"
                )}
                asChild
              >
                <Link to={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AdminSidebar

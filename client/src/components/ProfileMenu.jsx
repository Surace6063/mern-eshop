import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useLogoutUser } from "../api/authServices"
import toast from "react-hot-toast"
import useAuthStore from "../zustand/useAuth"
import { Link } from "react-router-dom"

const ProfileMenu = () => {
  const { clearUser, user } = useAuthStore()

  const { mutate } = useLogoutUser()

  // handdle logout
  const handleLogout = () => {
    mutate(null, {
      onSuccess: () => {
        toast.success("Logout sucessfully.")
        clearUser() // clear or reset global user state
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@shadcn"
            className="grayscale"
          />
          <AvatarFallback>{user?.fullName[0]}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user?.role === "user" && (
          <>
            <DropdownMenuItem>Profile</DropdownMenuItem>
           <Link to="/orders">
              <DropdownMenuItem>Orders</DropdownMenuItem>
           </Link>
          </>
        )}
        {user?.role === "admin" && (
         <Link to="/dashboard/main">
            <DropdownMenuItem>Dashboard</DropdownMenuItem>
         </Link>
        )}
        <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default ProfileMenu

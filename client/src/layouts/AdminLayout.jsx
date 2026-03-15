import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AdminSideBar from "../components/admin/AdminSideBar";
import { Outlet } from "react-router-dom";
import useAuthStore from "../zustand/useAuth";
import { Navigate } from "react-router-dom";

const AdminLayout = () => {
  const {isAuthenticated, user} = useAuthStore()
  
  // if user is not loggedIn and user is not admin, navigate to home page
  if(!isAuthenticated || user?.role !== "admin"){
     return <Navigate to="/" replace />
  }

  return (
    <SidebarProvider>
      <AdminSideBar />
      <main className="w-full bg-sidebar py-6">
        <div className="border border-border mx-4 bg-white min-h-[90vh] rounded-md shadow-xs p-6 space-y-4">
          <SidebarTrigger />
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};
export default AdminLayout;

import { Link } from "react-router-dom";
import AuthDialog from "./AuthDialog";
import MaxWidthContainer from "./ui/maxwidthcontainer";
import { ShoppingCart } from "lucide-react";
import SearchBar from "./SearchBar";
import useAuthStore from "../zustand/useAuth";
import ProfileMenu from "./ProfileMenu";
import { useUserCart } from "../api/cartServices";

const Navbar = () => {
  const {isAuthenticated} = useAuthStore()
  const {data} = useUserCart()

  return (
    <div className="border-b border-border py-4 bg-white sticky top-0 z-50">
      <MaxWidthContainer className="flex items-center justify-between">
        {/* logo */}
        <div className="flex gap-10 items-center">
          <Link to="/">
            <div className="flex gap-0.5 items-center">
              <img src="logo.png" alt="logo" className="size-8" />
              <span className="font-bold text-gray-800 text-lg">
                E<span className="text-primary">Shop</span>
              </span>
            </div>
          </Link>
          {/* <Input /> */}
          <SearchBar />
        </div>

        {/* right */}
        <div className="flex items-center gap-6">
          <div className="space-x-4">
            {
              isAuthenticated ? <ProfileMenu /> :  <AuthDialog />
            }
          </div>

         <Link to="/cart" className="relative">
            <ShoppingCart className="text-gray-700" />
            
            <span className="bg-primary text-whit size-5 rounded-full text-xs flex justify-center items-center text-white font-medium absolute -top-2 -right-2.5">
               {
                data?.totalQuantity > 0 ? data.totalQuantity : 0
              }
            </span>
          
         </Link>
        </div>
      </MaxWidthContainer>
    </div>
  );
};
export default Navbar;

import { Link } from "react-router-dom";
import AuthDialog from "./AuthDialog";
import MaxWidthContainer from "./ui/maxwidthcontainer";
import { ShoppingCart } from "lucide-react";
import SearchBar from "./SearchBar";
import useAuthStore from "../zustand/useAuth";
import ProfileMenu from "./ProfileMenu";

const Navbar = () => {
  const {isAuthenticated, user} = useAuthStore()

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

         <Link to="/cart">
            <ShoppingCart className="text-gray-700" />
         </Link>
        </div>
      </MaxWidthContainer>
    </div>
  );
};
export default Navbar;

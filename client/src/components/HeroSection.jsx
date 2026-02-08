import {Button} from "../components/ui/button";
import MaxWidthContainer from "./ui/maxwidthcontainer";
import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="relative w-full h-auto lg:min-h-[60vh] bg-white overflow-hidden my-4 md:my-10">
      <MaxWidthContainer className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-10 items-center">

        {/* LEFT TEXT */}
        <div className="flex flex-col items-center justify-center lg:items-start">
          <h1 className="text-2xl md:text-4xl font-black leading-tight text-gray-900 text-center lg:text-start">
            Transform your shopping experience with
            <span className="text-primary block">ShopFlow</span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-center md:text-start text-gray-600 max-w-md">
            A next-generation eCommerce platform designed for performance,
            personalization, and seamless shopping.
          </p>

          <div className="mt-6 flex gap-3">
            <Button>Start Shopping</Button>
           <Link to="/products">
             <Button variant="outline">Explore Products</Button>
           </Link>
          </div>
        </div>

        {/* RIGHT SIDE — SINGLE IMAGE */}
        <div className="lg:h-[40vh] w-full">
          <div className="hidden lg:block rounded-2xl overflow-hidden h-full w-full shadow-lg shadow-pink-100">
            <img
              src="feature-img.jpg"
              alt="featured-product"
              className="h-full w-full object-cover"
            />
          </div>
        </div>

      </MaxWidthContainer>
    </section>
  );
}
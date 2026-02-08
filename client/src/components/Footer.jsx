import MaxWidthContainer from "./ui/maxwidthcontainer";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 border-t border-slate-200 py-12 mt-10">
      <MaxWidthContainer
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10"
      >
        {/* BRAND / DESCRIPTION */}
        <div className="max-w-sm col-span-1 lg:col-span-2">
          <h2 className="text-xl md:text-2xl font-semibold text-primary">
            ShopFlow
          </h2>
          <p className="mt-3 text-gray-700 leading-relaxed text-base md:text-lg">
            Your trusted online store for premium products, fast delivery, and
            amazing deals — serving customers worldwide since 2020.
          </p>
        </div>

        {/* SHOP */}
        <div>
          <h3 className="text-gray-900 font-semibold text-lg mb-4">Shop</h3>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm md:text-base">
            <li className="hover:text-gray-900 cursor-pointer">New Arrivals</li>
            <li className="hover:text-gray-900 cursor-pointer">Best Sellers</li>
            <li className="hover:text-gray-900 cursor-pointer">Sale</li>
            <li className="hover:text-gray-900 cursor-pointer">Gift Cards</li>
          </ul>
        </div>

        {/* CUSTOMER SERVICE */}
        <div>
          <h3 className="text-gray-900 font-semibold text-lg mb-4">
            Customer Service
          </h3>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm md:text-base">
            <li className="hover:text-gray-900 cursor-pointer">Help Center</li>
            <li className="hover:text-gray-900 cursor-pointer">Shipping Info</li>
            <li className="hover:text-gray-900 cursor-pointer">
              Returns & Refunds
            </li>
            <li className="hover:text-gray-900 cursor-pointer">Track Order</li>
          </ul>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-gray-900 font-semibold text-lg mb-4">Company</h3>
          <ul className="flex flex-col gap-2 text-gray-600 text-sm md:text-base">
            <li className="hover:text-gray-900 cursor-pointer">About Us</li>
            <li className="hover:text-gray-900 cursor-pointer">Blog</li>
            <li className="hover:text-gray-900 cursor-pointer">Careers</li>
            <li className="hover:text-gray-900 cursor-pointer">Contact</li>
          </ul>
        </div>
      </MaxWidthContainer>

      {/* COPYRIGHT */}
      <div className="border-t border-slate-300 mt-10 pt-6 text-center text-gray-500 text-xs md:text-sm">
        © {new Date().getFullYear()} Eshop — All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

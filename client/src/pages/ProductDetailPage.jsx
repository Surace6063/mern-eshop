import { useParams } from "react-router-dom";
import { useProduct } from "../api/productServices";
import MaxWidthContainer from "../components/ui/maxwidthcontainer";
import { Button } from "../components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import ProductDetailSkeleton from "../components/skeleton/ProductDetailSkeleton";

const ProductDetailPage = () => {
  const { slug } = useParams();

  const { data: product, isPending, error } = useProduct(slug);

  if (isPending) return <ProductDetailSkeleton />
  if (error) return <p>{error.message}</p>;

  return (
    <MaxWidthContainer className="my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* LEFT — IMAGE */}
        <div className="w-full max-h-[60vh] rounded-xl overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-full object-cover rounded-xl overflow-hidden"
          />
        </div>

        {/* RIGHT — PRODUCT INFO */}
        <div>
          {/* Category */}
          <p className="text-sm text-gray-500 mb-1">
            {product.category.name}
          </p>

          <h1 className="text-4xl font-semibold text-gray-800">
            {product.title}
          </h1>

          {/* Price */}
          <p className="text-3xl font-bold text-primary my-4">
            ${product.price}
        </p>

          {/* Stock */}
          <p className="text-sm text-green-600 font-medium">In stock</p>

          {/* Description */}
          <div className="my-10">
            <h2 className="text-xl font-semibold mb-3">Product Details</h2>
            <p className="text-gray-700 leading-relaxed">
             {product.description}
            </p>
          </div>

          {/* Quantity Selector + Add to Cart */}
          <div className="flex items-center gap-4 my-6 flex-wrap">
            <Button variant="outline" size="icon">
              <Minus size={18} />
            </Button>

            <span className="font-medium text-lg">1</span>

            <Button variant="outline" size="icon">
              <Plus size={18} />
            </Button>

            <Button className="flex items-center gap-2">
              <ShoppingCart size={18} />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
        <p className="text-gray-500">Coming soon…</p>
      </div>
    </MaxWidthContainer>
  );
};
export default ProductDetailPage;

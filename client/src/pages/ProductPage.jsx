import { useProducts } from "../api/productServices";
import MaxWidthContainer from "../components/ui/maxwidthcontainer";
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton";
import ProductCard from "../components/ProductCard"

const ProductPage = () => {
  const { data: products, isPending, error } = useProducts({});

  return (
    <MaxWidthContainer className="my-16">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Product list</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {isPending ? (
          [...Array(8)].map((_, index) => <ProductCardSkeleton key={index} />)
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </MaxWidthContainer>
  );
};
export default ProductPage;

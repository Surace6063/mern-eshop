import { useParams } from "react-router-dom"
import { useProduct } from "../api/productServices"
import MaxWidthContainer from "../components/ui/maxwidthcontainer"
import { Button } from "../components/ui/button"
import { Plus, Minus, ShoppingCart } from "lucide-react"
import ProductDetailSkeleton from "../components/skeleton/ProductDetailSkeleton"
import { useState } from "react"
import { cn } from "../lib/utils"

const ProductDetailPage = () => {
  const { slug } = useParams()
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)

  const { data: product, isPending, error } = useProduct(slug)

  if (isPending) return <ProductDetailSkeleton />
  if (error) return <p>{error.message}</p>

  console.log(product.images)

  const handleIncrease = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1)
    }
  }

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <MaxWidthContainer className="my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
        {/* LEFT — IMAGE */}
        <div>
          <div className="w-full max-h-[60vh] overflow-hidden rounded-xl mb-4">
            <img
              src={product.images[selectedImage].url}
              alt={product.name}
              className="w-full h-full object-cover rounded-xl overflow-hidden"
            />
          </div>
           <div className="flex gap-4 flex-wrap">
              {product?.images?.map((img,index) => (
                <div 
                key={img.url} 
                onClick={()=>setSelectedImage(index)} 
                className={cn("size-20 cursor-pointer border-2 transition-all duration-200 rounded-xl overflow-hidden",
                  selectedImage === index ? 'border-primary scale-110 shadow-md' : 'border-transparent hover:border-primary'
                )}>
                  <img src={img.url} alt={product.name} className="" />
                </div>
              ))}
            </div>
        </div>

        {/* RIGHT — PRODUCT INFO */}
        <div>
          {/* Category */}
          <p className="text-sm text-gray-500 mb-1">{product.category.name}</p>

          <h1 className="text-4xl font-semibold text-gray-800">
            {product.name}
          </h1>

          {/* Price */}
          <p className="text-3xl font-bold text-primary my-4">
            ${product.price}
          </p>

          {/* Stock */}
          <p className="text-sm font-medium">
            {product.stock !== 0 ? (
              <span className="text-green-600">In Stock</span>
            ) : (
              <span className="text-destructive">Out of Stock.</span>
            )}
          </p>

          {/* Description */}
          <div className="my-10">
            <h2 className="text-xl font-semibold mb-3">Product Details</h2>
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Quantity Selector + Add to Cart */}
          <div className="flex items-center gap-4 my-6 flex-wrap">
            <Button
              variant="outline"
              size="icon"
              onClick={handleDecrease}
              disabled={quantity <= 1}
            >
              <Minus size={18} />
            </Button>

            <span className="font-medium text-lg">{quantity}</span>

            <Button
              variant="outline"
              size="icon"
              onClick={handleIncrease}
              disabled={quantity >= product.stock}
            >
              <Plus size={18} />
            </Button>

            <Button
              className="flex items-center gap-2"
              disabled={product.stock === 0}
            >
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
  )
}
export default ProductDetailPage

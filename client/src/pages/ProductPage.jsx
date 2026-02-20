import { useProducts } from "../api/productServices"
import MaxWidthContainer from "../components/ui/maxwidthcontainer"
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton"
import ProductCard from "../components/ProductCard"
import { Separator } from "../components/ui/separator"
import { Label } from "../components/ui/label"
import CategoryFilter from "../components/filters/CategoryFilter"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"

const ProductPage = () => {
  const [searchParams,setSearchParams] = useSearchParams()

  const [category,setCategory] = useState(searchParams.get('category') || "")
  console.log(category)

  const { data, isPending, error } = useProducts({category})

  useEffect(()=>{
    if(category) setSearchParams({category})
  },[category,searchParams])

  return (
    <MaxWidthContainer className="my-16">
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Product list</h1>
      </div>

      <div className="mt-6 flex gap-10">
        {/* filter */}
         <div className="basis-[25%] border border-border rounded-xl shadow-sm p-6 h-fit">
           <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
           <Separator className="my-4" />
           {/* filter by category */}
           <div className="space-y-3">
            <Label>Filter By Category</Label>
            <CategoryFilter setCategory={setCategory} />
           </div>
         </div>

        {/* product list */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 basis-[75%]">
          {isPending ? (
            [...Array(8)].map((_, index) => <ProductCardSkeleton key={index} />)
          ) : error ? (
            <p>{error.message}</p>
          ) : (
            data.products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          )}
        </div>
      </div>
    </MaxWidthContainer>
  )
}
export default ProductPage

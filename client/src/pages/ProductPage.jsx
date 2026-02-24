import { useProducts } from "../api/productServices"
import MaxWidthContainer from "../components/ui/maxwidthcontainer"
import ProductCardSkeleton from "../components/skeleton/ProductCardSkeleton"
import ProductCard from "../components/ProductCard"
import { Separator } from "../components/ui/separator"
import { Label } from "../components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import CategoryFilter from "../components/filters/CategoryFilter"
import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { useDebounce } from "use-debounce"
import Pazination from "../components/Pazination"
import { cn } from "../lib/utils"

const ProductPage = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const [category, setCategory] = useState(searchParams.get("category") || "")
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "")
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "")
  const [sortPrice, setSortPrice] = useState(searchParams.get("price") || "")
  const [page,setPage] = useState(searchParams.get("page") || 1)

  const [showFilters,setShowFilters] = useState(false)

  // debounce minPrice and maxPrice state
  // delay state by 500ms(0.5s)
  const [debouncedMinPrice] = useDebounce(minPrice, 500)
  const [debouncedMaxPrice] = useDebounce(maxPrice, 500)

  const { data, isPending, error } = useProducts({
    category,
    minPrice: debouncedMinPrice,
    maxPrice: debouncedMaxPrice,
    sort: sortPrice,
    page
  })

  useEffect(() => {
    let params = {}
    if (category) params.category = category
    if (minPrice) params.minPrice = minPrice
    if (maxPrice) params.maxPrice = maxPrice
    if (sortPrice) params.price = sortPrice
    if (page > 1) params.page = page

    setSearchParams(params)
  }, [category, minPrice, maxPrice, sortPrice, page])

  // function to clear filters
  const clearFilters = () => {
    setCategory(""),
    setMaxPrice("")
    setMinPrice("")
    setPage(1)
    setSortPrice("")

    setSearchParams({})
  }

  return (
    <MaxWidthContainer className="my-6 md:my-16">
      {/* <div>
        <h1 className="text-2xl font-semibold text-gray-900">Product list</h1>
      </div> */}

      <Button onClick={()=>setShowFilters(!showFilters)} variant="outline" className="lg:hidden mb-2">
         {showFilters ? "Hide Filters" : "Show Filters"}
      </Button>

      <div className="mt-6 flex flex-col lg:flex-row gap-10">
        {/* filter */}
        <div className={
          cn(
            showFilters ? "block" : "hidden",
            "lg:block basis-[25%] border border-border rounded-xl shadow-sm p-6 h-fit lg:sticky lg:top-24 bg-white"
          )
        }>
         <div className="flex justify-between items-center">
           <h3 className="text-xl font-semibold text-gray-800">Filters</h3>
           <Button onClick={clearFilters} variant="ghost" className="text-primary cursor-pointer">
              clear filters
            </Button>
         </div>
          <Separator className="my-4" />
          {/* filter by category */}
          <div className="space-y-3">
            <Label>Filter By Category</Label>
            <CategoryFilter setCategory={setCategory} />
          </div>

          {/* filter by min and max price */}
          <div className="space-y-3 mt-8">
            <Label>Filter By Min and Max Price</Label>
            <Input
              type="number"
              placeHolder="Min Price"
              onChange={(e) => setMinPrice(e.target.value)}
            />

            <Input
              type="number"
              placeHolder="Max Price"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>

          {/* sort by price */}
          <div className="space-y-3 mt-8">
            <Label>Sort By Price</Label>
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                className="size-4"
                value="asc"
                name="price"
                id="price_asc"
                onChange={(e) => setSortPrice(e.target.value)}
              />
              <Label htmlFor="price_asc" className="text-gray-600">
                Low -&gt; High
              </Label>
            </div>
            <div className="flex items-center gap-2">
              <Input
                type="radio"
                className="size-4"
                value="desc"
                name="price"
                id="price_desc"
                onChange={(e) => setSortPrice(e.target.value)}
              />
              <Label htmlFor="price_desc" className="text-gray-600">
                High -&gt; Low
              </Label>
            </div>
          </div>
        </div>

        {/* product list */}
        <div className=" basis-[75%] space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isPending ? (
              [...Array(8)].map((_, index) => (
                <ProductCardSkeleton key={index} />
              ))
            ) : error ? (
              <p>{error.message}</p>
            ) : (
              data.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            )}
          </div>
          <Pazination setPage={setPage} pagination={data?.pagination} />
        </div>
      </div>
    </MaxWidthContainer>
  )
}
export default ProductPage

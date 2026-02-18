import ProductCard from "@/components/ProductCard"
import ProductCardSkeleton from "./skeleton/ProductCardSkeleton"
import { useProducts } from "../api/productServices"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel"

const LIMIT = 10

const NewArrivals = () => {
  const { data, isPending, error } = useProducts({ limit: LIMIT })

  return (
    <Carousel className="relative">
      <CarouselContent>
        {isPending ? (
          [...Array(4)].map((_, index) => <ProductCardSkeleton key={index} />)
        ) : error ? (
          <p>{error.message}</p>
        ) : (
          data.products.map((product) => (
            <CarouselItem key={product._id} className="sm:basis-1/2 
            md:basis-1/3 lg:basis-1/5">
              <ProductCard product={product} />
            </CarouselItem>
          ))
        )}
      </CarouselContent>
      <div className="absolute -top-8 right-15">
        <CarouselPrevious size="icon-lg" className="cursor-pointer" variant="default" />
        <CarouselNext size="icon-lg" className="cursor-pointer" variant="default" />
      </div>
    </Carousel>
  )
}
export default NewArrivals

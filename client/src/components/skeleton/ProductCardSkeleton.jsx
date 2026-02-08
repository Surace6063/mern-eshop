import { Skeleton } from "../ui/skeleton"

const ProductCardSkeleton = () => {
  return (
   <div className=" bg-white">
       <Skeleton className="aspect-square" />

       <div className="p-4 space-y-2">
          <Skeleton className="h-3" />
          <Skeleton className="h-4" />
          <Skeleton className="h-3" />
       </div>
    </div>
  )
}
export default ProductCardSkeleton
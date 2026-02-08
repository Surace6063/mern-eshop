import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthContainer from "../ui/maxwidthcontainer";

const ProductDetailSkeleton = () => {
  return (
    <MaxWidthContainer className="my-8 md:my-10 lg:my-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* LEFT — IMAGE */}
        <Skeleton className="w-full h-105 rounded-xl" />

        {/* RIGHT — INFO */}
        <div className="space-y-6">
          {/* Category */}
          <Skeleton className="h-4 w-32" />

          {/* Title */}
          <Skeleton className="h-10 w-3/4" />

          {/* Price */}
          <Skeleton className="h-8 w-40" />

          {/* Stock */}
          <Skeleton className="h-4 w-24" />

          {/* Description */}
          <div className="space-y-3 pt-6">
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Quantity + Button */}
          <div className="flex items-center gap-4 pt-6">
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-10 w-10 rounded-md" />
            <Skeleton className="h-10 w-40 rounded-xl ml-4" />
          </div>
        </div>
      </div>

      {/* RELATED PRODUCTS */}
      <div className="mt-16 space-y-4">
        <Skeleton className="h-8 w-56" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-48 rounded-xl" />
          ))}
        </div>
      </div>
    </MaxWidthContainer>
  );
};

export default ProductDetailSkeleton;

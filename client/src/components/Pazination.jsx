import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"

const Pazination = ({ setPage, pagination }) => {
  if (!pagination) return null

  const { currentPage, totalPages, hasNextPage, hasPrevPage } = pagination

  const pages = Array.from({length: totalPages}, (_, i) => i + 1)

  if(pages.length <= 1) return null

  return (
    <Pagination>
      <PaginationContent>
        {/* previous button */}
        {hasPrevPage && (
          <PaginationItem>
            <PaginationPrevious onClick={() => setPage(currentPage - 1)} />
          </PaginationItem>
        )}

        {/* page number */}
        {pages.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink 
            onClick={() => setPage(p)} 
            isActive={p === currentPage}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* next button */}

        {hasNextPage && (
          <PaginationItem>
            <PaginationNext onClick={() => setPage(currentPage + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  )
}
export default Pazination

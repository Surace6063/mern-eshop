export const getPagination = (page, limit, totalItems) => {
  const currentPage = Number(page)
  const perPage = Number(limit)
  const skip = (currentPage - 1) * perPage
  const totalPages = Math.ceil(totalItems / perPage)
  const hasNextPage = currentPage * perPage < totalItems
  const hasPrevPage = currentPage > 1

  return {
    total: totalItems,
    skip,
    perPage,
    currentPage,
    totalPages,
    hasNextPage,
    hasPrevPage
  }
}

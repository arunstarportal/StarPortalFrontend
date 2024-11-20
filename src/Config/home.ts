export const handleSort = (
  sortBy,
  field,
  setSortOrder,
  sortOrder,
  setSortBy
) => {
  if (sortBy === field) {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  } else {
    setSortBy(field);
    setSortOrder("asc");
  }
};

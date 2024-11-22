type SortOrder = "asc" | "desc";

type HandleSortFunction = (
  sortBy: "revenue" | "tvl" | null,
  field: string,
  setSortOrder: (order: SortOrder) => void,
  sortOrder: SortOrder,
  setSortBy: (field: string) => void
) => void;

export const handleSort: HandleSortFunction = (
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

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useCategories } from "../../api/categoryServices"

const CategoryFilter = ({ setCategory }) => {
  const { data, isPending, error } = useCategories()

  return (
    <Select onValueChange={(value) => setCategory(
       value === "all" ? "" : value
    )} className="w-full">
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>categories</SelectLabel>
          <SelectItem value="all">All</SelectItem>
          {isPending ? (
            "loading..."
          ) : error ? (
            <p>{error}</p>
          ) : (
            data.categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
export default CategoryFilter

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput
} from "@/components/ui/input-group"
import { Search } from "lucide-react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const SearchBar = () => {
  const navigate = useNavigate()

  const [search, setSearch] = useState("")

  const handleSearch = (e) => {
    e.preventDefault()

    // http://localhost:3000/products?serach=serach__value
    navigate(`/products?search=${search}`)
  }

  return (
    <form onSubmit={handleSearch} className="max-w-xs">
      <InputGroup>
        <InputGroupInput
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>
    </form>
  )
}
export default SearchBar

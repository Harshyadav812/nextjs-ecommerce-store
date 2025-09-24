import { SearchInput } from './searchInput'
import { Categories } from './categories'

interface SearchFilterProps {
  data: any
}

export const SearchFilters = ({ data }: SearchFilterProps) => {
  return (
    <div className="px-4 py-8 lg:px-12 border-b flex flex-col gap-4 w-full">
      <SearchInput />
      <Categories data={data} />
    </div>
  )
}

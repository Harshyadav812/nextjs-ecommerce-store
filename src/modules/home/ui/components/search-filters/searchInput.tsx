import { Input } from '@/components/ui/input'
import { BookmarkCheckIcon, ListFilterIcon, SearchIcon } from 'lucide-react'
import { CategoriesSidebar } from './categories-sidebar'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useTRPC } from '@/trpc/client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'

interface Props {
  disabled?: boolean
  defaultValue?: string | undefined
  onChange?: (value: string) => void
}

export const SearchInput = ({ disabled, defaultValue, onChange }: Props) => {
  const [searchValue, setSearchValue] = useState(defaultValue || '')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const trpc = useTRPC()
  const session = useQuery(trpc.auth.session.queryOptions())


  //debounce for search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onChange?.(searchValue)
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchValue, onChange])

  return (
    <div className="flex items-center gap-2 w-full">
      <CategoriesSidebar
        open={isSidebarOpen}
        onOpenChange={setIsSidebarOpen}
      />
      <div className="relative w-full">
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />
        <Input
          className="pl-8 border-slate-600"
          placeholder="Search Products"
          disabled={disabled}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>
      <Button
        variant={'elevated'}
        onClick={() => setIsSidebarOpen(true)}
        className="size-9 shrink-0 flex lg:hidden"
      >
        <ListFilterIcon />
      </Button>
      {session.data?.user && (
        <Button
          asChild
          variant={"hoverElevated"}
          className='h-9'
        >
          <Link prefetch href={"/library"}>
            <BookmarkCheckIcon />
            Library
          </Link>
        </Button>
      )}
    </div>
  )
}
